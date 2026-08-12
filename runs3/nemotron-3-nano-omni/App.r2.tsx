import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

import {
  VStack,
  HStack,
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  Grid,
  Card,
  Heading,
  Text,
  Button,
  Badge,
  Divider,
  Link,
  Icon,
  AspectRatio,
  TextInput,
} from '@astryxdesign/core';
import {useState} from 'react';

const imageFill = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
} as const;

function getSeed() {
  return Math.floor(Math.random() * 10000);
}

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState<number>(0);
  const [email, setEmail] = useState<string>('');

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout>
        {/* Header */}
        <LayoutHeader padding={4}>
          <VStack spacing={6} align="center">
            {/* Logo + Title */}
            <HStack spacing={2}>
              <Icon icon="brand-logo" size="lg" color="primary" />
              <Heading level={1} size="md" weight="semibold">
                Astryx Shop
              </Heading>
            </HStack>

            {/* Right side: Cart badge and Theme toggle */}
            <HStack spacing={4} align="center">
              <Badge variant="neutral" label={cartCount} />
              <Button
                label="Cart"
                variant="ghost"
                size="sm"
                onClick={() => alert('Open cart')}
              >
                <Icon icon="shopping-cart" size="md" color="primary" />
              </Button>

              <Button
                label={mode === 'light' ? 'Dark' : 'Light'}
                variant="ghost"
                size="sm"
                onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
              />
            </HStack>
          </VStack>
        </LayoutHeader>

        {/* Main Content */}
        <LayoutContent padding={8}>
          {/* Hero Section */}
          <Card variant="blue" padding={6} maxWidth={800} width="100%">
            <AspectRatio ratio={4 / 3}>
              <img
                src={`https://picsum.photos/seed/${getSeed()}/800/600`}
                alt="Hero image showcasing latest collection"
                style={imageFill}
              />
            </AspectRatio>
            <Heading level={2} size="xl" color="primary">
              Discover Our Latest Collection
            </Heading>
            <Text type="body" weight="normal" maxLines={2}>
              Experience the perfect blend of style and comfort. Our new collection features premium materials and timeless designs.
            </Text>
            <Button
              label="Shop Now"
              variant="primary"
              size="md"
              onClick={() => alert('Navigate to shop')}
            />
          </Card>

          {/* Product Grid */}
          <Grid columns={{ minWidth: 250 }} gap={8} align="stretch">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} variant="muted" padding={4} width="100%">
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={`https://picsum.photos/seed/${getSeed()}/${300 + i * 50}/200`}
                    alt={`Product ${i + 1}`}
                    style={imageFill}
                  />
                </AspectRatio>
                <Heading level={3} size="sm" color="secondary">
                  Product {i + 1}
                </Heading>
                <Text type="body" weight="medium" maxLines={1}>
                  Short description of product {i + 1}.
                </Text>
                <Badge variant="info" label="New" />
              </Card>
            ))}
          </Grid>

          {/* Newsletter */}
          <Card variant="gray" padding={6} width="100%">
            <Heading level={3} size="sm" color="secondary">
              Subscribe to our newsletter
            </Heading>
            <Text type="body" weight="normal" maxLines={1}>
              Stay updated with the latest offers and news.
            </Text>
            <HStack spacing={2} align="center">
              <TextInput
                label="Email address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="sm"
              />
              <Button
                label="Subscribe"
                variant="primary"
                size="sm"
                onClick={() => alert('Subscribed!')}
              >
                Go
              </Button>
            </HStack>
          </Card>

          {/* Footer */}
          <LayoutFooter padding={4}>
            <Text type="support" weight="medium" color="secondary">
              © 2025 Astryx. All rights reserved.
            </Text>
          </LayoutFooter>
        </LayoutContent>
      </Layout>
    </Theme>
  );
}