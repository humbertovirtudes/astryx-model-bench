#!/usr/bin/env python3
"""Astryx local-LLM benchmark harness.
Per model: iterate generate -> extract App.tsx -> vite build. On build failure,
feed the error back and retry up to MAX_ITERS. Record all metrics + artifacts.
"""
import json, re, subprocess, time, os, sys, shutil

LMS_URL = "http://localhost:1234/api/v0/chat/completions"
VITE_APP = os.path.expanduser("~/astryx-sb/apps/example-vite")
BENCH = os.path.expanduser("~/astryx-bench")
RUNS = os.path.join(BENCH, "runs")
MAX_ITERS = 5

PROMPTS = json.load(open(os.path.expanduser("~/flowershop_v2_prompts.json")))
SYSTEM = PROMPTS["system_prompt"]
USER = PROMPTS["user_prompt"]

def curl_chat(model, messages, max_tokens=8192, temp=0.5):
    payload = {"model": model, "messages": messages, "stream": False,
               "max_tokens": max_tokens, "temperature": temp}
    pf = "/tmp/_lms_payload.json"
    json.dump(payload, open(pf, "w"))
    t0 = time.time()
    r = subprocess.run(["curl", "-s", "--max-time", "1200", LMS_URL,
                        "-H", "Content-Type: application/json", "-d", "@"+pf],
                       capture_output=True, text=True)
    t1 = time.time()
    try:
        d = json.loads(r.stdout)
    except Exception as e:
        return {"error": f"json parse: {e}", "raw": r.stdout[:2000], "wall_s": round(t1-t0,2)}
    if "choices" not in d:
        return {"error": "no choices", "raw": json.dumps(d)[:2000], "wall_s": round(t1-t0,2)}
    return {
        "content": d["choices"][0]["message"]["content"],
        "usage": d.get("usage", {}),
        "stats": d.get("stats", {}),
        "model_info": d.get("model_info", {}),
        "wall_s": round(t1-t0, 2),
    }

def extract_code(content):
    m = re.search(r'```(?:tsx|typescript|jsx|ts)?\s*\n(.*?)```', content, re.DOTALL)
    if m: return m.group(1).strip()
    # fallback: if it looks like it starts with an import, take whole thing
    c = content.strip()
    if c.startswith("import ") or c.startswith("//"): return c
    return c

def rule_violations(code):
    v = {}
    v["raw_div"] = len(re.findall(r'<div[\s/>]', code))
    v["raw_span"] = len(re.findall(r'<span[\s/>]', code))
    v["raw_p_tag"] = len(re.findall(r'<p[\s/>]', code))
    v["inline_style"] = len(re.findall(r'style=\{\{', code))
    v["string_gap"] = len(re.findall(r'(?:gap|padding|paddingInline|paddingBlock)="', code))
    v["className"] = len(re.findall(r'className=', code))
    return v

def vite_build():
    env = dict(os.environ); env["PATH"] = os.path.expanduser("~/.local/bin:") + env.get("PATH",""); env["CI"]="true"
    env["COREPACK_HOME"] = os.path.expanduser("~/.cache/corepack")
    t0 = time.time()
    r = subprocess.run(["pnpm","build"], cwd=VITE_APP, capture_output=True, text=True, env=env, timeout=240)
    t1 = time.time()
    ok = r.returncode == 0
    raw = r.stdout + "\n" + r.stderr
    log = re.sub(r'\x1b\[[0-9;]*m', '', raw)  # strip ANSI
    err = ""
    if not ok:
        keep = []
        for l in log.splitlines():
            s = l.strip()
            if not s: continue
            if re.search(r'ELIFECYCLE|aggregateBindingErrors|unwrapBindingResult|at async|at #build|at Object|node_modules|errors: \[|Getter/Setter|^\}|rolldown|buildEnvironment', s):
                continue
            if re.search(r'error|MISSING_EXPORT|not exported|could not resolve|Expected|Unexpected|failed|src/App\.tsx:\d+|is not defined|Cannot find|No matching', s, re.I):
                keep.append(s)
        # dedupe, keep order
        seen=set(); ded=[]
        for l in keep:
            if l not in seen: seen.add(l); ded.append(l)
        err = "\n".join(ded[:20])
    return {"ok": ok, "build_s": round(t1-t0,2), "log_tail": log[-3000:], "error_summary": err}

def run_model(model, slug):
    outdir = os.path.join(RUNS, slug)
    os.makedirs(outdir, exist_ok=True)
    messages = [{"role":"system","content":SYSTEM},{"role":"user","content":USER}]
    iterations = []
    final_code = None
    for i in range(1, MAX_ITERS+1):
        print(f"[{slug}] iteration {i} — generating...", flush=True)
        gen = curl_chat(model, messages)
        if "error" in gen:
            iterations.append({"iter": i, "gen_error": gen["error"], "raw": gen.get("raw","")[:500], "wall_s": gen.get("wall_s")})
            break
        code = extract_code(gen["content"])
        open(os.path.join(outdir, f"App.iter{i}.tsx"), "w").write(code)
        # write into vite app and build
        shutil.copy(os.path.join(VITE_APP,"src","App.tsx"), "/tmp/_App_backup.tsx")
        open(os.path.join(VITE_APP,"src","App.tsx"),"w").write(code)
        build = vite_build()
        rv = rule_violations(code)
        it = {
            "iter": i, "wall_s": gen["wall_s"], "usage": gen["usage"], "stats": gen["stats"],
            "code_chars": len(code), "raw_content_chars": len(gen["content"]),
            "build_ok": build["ok"], "build_s": build["build_s"],
            "rule_violations": rv, "build_error_summary": build["error_summary"],
        }
        iterations.append(it)
        print(f"[{slug}] iter {i}: build_ok={build['ok']} tok/s={gen['stats'].get('tokens_per_second')} gen={gen['usage'].get('completion_tokens')}tok violations={sum(rv.values())}", flush=True)
        if build["ok"]:
            final_code = code
            open(os.path.join(outdir, "App.final.tsx"), "w").write(code)
            break
        # feed error back for next iteration
        messages.append({"role":"assistant","content":gen["content"]})
        messages.append({"role":"user","content":
            "The file failed to build with these errors:\n\n" + build["error_summary"] +
            "\n\nFix the code so it builds. Output ONLY the corrected full src/App.tsx in a single ```tsx code fence, nothing else."})
    result = {
        "model": model, "slug": slug, "reached_green": final_code is not None,
        "iterations_to_green": next((it["iter"] for it in iterations if it.get("build_ok")), None),
        "total_iterations": len(iterations), "iterations": iterations,
        "model_info": gen.get("model_info", {}) if 'gen' in dir() and isinstance(gen,dict) else {},
    }
    json.dump(result, open(os.path.join(outdir,"result.json"),"w"), indent=2)
    return result

if __name__ == "__main__":
    model = sys.argv[1]; slug = sys.argv[2]
    res = run_model(model, slug)
    print("\n=== RESULT ===")
    print(json.dumps({k:v for k,v in res.items() if k!="iterations"}, indent=2))
