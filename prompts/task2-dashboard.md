Build a dashboard page using Astryx design system. Requirements:

- Use Astryx components: AppShell, TopNav, SideNav, Grid, Card, Badge, Table, Heading, Text, Button
- Top navigation with logo, search bar, and user avatar
- Side navigation with at least 5 menu items using icons
- Main content area with:
  - 4 stat cards in a responsive grid (showing metrics with trend indicators)
  - A data table with at least 5 columns and 8 rows of sample data
  - Badges for status indicators (active, warning, error states)
- Must be fully responsive — sidebar collapses on mobile, grid adapts from 1 to 4 columns
- Semantic HTML with proper heading hierarchy (h1 > h2 > h3)
- TypeScript, functional components

Provide the full code for:
1. src/main.tsx (entry with Theme provider)
2. src/App.tsx (AppShell layout)
3. src/components/Dashboard.tsx (main dashboard content)
4. src/components/StatCard.tsx (reusable stat card)
5. src/components/DataTable.tsx (table with sample data)

Only use @astryxdesign/core and @astryxdesign/theme-neutral. Use Astryx layout tokens, not inline styles.