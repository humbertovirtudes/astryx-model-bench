#!/usr/bin/env python3
"""Run 3: vision-in-the-loop design iteration.
Round 0: generate the R2 production site (reuse R2 prompt).
Each round: build -> serve -> screenshot desktop(1280)+mobile(390) -> send BOTH images back with a
critique prompt -> model revises App.tsx -> repeat. Tracks build + violations + shots per round."""
import json, re, subprocess, time, os, sys, base64, shutil
sys.path.insert(0, os.path.expanduser("~/astryx-bench"))

LMS="http://localhost:1234/v1/chat/completions"
VITE=os.path.expanduser("~/astryx-sb/apps/example-vite")
BENCH=os.path.expanduser("~/astryx-bench")
CDP=os.path.expanduser("~/.navi/bin/cdp")
PORT="9223"
R2=json.load(open(os.path.expanduser("~/flowershop_r2_prompts.json")))
SYS=R2["system_prompt"]; USER=R2["user_prompt"]
MAX_BUILD_FIX=4   # inner build-repair tries per round
ROUNDS=3          # vision critique rounds

ASTRYX=["Theme","neutralTheme","VStack","HStack","Layout","LayoutContent","LayoutHeader","LayoutFooter","Grid","Card","Heading","Text","Button","Badge","Divider","Link","Icon","AspectRatio","TextInput","useState"]

def chat(messages,max_tokens=24000,temp=0.4):
    payload={"model":sys.argv[1],"messages":messages,"stream":False,"max_tokens":max_tokens,"temperature":temp}
    json.dump(payload,open("/tmp/_r3.json","w"))
    t0=time.time()
    r=subprocess.run(["curl","-s","--max-time","1200",LMS,"-H","Content-Type: application/json","-d","@/tmp/_r3.json"],capture_output=True,text=True)
    t1=time.time()
    try: d=json.loads(r.stdout)
    except: return {"error":"parse","raw":r.stdout[:400],"wall":round(t1-t0,1)}
    if "choices" not in d: return {"error":"nochoices","raw":json.dumps(d)[:400],"wall":round(t1-t0,1)}
    return {"content":d["choices"][0]["message"]["content"],"usage":d.get("usage",{}),"stats":d.get("stats",{}),"wall":round(t1-t0,1)}

def extract(content):
    content=re.sub(r'import\s+["\']@astryxdesign/core/(reset|astryx)\.css["\'];?','',content)
    m=re.search(r'```(?:tsx|jsx|ts|typescript)?\s*\n(.*?)```',content,re.DOTALL)
    if m: code=m.group(1)
    else:
        # unpaired/opening-only fence: strip a leading ```lang line and any stray ``` lines
        code=content
        code=re.sub(r'^\s*```[a-zA-Z]*\s*\n','',code)
        code=re.sub(r'\n?```\s*$','',code)
        code=re.sub(r'^\s*```[a-zA-Z]*\s*$','',code,flags=re.M)
    # hard-strip any remaining fence lines anywhere
    code="\n".join(l for l in code.splitlines() if not l.strip().startswith("```"))
    # start at first import/comment if there's chatter before it
    idx=code.find("import {")
    if idx>0: code=code[idx:]
    return code.strip()

def undefined_refs(code):
    imp=set()
    for m in re.finditer(r'import\s*\{([^}]*)\}',code):
        for n in m.group(1).split(','): imp.add(n.split(' as ')[-1].strip())
    for m in re.finditer(r'(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)',code): imp.add(m.group(1))
    return [i for i in ASTRYX if (re.search(r'<'+i+r'[\s/>]',code) or re.search(r'\b'+i+r'\s*[({<]',code) or ('theme={'+i in code)) and i not in imp]

def rvi(code):
    # inline styles that are NOT the one sanctioned imageFill const
    inline=len(re.findall(r'style=\{\{',code))  # only object-literal inline styles count as slips
    return {"raw_div":len(re.findall(r'<div[\s/>]',code)),"inline_style":inline,
            "className":len(re.findall(r'className=',code)),"string_gap":len(re.findall(r'(?:gap|padding)="',code))}

def build(code):
    open(os.path.join(VITE,"src","App.tsx"),"w").write(code)
    env=dict(os.environ);env["PATH"]=os.path.expanduser("~/.local/bin:")+env.get("PATH","");env["CI"]="true";env["COREPACK_HOME"]=os.path.expanduser("~/.cache/corepack")
    r=subprocess.run(["pnpm","build"],cwd=VITE,capture_output=True,text=True,env=env,timeout=240)
    ok=r.returncode==0
    log=re.sub(r'\x1b\[[0-9;]*m','',r.stdout+"\n"+r.stderr); err=""
    if ok:
        u=undefined_refs(code)
        if u: ok=False; err="Used but not imported (crashes at runtime): "+", ".join(u)
    if not ok and not err:
        keep=[l.strip() for l in log.splitlines() if re.search(r'error|Expected|Unexpected|not exported|src/App\.tsx:\d+|is not defined|Cannot find',l,re.I) and not re.search(r'ELIFECYCLE|node_modules|aggregateBind|at async|rolldown|at #build',l)]
        seen=set();err="\n".join([x for x in keep if not(x in seen or seen.add(x))][:12])
    return ok,err

def gen_or_fix(messages,max_tokens=24000):
    """Ask model, then inner-loop until build passes (or give up)."""
    for _ in range(MAX_BUILD_FIX):
        g=chat(messages,max_tokens=max_tokens)
        if "error" in g: return None,g,None
        code=extract(g["content"])
        ok,err=build(code)
        if ok: return code,g,None
        messages.append({"role":"assistant","content":g["content"]})
        messages.append({"role":"user","content":f"That failed to build:\n{err}\nFix it. Output ONLY the full corrected src/App.tsx in one ```tsx fence."})
    return None,g,err

def shoot(slug,rnd):
    """Serve current dist and screenshot desktop+mobile. Returns (desktop_png, mobile_png)."""
    # build to dist first (caller ensures App.tsx is the good code)
    env=dict(os.environ);env["PATH"]=os.path.expanduser("~/.local/bin:")+env.get("PATH","");env["CI"]="true";env["COREPACK_HOME"]=os.path.expanduser("~/.cache/corepack")
    subprocess.run(["pnpm","build"],cwd=VITE,capture_output=True,text=True,env=env,timeout=240)
    # serve dist on 4800
    subprocess.run(["pkill","-f","http.server 4800"],capture_output=True)
    srv=subprocess.Popen(["python3","-m","http.server","4800","--directory",os.path.join(VITE,"dist")],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    time.sleep(2)
    outdir=os.path.join(BENCH,"runs3",slug); os.makedirs(outdir,exist_ok=True)
    dpath=os.path.join(outdir,f"r{rnd}_desktop.png"); mpath=os.path.join(outdir,f"r{rnd}_mobile.png")
    def cap(w,h,path,mobile):
        vp=[CDP,"viewport",str(w),str(h)]+(["mobile"] if mobile else [])+["--port",PORT]
        subprocess.run([CDP,"navigate",f"http://localhost:4800/?cb={int(time.time()*1000)}","--port",PORT],capture_output=True,text=True,timeout=45)
        subprocess.run(vp,capture_output=True,text=True,timeout=30)
        time.sleep(3)  # let responsive layout + images settle
        subprocess.run([CDP,"screenshot",path,"--full","--port",PORT],capture_output=True,text=True,timeout=45)
    cap(1280,900,dpath,False); cap(390,844,mpath,True)
    srv.terminate()
    return dpath,mpath

def b64(p):
    try: return base64.b64encode(open(p,"rb").read()).decode()
    except: return None

def main():
    slug=sys.argv[2]; outdir=os.path.join(BENCH,"runs3",slug); os.makedirs(outdir,exist_ok=True)
    shutil.copy(os.path.join(VITE,"src","App.tsx"),"/tmp/_App_r3bk.tsx")
    rounds=[]; msgs=[{"role":"system","content":SYS},{"role":"user","content":USER}]
    code=None
    for rnd in range(0,ROUNDS+1):
        if rnd==0:
            print(f"[{slug}] round 0: initial generation",flush=True)
            code,g,err=gen_or_fix(msgs,max_tokens=24000)
        else:
            print(f"[{slug}] round {rnd}: vision critique",flush=True)
            dpng=b64(dpath); mpng=b64(mpath)
            if not dpng or not mpng: print("  no screenshots; stop"); break
            crit=("Here are screenshots of YOUR current page — DESKTOP (1280px wide) then MOBILE (390px wide). "
                  "Critique your own design like a senior product designer and REVISE the code to be more production-ready and fully responsive. "
                  "Look for: cramped or overflowing mobile layout, columns that should collapse on small screens, weak visual hierarchy, "
                  "inconsistent spacing, hero balance, and anything that looks unfinished. Astryx Grid columns={{minWidth:N}} already reflows — "
                  "use it so cards stack to 1 column on mobile. Keep all working features (theme toggle, cart, newsletter). "
                  "Output ONLY the full revised src/App.tsx in one ```tsx fence.")
            msgs=[{"role":"system","content":SYS},
                  {"role":"user","content":[
                      {"type":"text","text":crit},
                      {"type":"image_url","image_url":{"url":f"data:image/png;base64,{dpng}"}},
                      {"type":"image_url","image_url":{"url":f"data:image/png;base64,{mpng}"}},
                  ]}]
            newcode,g,err=gen_or_fix(msgs,max_tokens=14000)
            if newcode: code=newcode
        if not code:
            rounds.append({"round":rnd,"build_ok":False,"err":(err or g.get('error'))[:200] if (err or g.get('error')) else "gen fail"})
            print(f"  round {rnd}: FAILED",flush=True); break
        open(os.path.join(outdir,f"App.r{rnd}.tsx"),"w").write(code)
        # screenshot this round's result
        dpath,mpath=shoot(slug,rnd)
        rv=rvi(code); ds=os.path.getsize(dpath) if os.path.exists(dpath) else 0; ms=os.path.getsize(mpath) if os.path.exists(mpath) else 0
        rounds.append({"round":rnd,"build_ok":True,"code_chars":len(code),"violations":sum(rv.values()),"rv":rv,
                       "gen_tokens":g["usage"].get("completion_tokens"),"tok_s":g["stats"].get("tokens_per_second"),
                       "wall":g["wall"],"desktop_png_bytes":ds,"mobile_png_bytes":ms})
        print(f"  round {rnd}: build_ok=True viol={sum(rv.values())} gen={g['usage'].get('completion_tokens')}tok shots(d={ds},m={ms})",flush=True)
    # final code = last good
    if code: open(os.path.join(outdir,"App.final.tsx"),"w").write(code)
    res={"model":sys.argv[1],"slug":slug,"method":"vision-in-the-loop","rounds":rounds,
         "final_ok":bool(code),"total_rounds":len([r for r in rounds if r.get("build_ok")])}
    json.dump(res,open(os.path.join(outdir,"result.json"),"w"),indent=2)
    print(f"\n=== R3 {slug}: {res['total_rounds']} good rounds, final_ok={res['final_ok']} ===")
    shutil.copy("/tmp/_App_r3bk.tsx",os.path.join(VITE,"src","App.tsx"))

if __name__=="__main__": main()
