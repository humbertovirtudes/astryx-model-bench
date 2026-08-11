# muse-glimmer

`App.tsx` in this folder is the **unedited output** of `meta/muse-glimmer` for the Petal & Stem task.

muse-glimmer is a **reasoning model** — it thinks in a separate `reasoning_content` channel before emitting the answer in `content`. It also initially could not be loaded at all: LM Studio's llama.cpp runtime (2.13.0) did not recognize the `muse-glimmer` architecture. A runtime update to 2.28.2 added support, after which it built the page on the first try with zero rule violations.

- Live page: https://humbertovirtudes.github.io/astryx-model-bench/muse-glimmer/
- Metrics: [`../../results/muse-glimmer/result.json`](../../results/muse-glimmer/result.json)
