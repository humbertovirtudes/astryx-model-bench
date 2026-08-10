# Astryx Model Benchmark — Evaluation Criteria

## Scoring (per task, per model)

### 1. Component Discovery (0-10)
- **10**: All requested Astryx components correctly imported and used
- **7-9**: Most components correct, minor import errors
- **4-6**: Half correct, hallucinated some component names
- **0-3**: Mostly wrong imports, confused with other libraries (MUI, Chakra, etc.)

### 2. CLI Performance (0-10)
- **10**: Correct `npx astryx` / `@astryxdesign/cli` usage if referenced
- **7-9**: Minor CLI command errors
- **4-6**: Wrong CLI commands but reasonable attempt
- **0-3**: No CLI awareness or completely wrong

### 3. Mobile Responsiveness (0-10)
- **10**: Proper responsive breakpoints, mobile-first approach
- **7-9**: Responsive but minor issues (missing breakpoints)
- **4-6**: Some responsive classes but inconsistent
- **0-3**: Desktop-only, no responsive considerations

### 4. Web Standards (0-10)
- **10**: Semantic HTML, proper ARIA, TypeScript types, accessible
- **7-9**: Good standards, minor gaps
- **4-6**: Basic standards, missing ARIA or semantics
- **0-3**: Poor HTML semantics, no accessibility, type errors

### Bonus: Code Quality
- Correct Astryx API usage (props, patterns)
- No inline styles (as requested)
- Proper file structure
- Production-ready patterns (useCallback, useMemo, error handling)

## Total Score: /40 per task
