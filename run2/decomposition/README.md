# Run 2 — Decomposition (making the small model succeed)

The 7.5B **Gemma 4 e4b** passed Run 1's simple page but **failed the production 10-section Run 2
in one shot** — all five repair rounds, with output collapsing to ~370 tokens by the last try.
A small model can't hold a ~500-line file together at once.

**The fix is method, not prompt.** Same 10-section spec — but built by *task decomposition*:

1. A fixed, correct **App shell** ([`shell_template.tsx`](shell_template.tsx)) owns the hard parts:
   all imports, the `Theme` + `mode`/`cart`/`email` state, the header with the working theme toggle,
   the `Layout`, and calls to 10 section components.
2. Gemma then wrote **each section as one small, independent function** — Hero, Trust, Featured,
   Occasions, HowItWorks, Testimonials, Newsletter, About, Visit, Footer.
3. Each section was **build-validated in isolation** against the shell (others stubbed), and repaired
   on its own if it failed — tiny blast radius.
4. All sections assembled → full build → render check.

## Result

| Metric | Value |
| --- | --- |
| Sections built | **10 / 10** |
| First-try sections | **10 / 10** (0 retries) |
| Rule violations | 1 (total, across all sections) |
| Final assembled build | ✅ green |
| Renders live (with working toggle) | ✅ yes |
| Wall time | 135 s |
| Avg generation speed | 85.4 tok/s |

Live: https://humbertovirtudes.github.io/astryx-model-bench/r2-gemma-4-e4b/

## The finding

Small local models **can** build a production Astryx page — they just need the work **broken down**.
The larger models (Qwen, Muse Glimmer, Nemotron) held the whole 10-section page in their head and
produced it one-shot. Gemma needed it in pieces. Decomposition is a general lever: give a small model
a correct scaffold and one small, well-scoped unit at a time, and it succeeds where the monolith fails.

```
shell_template.tsx   fixed, correct App shell (imports + state + section calls)
harness_decomp.py    the per-section generate -> isolated-build -> repair -> assemble loop
sites/…/App.tsx      the final assembled page (unedited section output in the fixed shell)
results/…/result.json  per-section metrics
```
