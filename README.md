# Astryx Model Benchmark

Compare local models on their ability to build React pages using Meta's Astryx design system.

## Results Summary

| Model | Task 1: Login | Task 2: Dashboard | Task 3: Settings | Task 4: Chat | Avg |
|-------|:---:|:---:|:---:|:---:|:---:|
| **Gemma-4-e4b** (4B) | 18/40 | 14/40 | ❌ Context overflow | 21/40 | **17.7/40** |
| **Qwen-3.6-27b** (27B) | 35/40 | ❌ Timeout | ❌ Timeout | ❌ Timeout | **35/40** |

## Key Finding

Qwen is **2x better** on code quality but **20x slower** on LMStudio. Gemma is fast but hallucinates MUI components and ignores "no inline styles" instructions.

## Live Sites

All 4 sites built and running on Vite dev servers:

| Site | Port | Model | Task |
|------|------|-------|------|
| [Gemma Login](http://localhost:5001) | 5001 | Gemma-4-e4b | Task 1 |
| [Qwen Login](http://localhost:5002) | 5002 | Qwen-3.6-27b | Task 1 |
| [Gemma Dashboard](http://localhost:5003) | 5003 | Gemma-4-e4b | Task 2 |
| [Gemma Chat](http://localhost:5004) | 5004 | Gemma-4-e4b | Task 4 |

## Models

| Model | Type | Why |
|-------|------|-----|
| `google/gemma-4-e4b` | Small generalist | Baseline — can a 4B model follow Astryx docs? |
| `qwen/qwen3.6-27b` | Coding-focused | Primary comparison — 27B coding model |
| `nvidia/nemotron-3-nano-omni` | Research/analysis | Future — reasoning-heavy model |

## Evaluation Criteria

1. **Component Discovery** — Does the model find and import the correct Astryx components?
2. **CLI Performance** — Does the model use `astryx` CLI commands correctly?
3. **Mobile Responsiveness** — Does the output render correctly on mobile viewports?
4. **Web Standards** — Semantic HTML, a11y attributes, proper TypeScript, valid imports

## Tasks

Each task is a self-contained prompt asking the model to produce a single-page React app using Astryx.

### Task 1: Login Page
Simple auth form — tests FormLayout, TextInput, Button, Card, Field components.

### Task 2: Dashboard
Data display — tests Table, Card, Grid, Badge, TopNav, AppShell.

### Task 3: Settings Panel
Configuration UI — tests Toggle, Switch, Select, TabList, SideNav, Dialog.

### Task 4: Chat Interface
Conversational UI — tests Chat, Message, Avatar, Button, TextArea, Layout.

## Structure

```
astryx-model-bench/
├── prompts/           # Benchmark prompts for each task
├── results/           # Raw model outputs + comparison report
│   ├── gemma/
│   ├── qwen/
│   └── comparison.md
├── sites/             # Built Vite+React+Astryx projects
│   ├── gemma-login/
│   ├── qwen-login/
│   ├── gemma-dashboard/
│   └── gemma-chat/
├── scripts/           # Runner scripts
├── eval-criteria.md   # Scoring rubric
└── README.md
```

## Run Locally

```bash
cd sites/gemma-login && npm run dev -- --port 5001
cd sites/qwen-login && npm run dev -- --port 5002
cd sites/gemma-dashboard && npm run dev -- --port 5003
cd sites/gemma-chat && npm run dev -- --port 5004
```
