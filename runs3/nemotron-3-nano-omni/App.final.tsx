import {
  VStack,
  HStack,
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  Grid,
  Card,
  AspectRatio,
  Heading,
  Text,
  Button,
  Badge,
  TextInput,
} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {useState} from 'react';

const imageFill = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
} as const;

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState<number>(0);
  const [email, setEmail] = useState<string>('');

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout height="fill" contentWidth={1200}>
        {/* Header */}
        <LayoutHeader padding={6}>
          <VStack align="center" spacing={6}>
            <Heading level={1} size="lg">
              Actory Shop
            </Heading>
            <HStack justify="end" spacing={4}>
              <Button
                label={mode === 'light' ? 'Dark' : 'Light'}
                variant="ghost"
                size="sm"
                onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
              />
              <Badge label={cartCount} variant="neutral" />
            </HStack>
          </VStack>
        </LayoutHeader>

        {/* Main Content */}
        <LayoutContent>
          {/* Hero Section */}
          <Card padding={0} width="100%">
            <AspectRatio ratio={4 / 3}>
              <img
                src={`https://picsum.photos/seed/${Date.now()}/800/600`}
                alt="Sunset over ocean waves"
                style={imageFill}
              />
            </AspectRatio>
          </Card>

          <VStack spacing={2}>
            <Heading level={3} size="md">
              Discover Our Latest Collection
            </Heading>
            <Text type="body" weight="normal">
              Explore stunning photography and nature scenes captured in high resolution. Each piece tells a story of adventure, serenity, and the beauty of our world.
            </Text>
            <Button label="Shop Now" variant="primary" size="md" />
          </VStack>

          {/* Product Grid */}
          <Grid columns={{ minWidth: 250 }} gap={8} align="center">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} variant="muted" padding={4}>
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={`https://picsum.photos/seed/${i + 100}/400/300`}
                    alt={`Product ${i + 1}`}
                    style={imageFill}
                  />
                </AspectRatio>
                <Heading level={4} size="sm">
                  Title {i + 1}
                </Heading>
                <Text type="body" weight="medium">
                  Short description of the product. Lorem ipsum dolor sit amet.
                </Text>
                <Badge label="NEW" variant="info" />
                <Button label="View" variant="secondary" size="sm" />
              </Card>
            ))}
          </Grid>

          {/* Newsletter */}
          <VStack spacing={8} padding={6}>
            <Heading level={3} size="md">
              Subscribe to our newsletter
            </Heading>
            <Text type="body">
              Join our community to receive exclusive updates, new releases, and special offers.
            </Text>
            <HStack spacing={2}>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
              <Button
                label="Subscribe"
                variant="primary"
                size="lg"
                isDisabled={!email.trim()}
                onClick={() => {
                  // placeholder action
                  alert('Subscribed!');
                  setEmail('');
                }}
              />
            </HStack>
          </VStack>
        </LayoutContent>

        {/* Footer */}
        <LayoutFooter padding={6}>
          <Text type="support" weight="medium">
            © 2025 Actory Shop. All rights reserved.
          </Text>
        </LayoutFooter>
      </Layout>
    </Theme>
  );
}