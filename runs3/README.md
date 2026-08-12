# Run 3 — Vision-in-the-Loop

Each vision-capable local model builds the Run 2 production site, then is shown real
screenshots of its own output (desktop 1280×900 + mobile 390×844) and asked to critique
and revise toward a responsive, production-ready page. Build → re-shoot → feed both images
back → repeat, for 3 revision rounds (4 rounds total including round 0).

Pipeline: `harness_r3_vision.py` (one-shot base) / `harness_r3_decomp_vision.py` (decomposition base).
Screenshots via `cdp.mjs viewport W H [mobile]` (Emulation.setDeviceMetricsOverride) + `screenshot --full`.
Vision first confirmed on all four models (each correctly read a test image; all type=vlm).

## Results (honest)

| Model | Method | Rounds | Final render | Rule slips (r3) | Outcome |
|-------|--------|--------|--------------|-----------------|---------|
| Qwen 3.6 (27B) | one-shot + vision | 4/4 | renders, responsive | 0 | Vision **fixed mobile**: r0 used fixed `columns={4}`/`{3}` (cramped at 390px) → r3 responsive `columns={{minWidth}}` (4→7 responsive grids). |
| Muse Glimmer (28B) | one-shot + vision | 4/4 | renders, responsive | 3 | Kept polishing; rule slips crept up 0→0→1→3 (later edits added inline styles). |
| Nemotron 3 Nano (30B-A3B) | one-shot + vision | 4/4 built | renders but **collapsed** | 0 | **REGRESSED**: best r0 site (22 cards) → r1 built-but-blank (runtime crash) → r3 generic lorem-ipsum ("Title 1–10", brand garbled). Most responsive, worst design. |
| Gemma 4 e4b (7.5B) | **decomposition** + vision | 4/4 | renders, responsive | 34 (className leaks) | Decomposition **kept the full site** (30 headings, 15 cards) through all vision rounds — the mirror image of Nemotron. r0 decomposition build rendered blank; vision recovered it at r1. |

## Findings
- **Vision-in-the-loop is not universally beneficial.** It measurably improved Qwen's mobile layout,
  but *regressed* Nemotron from a complete florist site to lorem-ipsum scaffolding.
- **Structure beats raw size for small local models.** Gemma (7.5B) via decomposition outlasted
  Nemotron (30B) via one-shot: the fixed shell + independently-validated sections are a guardrail
  that keeps a small model anchored to the goal across revisions.
- **The build gate misses runtime crashes.** Both Nemotron (r1) and Gemma (r0) produced code that
  built cleanly but rendered blank (5 KB screenshots) — a real gap between "compiles" and "renders".
- Rule-adherence is not monotonic under self-revision: Muse's and Gemma's slip counts *rose* with
  more rounds.

Each `App.r{N}.tsx` is that round's unedited output; `App.final.tsx` is the deployed round-3 page.
`r{N}_desktop.png` / `r{N}_mobile.png` are the actual screenshots fed back that round (byte sizes are
evidence of real vs blank renders).
