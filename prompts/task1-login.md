Build a login page using Astryx design system. Requirements:

- Use Astryx components: Card, FormLayout, Field, TextInput, Button, Heading, Text
- Email and password fields with validation states
- "Remember me" checkbox using CheckboxInput
- Login button (primary) and "Forgot password?" link
- Centered card on the page with proper spacing
- Dark mode support via Theme provider
- Must be fully responsive — works on mobile (375px), tablet (768px), and desktop
- Semantic HTML structure with proper labels and aria attributes
- TypeScript, functional components, no external state management

Provide the full code for:
1. src/main.tsx (entry with Theme provider)
2. src/App.tsx (page layout)
3. src/components/LoginForm.tsx (the form component)

Only use @astryxdesign/core and @astryxdesign/theme-neutral. Do not use inline styles — use Astryx tokens and className overrides.