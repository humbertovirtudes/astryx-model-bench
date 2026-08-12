#!/usr/bin/env python3
"""Run 3 for a SMALL model that cannot one-shot a 10-section file: decomposition + vision.
Round 0: build the site section-by-section (the proven decomposition method) -> assemble -> build.
Then each vision round: screenshot desktop(1280)+mobile(390); for EACH section, show the model BOTH
full-page screenshots + that section's current code, and ask it to revise ONLY that section for a
more production-ready, fully-responsive result. Each revised section is build-validated in isolation
(shell + this section real, others current), repaired individually, then all reassembled + full build.
Plays to the small model's confirmed strength (small independent functions) while genuinely using its
confirmed vision. Honest: this is DECOMPOSITION + VISION, a different method than the others' one-shot."""
import json, re, subprocess, time, os, sys, base64, shutil
sys.path.insert(0, os.path.expanduser("~/astryx-bench"))
from section_specs import SECTIONS

LMS="http://localhost:1234/v1/chat/completions"   # OpenAI-shape endpoint (vision-capable)
VITE=os.path.expanduser("~/astryx-sb/apps/example-vite")
BENCH=os.path.expanduser("~/astryx-bench")
SHELL=open(os.path.join(BENCH,"shell_template.tsx")).read()
CDP=os.path.expanduser("~/.navi/bin/cdp"); PORT="9223"
MAX_ITERS=4          # per-section build-repair tries
ROUNDS=3             # vision critique rounds
R2=json.load(open(os.path.expanduser("~/flowershop_r2_prompts.json")))
API_BLOCK=R2["system_prompt"].split("## COMPONENT API")[1].split("## QUALITY BAR")[0]
ASTRYX=["Theme","neutralTheme","VStack","HStack","Layout","LayoutContent","LayoutHeader","LayoutFooter","Grid","Card","Heading","Text","Button","Badge","Divider","Link","Icon","AspectRatio","TextInput","useState","imageFill"]

def chat(messages,max_tokens=4096,temp=0.4):
    payload={"model":sys.argv[1],"messages":messages,"stream":False,"max_tokens":max_tokens,"temperature":temp}
    json.dump(payload,open("/tmp/_gv.json","w"))
    t0=time.time()
    r=subprocess.run(["curl","-s","--max-time","900",LMS,"-H","Content-Type: application/json","-d","@/tmp/_gv.json"],capture_output=True,text=True)
    t1=time.time()
    try: d=json.loads(r.stdout)
    except: return {"error":"parse","raw":r.stdout[:300],"wall":round(t1-t0,1)}
    if "choices" not in d: return {"error":"nochoices","raw":json.dumps(d)[:300],"wall":round(t1-t0,1)}
    return {"content":d["choices"][0]["message"]["content"],"usage":d.get("usage",{}),"stats":d.get("stats",{}),"wall":round(t1-t0,1)}

def extract_fn(content,fnname):
    m=re.search(r'```(?:tsx|jsx|ts|typescript)?\s*\n(.*?)```',content,re.DOTALL)
    code=m.group(1).strip() if m else content.strip()
    code="\n".join(l for l in code.splitlines() if not l.strip().startswith("```"))
    idx=code.find("function "+fnname)
    if idx>0: code=code[idx:]
    return code.strip()

def rv(code):
    return {"raw_div":len(re.findall(r'<div[\s/>]',code)),"raw_span":len(re.findall(r'<span[\s/>]',code)),
            "inline_style":len(re.findall(r'style=\{\{',code)),"string_gap":len(re.findall(r'(?:gap|padding|paddingInline|paddingBlock)="',code)),
            "className":len(re.findall(r'className=',code))}

def build_with(sections_map):
    body="\n\n".join(sections_map[name] for name,_,_ in SECTIONS if name in sections_map)
    app=SHELL.replace("/* __SECTIONS__ */",body)
    open(os.path.join(VITE,"src","App.tsx"),"w").write(app)
    env=dict(os.environ);env["PATH"]=os.path.expanduser("~/.local/bin:")+env.get("PATH","");env["CI"]="true";env["COREPACK_HOME"]=os.path.expanduser("~/.cache/corepack")
    r=subprocess.run(["pnpm","build"],cwd=VITE,capture_output=True,text=True,env=env,timeout=240)
    ok=r.returncode==0; log=re.sub(r'\x1b\[[0-9;]*m','',r.stdout+"\n"+r.stderr); err=""
    if not ok:
        keep=[l.strip() for l in log.splitlines() if re.search(r'error|Expected|Unexpected|not exported|could not resolve|src/App\.tsx:\d+|is not defined|Cannot find',l,re.I) and not re.search(r'ELIFECYCLE|node_modules|aggregateBind|at async|rolldown|at #build|at Object',l)]
        seen=set();err="\n".join([x for x in keep if not(x in seen or seen.add(x))][:12])
    return ok,err,app

def gen_section(name,sig,spec,cur_map,critique=None,imgs=None):
    sysmsg=("You are writing ONE React function for an Astryx (@astryxdesign/core) page. "
      "The file ALREADY imports every component and defines `imageFill`. Do NOT write imports or the App component. "
      "Output ONLY the one function, in a ```tsx fence.\n\n"
      "Astryx rules: NO raw <div>/<span>/<p>; layout = VStack/HStack/Grid; type = Heading/Text. "
      "NO inline style={{}} except `style={imageFill}` on images. Spacing = numbers (gap={4} not \"4\"). Color via props only.\n"
      "RESPONSIVE: use Grid columns={{minWidth:N}} (NOT fixed columns={N}) so rows collapse to one column on a 390px phone.\n"+API_BLOCK)
    if critique:
        text=(f"Here are screenshots of the CURRENT full page — DESKTOP (1280px) then MOBILE (390px). "
              f"Revise ONLY the `{name}` function to be more production-ready and fully responsive on mobile. "
              f"{critique}\nCurrent {name}:\n```tsx\n{cur_map[name]}\n```\nKeep the signature `{sig}`. Output ONLY the revised function in a ```tsx fence.")
        user=[{"type":"text","text":text}]+[{"type":"image_url","image_url":{"url":f"data:image/png;base64,{b}"}} for b in imgs if b]
    else:
        user=f"Write EXACTLY this function (signature unchanged):\n\n{sig} {{ ... }}\n\nWhat it renders:\n{spec}\n\nUse responsive Grid columns={{{{minWidth:N}}}}. Output ONLY that one function in a ```tsx fence."
    msgs=[{"role":"system","content":sysmsg},{"role":"user","content":user}]
    meta={"name":name,"iters":[]}
    for it in range(1,MAX_ITERS+1):
        g=chat(msgs)
        if "error" in g: meta["iters"].append({"iter":it,"err":g["error"]}); continue
        code=extract_fn(g["content"],name)
        trial=dict(cur_map); trial[name]=code
        ok,err,_=build_with(trial)
        v=rv(code)
        meta["iters"].append({"iter":it,"ok":ok,"gen":g["usage"].get("completion_tokens"),"tok_s":g["stats"].get("tokens_per_second"),"viol":sum(v.values()),"err":err[:160],"wall":g["wall"]})
        print(f"    [{name}] iter{it}: ok={ok} gen={g['usage'].get('completion_tokens')}tok viol={sum(v.values())}"+(f" ERR {err[:70]}" if not ok else ""),flush=True)
        if ok:
            meta["code"]=code; meta["final_iter"]=it; meta["usage"]=g["usage"]; meta["stats"]=g["stats"]
            return code,meta
        msgs.append({"role":"assistant","content":g["content"]})
        msgs.append({"role":"user","content":f"That failed to build:\n{err}\nFix it. Output ONLY the corrected {name} function in a ```tsx fence."})
    meta["code"]=None
    return None,meta

def shoot(slug,rnd):
    env=dict(os.environ);env["PATH"]=os.path.expanduser("~/.local/bin:")+env.get("PATH","");env["CI"]="true";env["COREPACK_HOME"]=os.path.expanduser("~/.cache/corepack")
    subprocess.run(["pnpm","build"],cwd=VITE,capture_output=True,text=True,env=env,timeout=240)
    subprocess.run(["pkill","-f","http.server 4800"],capture_output=True); 
    srv=subprocess.Popen(["python3","-m","http.server","4800","--directory",os.path.join(VITE,"dist")],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    time.sleep(2)
    outdir=os.path.join(BENCH,"runs3",slug); os.makedirs(outdir,exist_ok=True)
    dpath=os.path.join(outdir,f"r{rnd}_desktop.png"); mpath=os.path.join(outdir,f"r{rnd}_mobile.png")
    def cap(w,h,path,mobile):
        subprocess.run([CDP,"navigate",f"http://localhost:4800/?cb={int(time.time()*1000)}","--port",PORT],capture_output=True,text=True,timeout=45)
        subprocess.run([CDP,"viewport",str(w),str(h)]+(["mobile"] if mobile else [])+["--port",PORT],capture_output=True,text=True,timeout=30)
        time.sleep(3); subprocess.run([CDP,"screenshot",path,"--full","--port",PORT],capture_output=True,text=True,timeout=45)
    cap(1280,900,dpath,False); cap(390,844,mpath,True); srv.terminate()
    return dpath,mpath

def b64(p):
    try: return base64.b64encode(open(p,"rb").read()).decode()
    except: return None

def main():
    slug=sys.argv[2]; out=os.path.join(BENCH,"runs3",slug); os.makedirs(out,exist_ok=True)
    shutil.copy(os.path.join(VITE,"src","App.tsx"),"/tmp/_App_gv_bk.tsx")
    stub={name:f"{sig} {{ return <VStack><Text type=\"body\">{name}</Text></VStack>; }}" for name,sig,_ in SECTIONS}
    cur=dict(stub); rounds=[]; t0=time.time()
    # ---- round 0: decomposition build ----
    print(f"[{slug}] round 0: decomposition build",flush=True)
    r0sections=[]
    for name,sig,spec in SECTIONS:
        code,meta=gen_section(name,sig,spec,cur)
        cur[name]= code if code else stub[name]; meta["fell_back"]=code is None; r0sections.append(meta)
    ok,err,app=build_with(cur); open(os.path.join(out,"App.r0.tsx"),"w").write(app)
    dpath,mpath=shoot(slug,0)
    nb=sum(1 for m in r0sections if m.get("code"))
    ds=os.path.getsize(dpath) if os.path.exists(dpath) else 0; ms=os.path.getsize(mpath) if os.path.exists(mpath) else 0
    rounds.append({"round":0,"method":"decomposition","build_ok":ok,"sections_built":nb,"sections":r0sections,"desktop_png_bytes":ds,"mobile_png_bytes":ms})
    print(f"  round 0: build_ok={ok} sections={nb}/{len(SECTIONS)} shots(d={ds},m={ms})",flush=True)
    # ---- vision rounds ----
    crit=("Fix cramped/overflowing mobile layout: any fixed columns={N} that should collapse, weak hierarchy, "
          "inconsistent spacing, and anything unfinished. Prefer Grid columns={{minWidth:N}} so cards stack to 1 column on mobile.")
    for rnd in range(1,ROUNDS+1):
        print(f"[{slug}] round {rnd}: per-section vision revise",flush=True)
        dpng=b64(dpath); mpng=b64(mpath)
        if not dpng or not mpng: print("  no screenshots; stop"); break
        secmetas=[]
        for name,sig,spec in SECTIONS:
            code,meta=gen_section(name,sig,spec,cur,critique=crit,imgs=[dpng,mpng])
            if code: cur[name]=code
            meta["kept"]=bool(code); secmetas.append(meta)
        ok,err,app=build_with(cur); open(os.path.join(out,f"App.r{rnd}.tsx"),"w").write(app)
        dpath,mpath=shoot(slug,rnd)
        ds=os.path.getsize(dpath) if os.path.exists(dpath) else 0; ms=os.path.getsize(mpath) if os.path.exists(mpath) else 0
        totviol=sum(sum(rv(cur[n]).values()) for n,_,_ in SECTIONS)
        revised=sum(1 for m in secmetas if m.get("kept"))
        rounds.append({"round":rnd,"method":"vision-per-section","build_ok":ok,"sections_revised":revised,"violations":totviol,"sections":secmetas,"desktop_png_bytes":ds,"mobile_png_bytes":ms})
        print(f"  round {rnd}: build_ok={ok} revised={revised}/{len(SECTIONS)} viol={totviol} shots(d={ds},m={ms})",flush=True)
    ok,err,app=build_with(cur); open(os.path.join(out,"App.final.tsx"),"w").write(app)
    res={"model":sys.argv[1],"slug":slug,"method":"decomposition+vision","rounds":rounds,"final_ok":ok,"final_err":err[:200],
         "total_rounds":len([r for r in rounds if r.get("build_ok")]),"wall_total_s":round(time.time()-t0,1)}
    json.dump(res,open(os.path.join(out,"result.json"),"w"),indent=2)
    print(f"\n=== R3 {slug} (decomp+vision): {res['total_rounds']} good rounds, final_ok={ok} ===")
    shutil.copy("/tmp/_App_gv_bk.tsx",os.path.join(VITE,"src","App.tsx"))

if __name__=="__main__": main()
