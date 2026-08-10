# Astryx Model Benchmark

Compare local models on their ability to build React pages using Meta's Astryx design system.

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

## Methodology

1. Send each task prompt to each model via LMStudio API (127.0.0.1:1234)
2. Capture the full response (code + any reasoning)
3. Write output to `pages/<model>/<task>/`
4. Attempt `npm install && npm run build` on each result
5. Run Lighthouse/a11y audit on built pages
6. Write evaluation report to `results/<model>/<task>.md`

## Setup

```bash
cd ~/.hermes/astryx-model-bench
npx create-vite@latest base --template react-ts
cd base && npm install @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli
```
