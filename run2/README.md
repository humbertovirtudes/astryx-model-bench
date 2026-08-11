# Run 2 — Production-grade site

A far more demanding brief than [Run 1](../): a full **10-section marketing site** for Petal & Stem —
app shell, hero, trust strip, product grid with real imagery, occasions, how-it-works, testimonials,
a controlled newsletter input, about, visit-us, footer — plus a **working light/dark theme toggle**,
cart, and newsletter, all wired with `useState`.

Live pages (unedited model output, `@astryxdesign/core@0.3.0`):
https://humbertovirtudes.github.io/astryx-model-bench/

## Results

| Model | Params | Run 2 result | tok/s | Gen tokens | Rule slips | Theme toggle |
| --- | --- | --- | --- | --- | --- | --- |
| Qwen 3.6 | 27B | ✅ built (iter 1) | 12.4 | 7014 | 0 | ✓ works |
| Muse Glimmer | 28B (reasoning) | ✅ built (iter 1) | 17.9 | 5982 | 0 | ✓ works |
| Nemotron 3 Nano Omni | 30B MoE | ✅ built (iter 1) | 57.7 | 10436 | 4 (inline-style) | ✓ works |
| Gemma 4 e4b | 7.5B | ❌ failed (5 iters) | 67.8 | — | — | — |

## Run 1 vs Run 2

| Model | R1 | R2 |
| --- | --- | --- |
| Qwen 3.6 (27B) | ✅ iter 1, 0 slips | ✅ iter 1, 0 slips |
| Muse Glimmer (28B) | ✅ iter 1, 0 slips | ✅ iter 1, 0 slips |
| Nemotron (30B MoE) | ✅ iter 1, 0 slips | ✅ iter 1, 4 slips |
| Gemma 4 e4b (7.5B) | ✅ iter 1, 3 slips | ❌ failed 5 iters |

**The production spec is where model size shows.** The three larger models each built the full
site — theme toggle and all — on the first attempt. The 7.5B Gemma, which passed Run 1's simpler
prompt, could not hold a 10-section page together across five repair rounds (malformed JSX and
missing imports; output collapsed to ~370 tokens by the final try). Reproduced across three separate attempts.

## Harness note

The Run 2 gate adds an **undefined-identifier check**: the bundler (rolldown) will happily build a
file that uses a component it never imported — e.g. `<Theme>` with no import — but that page then
crashes at runtime with `Theme is not defined`. Run 1's simpler prompt rarely triggered this, but on
the larger Run 2 pages two first-attempts (Nemotron, Gemma) omitted an import and "built" while
rendering blank. The strengthened gate rejects those and feeds the missing import back as a fix,
matching what a real dev server would surface. Nemotron then produced a clean, rendering page on re-run.

```
prompts/    the exact Run 2 system + user prompt
results/    per-model result.json (iterations, timings, violations)
sites/      each green model's generated App.tsx
harness_r2.py   the generate → build (+undefined-ref gate) → repair loop
```
