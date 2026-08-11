import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Badge } from '@astryxdesign/core/Badge';
import { Divider } from '@astryxdesign/core/Divider';
import { Link } from '@astryxdesign/core/Link';
import { useState } from 'react';

export default function App() {
  const [cart, setCart] = useState(0);
  const add = () => setCart(c => c + 1);

  return (
    <Theme theme={neutralTheme}>
      <HStack justify="center" padding={4}>
        <VStack maxWidth={1100} gap={8} paddingInline={4}>
          <HStack justify="between" hAlign="center" paddingBlock={2}>
            <Heading level={2}>Petal & Stem</Heading>
            <Button variant="secondary" label={`Cart (${cart})`} />
          </HStack>

          <VStack hAlign="center" gap={3} paddingBlock={4}>
            <Heading level={1} type="display-1" justify="center">Flowers made for moments</Heading>
            <Text type="large" justify="center" color="secondary">Fresh, locally-sourced blooms delivered with care.</Text>
            <Button variant="primary" label="Shop Now" />
          </VStack>

          <VStack gap={4}>
            <Heading level={2} justify="center">Featured Bouquets</Heading>
            <Grid columns={{ minWidth: 280 }} gap={4}>
              <Card variant="pink" padding={4}>
                <VStack gap={2}>
                  <Badge variant="success" label="Bestseller" />
                  <Heading level={3}>Rose Romance</Heading>
                  <Text type="supporting">Classic red roses for timeless romance.</Text>
                  <Text weight="bold">$65</Text>
                  <Button size="sm" variant="primary" label="Add to Cart" onClick={add} />
                </VStack>
              </Card>
              <Card variant="purple" padding={4}>
                <VStack gap={2}>
                  <Badge variant="warning" label="Seasonal" />
                  <Heading level={3}>Peony Blush</Heading>
                  <Text type="supporting">Soft blush peonies in full bloom.</Text>
                  <Text weight="bold">$72</Text>
                  <Button size="sm" variant="primary" label="Add to Cart" onClick={add} />
                </VStack>
              </Card>
              <Card variant="yellow" padding={4}>
                <VStack gap={2}>
                  <Heading level={3}>Tulip Sunrise</Heading>
                  <Text type="supporting">Vibrant tulips in warm sunrise hues.</Text>
                  <Text weight="bold">$48</Text>
                  <Button size="sm" variant="primary" label="Add to Cart" onClick={add} />
                </VStack>
              </Card>
              <Card variant="orange" padding={4}>
                <VStack gap={2}>
                  <Badge variant="success" label="Bestseller" />
                  <Heading level={3}>Sunflower Field</Heading>
                  <Text type="supporting">Cheerful sunflowers for bright days.</Text>
                  <Text weight="bold">$55</Text>
                  <Button size="sm" variant="primary" label="Add to Cart" onClick={add} />
                </VStack>
              </Card>
              <Card variant="teal" padding={4}>
                <VStack gap={2}>
                  <Heading level={3}>Orchid Elegance</Heading>
                  <Text type="supporting">Exotic orchids with lasting grace.</Text>
                  <Text weight="bold">$89</Text>
                  <Button size="sm" variant="primary" label="Add to Cart" onClick={add} />
                </VStack>
              </Card>
              <Card variant="green" padding={4}>
                <VStack gap={2}>
                  <Badge variant="warning" label="Seasonal" />
                  <Heading level={3}>Wildflower Meadow</Heading>
                  <Text type="supporting">A mix of wildflowers, hand-gathered.</Text>
                  <Text weight="bold">$52</Text>
                  <Button size="sm" variant="primary" label="Add to Cart" onClick={add} />
                </VStack>
              </Card>
            </Grid>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>About Petal & Stem</Heading>
            <Text type="body">We grow and source flowers from local farms to ensure peak freshness and support our community. Every bouquet is hand-tied with care.</Text>
            <Text type="body">From everyday joy to milestone moments, we craft arrangements that feel personal, sustainable, and beautiful.</Text>
          </VStack>

          <Card variant="muted" padding={4}>
            <VStack gap={3}>
              <Heading level={2}>Visit Us</Heading>
              <VStack gap={1}>
                <Heading level={4}>Address</Heading>
                <Text type="body">123 Blossom Lane, Garden City</Text>
              </VStack>
              <VStack gap={1}>
                <Heading level={4}>Hours</Heading>
                <Text type="body">Tue–Sat 9am–6pm • Sun 10am–4pm</Text>
              </VStack>
              <VStack gap={1}>
                <Heading level={4}>Phone</Heading>
                <Text type="body">(555) 123-4567</Text>
              </VStack>
              <Link href="#" isStandalone>Get Directions</Link>
            </VStack>
          </Card>

          <VStack hAlign="center" gap={2} paddingBlock={4}>
            <Heading level={3}>Petal & Stem</Heading>
            <Text type="supporting">Fresh flowers, thoughtfully made.</Text>
          </VStack>
        </VStack>
      </HStack>
    </Theme>
  );
}