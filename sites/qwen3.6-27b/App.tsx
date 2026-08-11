import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {Link} from '@astryxdesign/core/Link';
import {useState} from 'react';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <Theme theme={neutralTheme}>
      <VStack padding={8} gap={10} maxWidth={1100} hAlign="center">
        {/* Header */}
        <HStack
          width="100%"
          justify="between"
          vAlign="center"
          paddingBlock={3}
          paddingInline={4}
        >
          <Heading level={2} color="primary">
            Petal &amp; Stem
          </Heading>
          <Button label={`Cart (${cartCount})`} variant="secondary" size="md" />
        </HStack>

        <Divider variant="subtle" />

        {/* Hero */}
        <VStack hAlign="center" gap={4} paddingBlock={8}>
          <Heading level={1} type="display-1" color="primary">
            Bloom Beautifully
          </Heading>
          <Text type="large" color="secondary">
            Hand-crafted bouquets made with love, delivered fresh to your door every day.
          </Text>
          <Button label="Shop Now" variant="primary" size="lg" />
        </VStack>

        <Divider variant="subtle" />

        {/* Featured Bouquets */}
        <VStack width="100%" gap={6}>
          <Heading level={2} justify="center">
            Featured Bouquets
          </Heading>
          <Grid columns={{minWidth: 280}} gap={4}>
            {/* Rose Bouquet */}
            <Card variant="pink" padding={4}>
              <VStack gap={2}>
                <HStack justify="between" vAlign="start" width="100%">
                  <Heading level={3}>Classic Rose Bouquet</Heading>
                  <Badge variant="success" label="Bestseller" />
                </HStack>
                <Text type="supporting" color="secondary">
                  A timeless arrangement of 24 long-stemmed red roses, wrapped in silk.
                </Text>
                <Text weight="bold">$54.99</Text>
                <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
              </VStack>
            </Card>

            {/* Peony Collection */}
            <Card variant="purple" padding={4}>
              <VStack gap={2}>
                <HStack justify="between" vAlign="start" width="100%">
                  <Heading level={3}>Peony Collection</Heading>
                  <Badge variant="success" label="Bestseller" />
                </HStack>
                <Text type="supporting" color="secondary">
                  Lush, fragrant peonies in soft blush and ivory tones — pure romance.
                </Text>
                <Text weight="bold">$62.00</Text>
                <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
              </VStack>
            </Card>

            {/* Tulip Arrangement */}
            <Card variant="yellow" padding={4}>
              <VStack gap={2}>
                <HStack justify="between" vAlign="start" width="100%">
                  <Heading level={3}>Spring Tulip Arrangement</Heading>
                  <Badge variant="warning" label="Seasonal" />
                </HStack>
                <Text type="supporting" color="secondary">
                  A cheerful mix of Dutch tulips in yellow, coral, and white.
                </Text>
                <Text weight="bold">$38.50</Text>
                <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
              </VStack>
            </Card>

            {/* Sunflower Bundle */}
            <Card variant="orange" padding={4}>
              <VStack gap={2}>
                <Heading level={3}>Sunflower Bundle</Heading>
                <Text type="supporting" color="secondary">
                  Bright, bold sunflowers that bring sunshine into any room.
                </Text>
                <Text weight="bold">$42.00</Text>
                <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
              </VStack>
            </Card>

            {/* Orchid Elegance */}
            <Card variant="teal" padding={4}>
              <VStack gap={2}>
                <HStack justify="between" vAlign="start" width="100%">
                  <Heading level={3}>Orchid Elegance</Heading>
                  <Badge variant="warning" label="Seasonal" />
                </HStack>
                <Text type="supporting" color="secondary">
                  Exotic Phalaenopsis orchids in a sleek ceramic planter.
                </Text>
                <Text weight="bold">$78.00</Text>
                <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
              </VStack>
            </Card>

            {/* Wildflower Mix */}
            <Card variant="green" padding={4}>
              <VStack gap={2}>
                <Heading level={3}>Wildflower Mix</Heading>
                <Text type="supporting" color="secondary">
                  A free-spirited medley of daisies, lavender, and baby's breath.
                </Text>
                <Text weight="bold">$35.00</Text>
                <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
              </VStack>
            </Card>
          </Grid>
        </VStack>

        <Divider variant="subtle" />

        {/* About */}
        <VStack hAlign="center" gap={4} paddingBlock={4}>
          <Heading level={2}>About Petal &amp; Stem</Heading>
          <Text type="large" color="secondary" justify="center">
            We believe every day deserves a little bloom. Our bouquets are hand-arranged by local florists using only the freshest, sustainably-sourced flowers from farms within 50 miles of our studio.
          </Text>
          <Text type="large" color="secondary" justify="center">
            Founded in 2018, Petal &amp; Stem has grown from a single corner shop to a beloved neighborhood staple — but our commitment to quality, care, and community has never changed.
          </Text>
        </VStack>

        <Divider variant="subtle" />

        {/* Visit Us */}
        <VStack width="100%" gap={4}>
          <Heading level={2} justify="center">
            Visit Us
          </Heading>
          <Card variant="default" padding={5}>
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={4}>Address</Heading>
                <Text type="body">142 Blossom Lane, Portland, OR 97201</Text>
              </VStack>
              <Divider variant="subtle" />
              <VStack gap={1}>
                <Heading level={4}>Hours</Heading>
                <Text type="body">Mon – Fri: 8:00 AM – 7:00 PM</Text>
                <Text type="body">Sat – Sun: 9:00 AM – 5:00 PM</Text>
              </VStack>
              <Divider variant="subtle" />
              <VStack gap={1}>
                <Heading level={4}>Phone</Heading>
                <Text type="body">(503) 555-0184</Text>
              </VStack>
              <Link href="https://maps.google.com" isExternalLink isStandalone>
                Get Directions
              </Link>
            </VStack>
          </Card>
        </VStack>

        <Divider variant="subtle" />

        {/* Footer */}
        <VStack hAlign="center" gap={1} paddingBlock={4}>
          <Heading level={4} color="secondary">
            Petal &amp; Stem
          </Heading>
          <Text type="supporting" color="secondary">
            Fresh flowers, handcrafted with care since 2018.
          </Text>
        </VStack>
      </VStack>
    </Theme>
  );
}