#!/usr/bin/env python3
"""Decomposition harness: build the Run-2 site section-by-section so a small model can succeed.
Fixed shell owns imports + state + wiring. Model generates each section function independently;
each is build-validated in isolation against the shell, repaired individually, then assembled."""
import json, re, subprocess, time, os, sys, shutil
sys.path.insert(0, os.path.expanduser("~/astryx-bench"))
from section_specs import SECTIONS

LMS_URL="http://localhost:1234/api/v0/chat/completions"
VITE_APP=os.path.expanduser("~/astryx-sb/apps/example-vite")
BENCH=os.path.expanduser("~/astryx-bench")
SHELL=open(os.path.join(BENCH,"shell_template.tsx")).read()
MAX_ITERS=4

# The component API block (reused from the R2 prompt so the model knows exact props)
R2=json.load(open(os.path.expanduser("~/flowershop_r2_prompts.json")))
API_BLOCK = R2["system_prompt"].split("## COMPONENT API")[1].split("## QUALITY BAR")[0]

ASTRYX_IDENTS=["Theme","neutralTheme","VStack","HStack","Layout","LayoutContent","LayoutHeader","LayoutFooter","Grid","Card","Heading","Text","Button","Badge","Divider","Link","Icon","AspectRatio","TextInput","useState","imageFill"]

def curl(messages,max_tokens=4096,temp=0.4):
    payload={"model":sys.argv[1],"messages":messages,"stream":False,"max_tokens":max_tokens,"temperature":temp}
    json.dump(payload,open("/tmp/_dp.json","w"))
    t0=time.time()
    r=subprocess.run(["curl","-s","--max-time","600",LMS_URL,"-H","Content-Type: application/json","-d","@/tmp/_dp.json"],capture_output=True,text=True)
    t1=time.time()
    try: d=json.loads(r.stdout)
    except: return {"error":"parse","wall":t1-t0}
    if "choices" not in d: return {"error":"nochoices","wall":t1-t0}
    return {"content":d["choices"][0]["message"]["content"],"usage":d.get("usage",{}),"stats":d.get("stats",{}),"wall":round(t1-t0,2)}

def extract_fn(content, fnname):
    # prefer a ```tsx fence
    m=re.search(r'```(?:tsx|jsx|ts|typescript)?\s*\n(.*?)```',content,re.DOTALL)
    code=m.group(1).strip() if m else content.strip()
    # keep from 'function <name>' onward if there's preamble
    idx=code.find("function "+fnname)
    if idx>0: code=code[idx:]
    return code

def undefined_refs(code):
    imported=set(ASTRYX_IDENTS)  # all provided by the shell scope
    for m in re.finditer(r'(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)',code): imported.add(m.group(1))
    missing=[]
    for ident in ASTRYX_IDENTS:
        pass  # all are in-scope from shell; nothing to flag at section level
    return missing

def rule_violations(code):
    return {"raw_div":len(re.findall(r'<div[\s/>]',code)),"raw_span":len(re.findall(r'<span[\s/>]',code)),
            "inline_style":len(re.findall(r'style=\{\{',code)),"string_gap":len(re.findall(r'(?:gap|padding|paddingInline|paddingBlock)="',code)),
            "className":len(re.findall(r'className=',code))}

def build_with(sections_map):
    """Assemble shell + given section codes, write to App.tsx, build. Returns (ok, err)."""
    body="\n\n".join(sections_map[name] for name,_,_ in SECTIONS if name in sections_map)
    app=SHELL.replace("/* __SECTIONS__ */", body)
    open(os.path.join(VITE_APP,"src","App.tsx"),"w").write(app)
    env=dict(os.environ); env["PATH"]=os.path.expanduser("~/.local/bin:")+env.get("PATH",""); env["CI"]="true"; env["COREPACK_HOME"]=os.path.expanduser("~/.cache/corepack")
    r=subprocess.run(["pnpm","build"],cwd=VITE_APP,capture_output=True,text=True,env=env,timeout=240)
    ok=r.returncode==0
    log=re.sub(r'\x1b\[[0-9;]*m','',r.stdout+"\n"+r.stderr)
    err=""
    if not ok:
        keep=[l.strip() for l in log.splitlines() if re.search(r'error|Expected|Unexpected|not exported|could not resolve|src/App\.tsx:\d+|is not defined|Cannot find',l,re.I) and not re.search(r'ELIFECYCLE|node_modules|aggregateBinding|at async|rolldown|at #build|at Object',l)]
        seen=set();err="\n".join([x for x in keep if not (x in seen or seen.add(x))][:15])
    return ok,err,app

def gen_section(name,sig,spec,stub_map):
    """Generate one section fn, validate by building shell with THIS section real + others stubbed."""
    sysmsg=("You are writing ONE React function for an Astryx (@astryxdesign/core) page. "
      "It will be dropped into a file that ALREADY imports every component and defines `imageFill`. "
      "Do NOT write imports. Do NOT write the App component. Output ONLY the one function, in a ```tsx fence.\n\n"
      "Astryx rules: NO raw <div>/<span>/<p>; layout = VStack/HStack/Grid; type = Heading/Text. "
      "NO inline style={{}} except `style={imageFill}` on images. Spacing = numbers from 0,0.5,1,1.5,2,3,4,5,6,8,10 (gap={4} not \"4\"). "
      "Color via props only.\n"+API_BLOCK)
    usermsg=f"Write EXACTLY this function (this signature, unchanged):\n\n{sig} {{ ... }}\n\nWhat it renders:\n{spec}\n\nOutput ONLY that one function in a ```tsx fence."
    msgs=[{"role":"system","content":sysmsg},{"role":"user","content":usermsg}]
    section_meta={"name":name,"iters":[]}
    for it in range(1,MAX_ITERS+1):
        g=curl(msgs)
        if "error" in g: section_meta["iters"].append({"iter":it,"err":g["error"]}); continue
        code=extract_fn(g["content"],name)
        # validate: build shell with this section + all others as minimal stubs
        trial=dict(stub_map); trial[name]=code
        ok,err,_=build_with(trial)
        rv=rule_violations(code)
        section_meta["iters"].append({"iter":it,"ok":ok,"tok_s":g["stats"].get("tokens_per_second"),
            "gen":g["usage"].get("completion_tokens"),"viol":sum(rv.values()),"err":err[:200],"wall":g["wall"]})
        print(f"  [{name}] iter{it}: ok={ok} gen={g['usage'].get('completion_tokens')}tok viol={sum(rv.values())}"+(f" ERR {err[:80]}" if not ok else ""),flush=True)
        if ok:
            section_meta["code"]=code; section_meta["final_iter"]=it
            section_meta["stats"]=g["stats"]; section_meta["usage"]=g["usage"]
            return code, section_meta
        msgs.append({"role":"assistant","content":g["content"]})
        msgs.append({"role":"user","content":f"That failed to build:\n{err}\nFix it. Output ONLY the corrected {name} function in a ```tsx fence."})
    section_meta["code"]=None
    return None, section_meta

def main():
    slug=sys.argv[2]; out=os.path.join(BENCH,"runs2_decomp",slug); os.makedirs(out,exist_ok=True)
    # minimal stubs so the shell always compiles while we fill sections one by one
    stub={name:f"{sig} {{ return <VStack><Text type=\"body\">{name}</Text></VStack>; }}" for name,sig,_ in SECTIONS}
    shutil.copy(os.path.join(VITE_APP,"src","App.tsx"),"/tmp/_App_bk_decomp.tsx")
    real={}; metas=[]; t0=time.time()
    for name,sig,spec in SECTIONS:
        print(f"[{slug}] generating {name}...",flush=True)
        code,meta=gen_section(name,sig,spec,{**stub,**real})
        metas.append(meta)
        real[name]= code if code else stub[name]  # fall back to stub if a section never builds
        meta["fell_back"]= code is None
    # final assemble with all real (or stub-fallback) sections
    ok,err,app=build_with(real)
    open(os.path.join(out,"App.final.tsx"),"w").write(app)
    n_ok=sum(1 for m in metas if m.get("code"))
    result={"model":sys.argv[1],"slug":slug,"method":"decomposition","sections_total":len(SECTIONS),
            "sections_built":n_ok,"sections_fell_back":len(SECTIONS)-n_ok,
            "final_build_ok":ok,"final_build_err":err[:300],"wall_total_s":round(time.time()-t0,1),"sections":metas}
    json.dump(result,open(os.path.join(out,"result.json"),"w"),indent=2)
    print(f"\n=== DECOMP RESULT: {n_ok}/{len(SECTIONS)} sections built, final_build_ok={ok} ===")
    shutil.copy("/tmp/_App_bk_decomp.tsx",os.path.join(VITE_APP,"src","App.tsx"))

if __name__=="__main__": main()
