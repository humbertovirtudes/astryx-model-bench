Build a settings page using Astryx design system. Requirements:

- Use Astryx components: SideNav, TabList, Switch, Select, TextInput, Button, Dialog, Heading, Text, Divider, Banner
- Left sidebar with settings navigation (Profile, Notifications, Security, Appearance)
- Tab-based content area for each settings section
- Profile tab: editable name, email, bio fields with Save/Cancel buttons
- Notifications tab: Switch toggles for email, push, SMS notifications
- Security tab: Change password form with Dialog confirmation
- Appearance tab: Select for theme (light/dark/system), Select for language
- Must be fully responsive — sidebar becomes a dropdown on mobile, tabs scroll horizontally
- Proper focus management when Dialog opens
- ARIA attributes: role="tablist", aria-selected, aria-controls
- TypeScript, functional components with useState

Provide the full code for:
1. src/main.tsx (entry with Theme provider)
2. src/App.tsx (page layout with SideNav)
3. src/components/SettingsTabs.tsx (tab navigation)
4. src/components/ProfileSettings.tsx
5. src/components/NotificationSettings.tsx
6. src/components/SecuritySettings.tsx

Only use @astryxdesign/core and @astryxdesign/theme-neutral. No inline styles — use Astryx tokens.