#!/usr/bin/env python3
import json
import urllib.request
import sys
import os

BASE = "http://127.0.0.1:1234/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

def run_model(model: str, prompt: str) -> str:
    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": "You are an expert React developer. You write clean, production-ready TypeScript code using the Astryx design system (@astryxdesign/core). Always provide complete file contents. Do not use inline styles — use Astryx tokens and className overrides. Make everything responsive for mobile."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2,
        "max_tokens": 20000,
        "stream": False
    })
    
    req = urllib.request.Request(BASE, data=payload.encode(), headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, timeout=900) as resp:
        data = json.loads(resp.read())
    
    content = data["choices"][0]["message"]["content"]
    usage = data.get("usage", {})
    return content, usage

model = sys.argv[1]
task_file = sys.argv[2]
output_file = sys.argv[3]

with open(task_file) as f:
    prompt = f.read()

print(f"Running {model} on {task_file}...", flush=True)
content, usage = run_model(model, prompt)

os.makedirs(os.path.dirname(output_file), exist_ok=True)
model_short = model.split("/")[-1]
with open(output_file, "w") as f:
    f.write(f"# {model} — {os.path.basename(task_file).replace('.md', '').replace('task', 'Task ').title()}\n\n")
    f.write(f"**Model:** `{model}`\n")
    f.write(f"**Prompt tokens:** {usage.get('prompt_tokens', 'N/A')}\n")
    f.write(f"**Completion tokens:** {usage.get('completion_tokens', 'N/A')}\n\n")
    f.write("---\n\n")
    f.write(content)

print(f"Done. {usage.get('completion_tokens', 'N/A')} tokens, {len(content)} chars -> {output_file}", flush=True)
