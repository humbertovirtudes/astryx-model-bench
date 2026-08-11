

import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

import {VStack, HStack, Layout, LayoutContent, LayoutHeader, LayoutFooter} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {Link} from '@astryxdesign/core/Link';
import {Icon} from '@astryxdesign/core/Icon';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {TextInput} from '@astryxdesign/core/TextInput';
import {useState} from 'react';

const imageFill = { width: '100%', height: '100%', objectFit: 'cover' } as const;

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout height="fill" contentWidth={1200}>
        {/* Header */}
        <LayoutHeader padding={4}>
          <HStack align="start" gap={6}>
            <Heading level={1}>Petal & Stem</Heading>

            {/* Navigation */}
            <HStack justify="end" spacing={6}>
              <Button variant="ghost" size="sm">Shop</Button>
              <Button variant="ghost" size="sm">Occasions</Button>
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </HStack>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
            >
              {mode === 'light' ? 'Dark' : 'Light'}
            </Button>

            {/* Cart button */}
            <Button
              label={`Cart (${cartCount})`}
              variant="ghost"
              size="sm"
              onClick={() => setCartCount(c => c + 1)}
            />
          </HStack>
        </LayoutHeader>

        {/* Main Content */}
        <LayoutContent padding={6}>
          {/* HERO */}
          <Grid columns={{minWidth: 340}} gap={6}>
            {/* Left Column */}
            <VStack gap={2}>
              <Badge variant="neutral">Fresh daily · Locally grown</Badge>
              <Heading level={1} type="display-1" color="primary">
                Hand‑tied bouquets, delivered with love
              </Heading>
              <Text type="large" color="secondary">
                Discover the freshest, locally‑grown flowers arranged by our master florists. Each bouquet is crafted daily to ensure vibrant, lasting beauty.
              </Text>

              <HStack spacing={6}>
                <Button
                  label="Shop the collection"
                  variant="primary"
                  size="md"
                  endContent={<Icon icon="arrowRight" size="sm" label="Next" />}
                />
                <Button
                  label="How it works"
                  variant="ghost"
                  size="sm"
                />
              </HStack>
            </VStack>

            {/* Right Column – Hero Image */}
            <Card padding={0}>
              <AspectRatio ratio={4 / 3}>
                <img
                  src={`https://picsum.photos/seed/petal-hero/800/600`}
                  alt="Elegant bouquet of mixed flowers"
                  style={imageFill}
                />
              </AspectRatio>
            </Card>
          </Grid>

          {/* TRUST STRIP */}
          <Grid columns={4} gap={6}>
            <VStack align="center" gap={2}>
              <Icon icon="calendar" size="sm" label="Delivery schedule" />
              <Text type="label">Same‑day delivery</Text>
            </VStack>

            <VStack align="center" gap={2}>
              <Icon icon="check" size="sm" label="Freshness guarantee" />
              <Text type="label">7‑day freshness guarantee</Text>
            </VStack>

            <VStack align="center" gap={2}>
              <Icon icon="info" size="sm" label="Handcrafted" />
              <Text type="label">Hand‑tied by florists</Text>
            </VStack>

            <VStack align="center" gap={2}>
              <Icon icon="success" size="sm" label="Eco‑friendly" />
              <Text type="label">Carbon‑neutral shipping</Text>
            </VStack>
          </Grid>

          {/* FEATURED BOUQUETS */}
          <Heading level={2} color="primary">
            Featured Bouquets
          </Heading>
          <Text type="body" color="secondary" maxLines={1}>
            Curated selections for every occasion, each with a story to tell.
          </Text>

          <Grid columns={{minWidth: 300}} gap={6}>
            {/* Rose */}
            <Card variant="default" padding={4}>
              <AspectRatio ratio={1}>
                <img
                  src={`https://picsum.photos/seed/petal-rose/400/400`}
                  alt="Red rose bouquet"
                  style={imageFill}
                />
              </AspectRatio>
              <Heading level={3} color="primary">Rose</Heading>
              <Text type="supporting" maxLines={2} color="secondary">
                Deep red roses, hand‑picked for their classic romance and lasting fragrance.
              </Text>
              <Text type="body" weight="bold">$59.00</Text>
              <Badge variant="success">Bestseller</Badge>
              <Button
                label="Add to Cart"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Peony */}
            <Card variant="default" padding={4}>
              <AspectRatio ratio={1}>
                <img
                  src={`https://picsum.photos/seed/petal-peony/400/400`}
                  alt="Pink peony bouquet"
                  style={imageFill}
                />
              </AspectRatio>
              <Heading level={3} color="primary">Peony</Heading>
              <Text type="supporting" maxLines={2} color="secondary">
                Soft pink peonies, symbolizing prosperity and a touch of elegance.
              </Text>
              <Text type="body" weight="bold">$65.00</Text>
              <Badge variant="warning">Seasonal</Badge>
              <Button
                label="Add to Cart"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Tulip */}
            <Card variant="default" padding={4}>
              <AspectRatio ratio={1}>
                <img
                  src={`https://picsum.photos/seed/petal-tulip/400/400`}
                  alt="Yellow tulip bouquet"
                  style={imageFill}
                />
              </AspectRatio>
              <Heading level={3} color="primary">Tulip</Heading>
              <Text type="supporting" maxLines={2} color="secondary">
                Bright yellow tulips, fresh and cheerful, perfect for spring celebrations.
              </Text>
              <Text type="body" weight="bold">$54.00</Text>
              <Badge variant="info">New</Badge>
              <Button
                label="Add to Cart"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Sunflower */}
            <Card variant="default" padding={4}>
              <AspectRatio ratio={1}>
                <img
                  src={`https://picsum.photos/seed/petal-sunflower/400/400`}
                  alt="Sunflower bouquet"
                  style={imageFill}
                />
              </AspectRatio>
              <Heading level={3} color="primary">Sunflower</Heading>
              <Text type="supporting" maxLines={2} color="secondary">
                Sunny sunflowers that bring warmth and joy to any space.
              </Text>
              <Text type="body" weight="bold">$58.00</Text>
              {/* No badge */}
              <Button
                label="Add to Cart"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Orchid */}
            <Card variant="default" padding={4}>
              <AspectRatio ratio={1}>
                <img
                  src={`https://picsum.photos/seed/petal-orchid/400/400`}
                  alt="Orchid bouquet"
                  style={imageFill}
                />
              </AspectRatio>
              <Heading level={3} color="primary">Orchid</Heading>
              <Text type="supporting" maxLines={2} color="secondary">
                Exotic orchids, meticulously arranged for sophisticated gifting.
              </Text>
              <Text type="body" weight="bold">$72.00</Text>
              {/* No badge */}
              <Button
                label="Add to Cart"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Wildflower */}
            <Card variant="default" padding={4}>
              <AspectRatio ratio={1}>
                <img
                  src={`https://picsum.photos/seed/petal-wildflower/400/400`}
                  alt="Wildflower mix"
                  style={imageFill}
                />
              </AspectRatio>
              <Heading level={3} color="primary">Wildflower</Heading>
              <Text type="supporting" maxLines={2} color="secondary">
                A rustic mix of native wildflowers, celebrating natural beauty.
              </Text>
              <Text type="body" weight="bold">$61.00</Text>
              {/* No badge */}
              <Button
                label="Add to Cart"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>
          </Grid>

          {/* OCCASIONS */}
          <Heading level={2} color="primary" style={{marginTop: '8px'}}>
            Occasions
          </Heading>
          <Grid columns={3} gap={6}>
            <Card variant="red" padding={4}>
              <Heading level={4}>Birthday</Heading>
              <Text type="body">Celebrate with vibrant, fresh blooms.</Text>
            </Card>

            <Card variant="pink" padding={4}>
              <Heading level={4}>Anniversary</Heading>
              <Text type="body">Mark the moment with timeless elegance.</Text>
            </Card>

            <Card variant="gray" padding={4}>
              <Heading level={4}>Sympathy</Heading>
              <Text type="body">Offer comfort with serene, understated arrangements.</Text>
            </Card>

            <Card variant="yellow" padding={4}>
              <Heading level={4}>Just Because</Heading>
              <Text type="body">Send a surprise that brightens their day.</Text>
            </Card>
          </Grid>

          {/* HOW IT WORKS */}
          <Heading level={2} color="primary" style={{marginTop: '8px'}}>
            How It Works
          </Heading>
          <Grid columns={3} gap={6}>
            <VStack align="center" gap={2}>
              <Icon icon="search" size="lg" label="Choose" />
              <Heading level={3}>Choose</Heading>
              <Text type="body">Select your favorite arrangement.</Text>
            </VStack>

            <VStack align="center" gap={2}>
              <Icon icon="copy" size="lg" label="Hand‑tied" />
              <Heading level={3}>We Hand‑Tie</Heading>
              <Text type="body">Our artisans craft each bouquet with care.</Text>
            </VStack>

            <VStack align="center" gap={2}>
              <Icon icon="calendar" size="lg" label="Delivery" />
              <Heading level={3}>Same‑day Delivery</Heading>
              <Text type="body">Fast, reliable delivery right to your door.</Text>
            </VStack>
          </Grid>

          {/* TESTIMONIALS */}
          <Heading level={2} color="primary" style={{marginTop: '8px'}}>
            Testimonials
          </Heading>
          <Grid columns={3} gap={6}>
            <Card variant="muted" padding={4}>
              <Text type="supporting" maxLines={3}>“The flowers arrived fresh and vibrant, exactly as described.”</Text>
              <HStack spacing={2} align="end">
                <Heading level={4}>Emily R.</Heading>
                <Text type="label">Customer</Text>
              </HStack>
            </Card>

            <Card variant="muted" padding={4}>
              <Text type="supporting" maxLines={3}>“A perfect gift for my mother’s birthday – she was thrilled!”</Text>
              <HStack spacing={2} align="end">
                <Heading level={4}>James L.</Heading>
                <Text type="label">Customer</Text>
              </HStack>
            </Card>

            <Card variant="muted" padding={4}>
              <Text type="supporting" maxLines={3}>“Exceptional service and beautiful arrangements every time.”</Text>
              <HStack spacing={2} align="end">
                <Heading level={4}>Sofia M.</Heading>
                <Text type="label">Customer</Text>
              </HStack>
            </Card>
          </Grid>

          {/* NEWSLETTER */}
          <Card variant="muted" padding={6}>
            <Heading level={2} color="primary">
              Stay Blooming
            </Heading>
            <Text type="body" color="secondary" maxLines={1}>
              Join our community for exclusive offers and fresh flower news.
            </Text>

            <HStack spacing={4} align="center">
              <TextInput
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="md"
              />
              <Button
                label="Subscribe"
                variant="primary"
                size="lg"
                onClick={() => {
                  setSubscribed(true);
                  setEmail('');
                }}
              />
            </HStack>

            {subscribed && (
              <Text type="supporting" color="success">
                Thank you for subscribing!
              </Text>
            )}
          </Card>

          {/* ABOUT */}
          <Heading level={2} color="primary" style={{marginTop: '8px'}}>
            Our Story
          </Heading>
          <Text type="body" maxLines={3}>
            At Petal & Stem, we believe that every stem tells a story. Sourced locally from sustainable farms, our flowers are harvested at peak freshness and hand‑arranged in our studio each morning. We combine classic techniques with modern design to create bouquets that delight both the eye and the senses.
          </Text>
          <Text type="body" maxLines={3}>
            Our commitment to quality means no shortcuts — only the freshest blooms, careful craftsmanship, and a personal touch in every delivery. Join us in celebrating the beauty of nature, one bouquet at a time.
          </Text>

          {/* VISIT US */}
          <Card variant="muted" padding={6}>
            <VStack gap={4}>
              <HStack>
                <Heading level={4}>Address</Heading>
                <Text type="body">123 Blossom Lane, Portland, OR 97201</Text>
              </HStack>

              <HStack>
                <Heading level={4}>Hours</Heading>
                <Text type="body">Mon‑Fri: 9am‑6pm</Text>
              </HStack>

              <HStack>
                <Heading level={4}>Phone</Heading>
                <Text type="body">(503) 555‑1234</Text>
              </HStack>
            </VStack>

            <Link
              href="https://goo.gl/maps/XYZ"
              isExternalLink
              label="Get Directions"
            />
          </Card>

          {/* FOOTER */}
          <LayoutFooter padding={6}>
            <HStack align="center" gap={8}>
              <Heading level={1}>Petal & Stem</Heading>
              <Text type="supporting">Fresh flowers, handcrafted with love.</Text>
            </HStack>

            <Grid columns={3} gap={6}>
              <VStack>
                <Link href="/shop">Shop</Link>
              </VStack>
              <VStack>
                <Link href="/about">Company</Link>
              </VStack>
              <VStack>
                <Link href="/support">Support</Link>
              </VStack>
            </Grid>

            <Text type="small" align="end">
              © 2025 Petal & Stem. All rights reserved.
            </Text>
          </LayoutFooter>
        </LayoutContent>
      </Layout>
    </Theme>
  );
}