Build a chat interface using Astryx design system. Requirements:

- Use Astryx components: AppShell, Center, TextInput, Button, Avatar, Card, List, Heading, Text, IconButton
- Full-height chat layout with:
  - Header bar with contact name and status indicator
  - Scrollable message area with alternating user/bot message bubbles
  - Message input bar at bottom with text input and send button
- Each message shows: Avatar, timestamp, message text bubble
- User messages aligned right, bot messages aligned left
- Must be fully responsive — on mobile the input bar is sticky at bottom, avatars shrink
- Proper scroll behavior: new messages scroll into view
- Keyboard accessible: Enter to send, Tab navigation through controls
- ARIA: role="log" for message area, aria-live="polite" for new messages
- TypeScript, functional components with useState and useRef

Provide the full code for:
1. src/main.tsx (entry with Theme provider)
2. src/App.tsx (AppShell layout)
3. src/components/ChatWindow.tsx (main chat component)
4. src/components/MessageBubble.tsx (individual message)

Only use @astryxdesign/core and @astryxdesign/theme-neutral. Use Astryx layout tokens and className, not inline styles.