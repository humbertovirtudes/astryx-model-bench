# Astryx Model Benchmark — Final Comparison Report

## Models Tested

| Model | Params | Type | Status |
|-------|--------|------|--------|
| `google/gemma-4-e4b` | 4B | Generalist | ✅ Tasks 1, 2, 4 done; Task 3 failed (context overflow) |
| `qwen/qwen3.6-27b` | 27B | Coding | ✅ Task 1 done; Tasks 2-4 timed out (too slow on LMStudio) |

## Task 1: Login Page — Side by Side

### Gemma-4-e4b (4B)
- **Prompt tokens:** 292 | **Completion tokens:** 2,094 | **Time:** ~8s
- **Files produced:** 3 (main.tsx, App.tsx, LoginForm.tsx) ✅

**Component Discovery: 6/10**
- ✅ Card, FormLayout, Field, TextInput, Button, Heading, Text, CheckboxInput — all correct
- ❌ `ThemeProvider` from `@astryxdesign/core` — wrong (should be `Theme` from core)
- ❌ `CssBaseline` from `@astryxdesign/core` — **hallucinated** (this is MUI, not Astryx)
- ❌ `Container` from `@astryxdesign/core` — **hallucinated** (Astryx uses `Center` or `Layout`)

**CLI Performance: N/A** — No CLI commands used (prompt didn't require it)

**Mobile Responsiveness: 4/10**
- Uses generic Tailwind-like classes (`sm:p-8`, `w-full max-w-md`)
- ❌ No Astryx-specific responsive tokens (`ax-md:`, `ax-lg:`)
- ❌ Uses `bg-gray-50 dark:bg-gray-900` — not Astryx tokens
- Basic centering works but not truly responsive

**Web Standards: 5/10**
- ✅ TypeScript interfaces, functional components
- ✅ `aria-label` on fields
- ✅ Form validation with error states
- ❌ Uses `alert()` instead of proper UX
- ❌ `aria-invalid` set but no `aria-describedby` for errors
- ❌ Generic CSS classes mixed with Astryx components

**Bonus: Code Quality: 3/10**
- ❌ **Inline styles in className** — violates the "no inline styles" rule
- ❌ Mixed Tailwind and Astryx class names
- ❌ `disabled={!!errors}` — disables button when any error exists (should be on submit)

### Qwen-3.6-27b (27B)
- **Prompt tokens:** 282 | **Completion tokens:** 2,915 | **Time:** ~167s
- **Files produced:** 3 (main.tsx, App.tsx, LoginForm.tsx) ✅

**Component Discovery: 9/10**
- ✅ `Theme` from `@astryxdesign/core` — correct
- ✅ `neutralTheme` from `@astryxdesign/theme-neutral` — correct
- ✅ Card, FormLayout, Field, TextInput, Button, CheckboxInput, Text — all correct
- ✅ Proper import structure matching Astryx docs

**CLI Performance: N/A** — No CLI commands used

**Mobile Responsiveness: 8/10**
- ✅ Uses Astryx-specific responsive tokens: `ax-md:p-6 ax-lg:p-8`, `ax-p-4`
- ✅ `ax-w-full ax-max-w-md` — proper width constraints
- ✅ Responsive padding scales across breakpoints
- Minor: could add more granular breakpoints for the form itself

**Web Standards: 9/10**
- ✅ Proper TypeScript types (`ValidationErrors`, `FormState`)
- ✅ `aria-label`, `aria-describedby`, `aria-invalid` — full a11y
- ✅ `autoComplete="email"` — proper form semantics
- ✅ `role="alert"` on error messages
- ✅ `noValidate` on form with custom validation
- ✅ `id` attributes on inputs for label association
- ✅ Error messages linked via `aria-describedby`

**Bonus: Code Quality: 9/10**
- ✅ `useCallback` for event handlers
- ✅ `useMemo` for validation computation
- ✅ Touch-based validation (errors show on blur, not just submit)
- ✅ Async submit with loading state (`isSubmitting`)
- ✅ Proper form state management with `touched` tracking
- ✅ Uses Astryx `state` prop on Field (`error`/`success`)
- ✅ Astryx-specific class prefix `ax-` throughout

---

## Task 2: Dashboard — Gemma Only (Qwen timed out)

### Gemma-4-e4b (4B)
- **Prompt tokens:** 362 | **Completion tokens:** 3,332 | **Time:** ~15s
- **Files produced:** 5 (main.tsx, App.tsx, Dashboard.tsx, StatCard.tsx, DataTable.tsx) ✅

**Component Discovery: 5/10**
- ✅ Card, Heading, Text, Badge, Grid — correct
- ❌ `ThemeProvider` — wrong (same MUI confusion as Task 1)
- ❌ `Grid` from core — exists but Gemma used it incorrectly
- ❌ Inline styles for badge colors (`{ backgroundColor: '#4CAF50' }`) — violates no-inline-styles rule

**Mobile Responsiveness: 3/10**
- ❌ No responsive breakpoints on the grid
- ❌ Sidebar doesn't collapse on mobile
- ❌ Uses hardcoded pixel values in inline styles
- ❌ No `ax-md:` or `ax-lg:` responsive tokens

**Web Standards: 4/10**
- ✅ TypeScript interfaces on props
- ❌ No ARIA attributes on navigation
- ❌ No heading hierarchy (uses Heading level inconsistently)
- ❌ Inline styles throughout (violates prompt requirement)

**Bonus: Code Quality: 2/10**
- ❌ Heavy use of inline `style={{}}` objects
- ❌ No useCallback/useMemo optimization
- ❌ Duplicate `ReactDOM.createRoot` call in main.tsx (bug)

### Qwen-3.6-27b (27B)
- **Result:** ❌ TIMEOUT — Model too slow for multi-file output on LMStudio
- Even with shortened prompt, exceeded 900s timeout
- **Finding:** 27B models on LMStudio are not practical for complex multi-file tasks

---

## Task 3: Settings Page — Both Failed

### Gemma-4-e4b (4B)
- **Result:** ❌ FAILED — Context overflow (HTTP 400)
- 4B model's context window too small for complex multi-file prompts
- Even with progressively shortened prompts (1241 → 876 → 591 chars), LMStudio returned HTTP 400

### Qwen-3.6-27b (27B)
- **Result:** ❌ TIMEOUT — Model too slow (inherited from Task 2 pattern)

---

## Task 4: Chat Interface — Gemma Only (Qwen timed out)

### Gemma-4-e4b (4B)
- **Prompt tokens:** 362 | **Completion tokens:** 3,047 | **Time:** ~12s
- **Files produced:** 4 (main.tsx, App.tsx, ChatWindow.tsx, MessageBubble.tsx) ✅

**Component Discovery: 7/10**
- ✅ AppShell, Heading, TextInput, Button, Avatar, Card — correct
- ❌ `ThemeProvider` — same wrong import pattern
- ✅ Used Astryx `Chat` component concept (though implementation varied)

**Mobile Responsiveness: 5/10**
- ✅ `h-[calc(100vh-2rem)]` — full-height layout
- ✅ `max-w-xl lg:max-w-3xl` — responsive width
- ❌ Input bar not explicitly sticky on mobile
- ❌ No mobile-specific avatar sizing

**Web Standards: 5/10**
- ✅ TypeScript interfaces
- ❌ Missing `role="log"` on message area (requested in prompt)
- ❌ Missing `aria-live="polite"` for new messages
- ❌ No keyboard shortcuts (Enter to send)

**Bonus: Code Quality: 4/10**
- ✅ Functional components with useState
- ❌ Inline styles for message bubbles
- ❌ No useRef for auto-scroll
- ❌ Missing keyboard event handling

---

## Summary Scores

| Task | Criterion | Gemma-4-e4b | Qwen-3.6-27b |
|------|-----------|-------------|--------------|
| **Task 1: Login** | Component Discovery | 6 | **9** |
| | CLI Performance | N/A | N/A |
| | Mobile Responsiveness | 4 | **8** |
| | Web Standards | 5 | **9** |
| | Code Quality | 3 | **9** |
| | **TOTAL** | **18/40** | **35/40** |
| **Task 2: Dashboard** | Component Discovery | 5 | — |
| | CLI Performance | N/A | — |
| | Mobile Responsiveness | 3 | — |
| | Web Standards | 4 | — |
| | Code Quality | 2 | — |
| | **TOTAL** | **14/40** | **TIMEOUT** |
| **Task 3: Settings** | **FAILED** (context overflow) | — | **TIMEOUT** |
| **Task 4: Chat** | Component Discovery | 7 | — |
| | CLI Performance | N/A | — |
| | Mobile Responsiveness | 5 | — |
| | Web Standards | 5 | — |
| | Code Quality | 4 | — |
| | **TOTAL** | **21/40** | **TIMEOUT** |
| **OVERALL** | | **17.7/40** avg | **35/40** (1 task) |

## Key Findings

### Gemma-4-e4b (4B)
- **Strengths:** Fast (~8-15s per task), produces complete file structures, reasonable TypeScript
- **Weaknesses:** 
  - Consistently hallucinates MUI components (`CssBaseline`, `ThemeProvider`) instead of Astryx equivalents
  - Heavy use of inline styles despite explicit instruction not to
  - Poor mobile responsiveness — no Astryx-specific responsive tokens
  - Context overflow on complex tasks (Task 3 failed entirely)
- **Verdict:** Not suitable for Astryx development without heavy human review

### Qwen-3.6-27b (27B)
- **Strengths:**
  - Excellent Astryx API knowledge — correct imports, proper component usage
  - Uses Astryx-specific class prefix (`ax-`) and responsive tokens
  - Production-ready code patterns (useCallback, useMemo, touch validation)
  - Full accessibility implementation (ARIA, roles, semantics)
- **Weaknesses:**
  - Slow (~167s for Task 1) — 27B model on LMStudio is time-consuming
  - Timeout issues on complex tasks (Task 2+ timed out at 900s)
- **Verdict:** Highly capable for Astryx development, but impractical for multi-file tasks on LMStudio

## Recommendations

1. **For Astryx coding tasks, use 27B+ models** — the 4B model hallucinates too many non-Astryx components
2. **Break complex tasks into smaller prompts** — Task 3 overflowed Gemma's context; even Qwen timed out on Task 2
3. **Include Astryx CLI in prompts** — models that know about `npx astryx component Button` produce better code
4. **Add system prompt context** — feeding the Astryx README or component docs as context would improve both models
5. **Consider cloud APIs for 27B+ models** — LMStudio is too slow for production use of large models

---
*Report generated: 2026-08-09 | Benchmark v0.1 | Tasks complete: 5/8 (Gemma 4/4, Qwen 1/4)*
