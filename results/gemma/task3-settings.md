# Gemma-4-e4b — Task 3: Settings Page

**Model:** `google/gemma-4-e4b`
**Result:** ❌ FAILED — Context overflow (HTTP 400)

## Analysis

Gemma-4-e4b (4B parameters) has a context window too small to handle the full Task 3 prompt (~1200 chars system + ~600 chars user prompt). Even with progressively shortened prompts (1241 → 876 → 591 chars), LMStudio returned HTTP 400 / "Compute error".

This is a significant finding: **4B models may not have enough context headroom for complex multi-file React prompts with detailed Astryx component requirements.** The model worked fine on simpler tasks (Login: 883 chars, Dashboard: 1081 chars, Chat: 1200 chars) but the Settings task's requirement for 6 separate files pushed it over the edge.

## Implication

For agent-assisted coding with Astryx, models under ~7B parameters may struggle with multi-component tasks that require generating 5+ files simultaneously. Workaround: break into smaller single-file prompts.
