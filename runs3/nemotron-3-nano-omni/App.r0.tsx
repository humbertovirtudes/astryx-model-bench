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

import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const imageFill = { width: '100%', height: '100%', objectFit: 'cover' } as const;

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout height="fill" contentWidth={1200}>
        {/* Header */}
        <LayoutHeader padding={4}>
          <HStack align="center" spacing={6}>
            {/* Brand */}
            <Heading level={1}>Petal & Stem</Heading>

            {/* Navigation links */}
            <HStack gap={6} align="center">
              <Button label="Shop" variant="ghost" size="md" />
              <Button label="Occasions" variant="ghost" size="md" />
              <Button label="About" variant="ghost" size="md" />
              <Button label="Contact" variant="ghost" size="md" />
            </HStack>

            {/* Theme toggle */}
            <Button
              label={mode === 'light' ? 'Dark' : 'Light'}
              variant="ghost"
              size="sm"
              onClick={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
            />

            {/* Cart button */}
            <Button
              label={`Cart (${cartCount})`}
              variant="ghost"
              size="md"
            />
          </HStack>
        </LayoutHeader>

        {/* Main Content */}
        <LayoutContent padding={6}>
          
          {/* HERO */}
          <Grid columns={{minWidth: 340}}>
            {/* Left Column */}
            <VStack gap={2} align="start">
              <Badge variant="neutral" label="Fresh daily · Locally grown" />
              <Heading level={2} type="display-1" color="primary">
                Blooming Beautifully
              </Heading>
              <Text type="large" color="secondary">
                At Petal & Stem, we hand‑pick the freshest, locally grown blossoms each morning to create arrangements that bring joy and elegance to every occasion.
              </Text>
              <Button
                label="Shop the collection"
                variant="primary"
                size="md"
                endContent={<Icon icon="chevronRight" size="sm" color="primary" />}
              />
              <Button
                label="How it works"
                variant="ghost"
                size="md"
              />
            </VStack>

            {/* Right Column – Hero Image */}
            <Card padding={0}>
              <AspectRatio ratio={4/3}>
                <img src="https://picsum.photos/seed/petal-hero/800/600" alt="Elegant bouquet arrangement" style={imageFill} />
              </AspectRatio>
            </Card>
          </Grid>

          {/* TRUST STRIP */}
          <HStack gap={6} align="center" spacing={6}>
            <VStack gap={1} align="center">
              <Icon icon="check" size="md" color="success" label="Same‑day delivery" />
              <Text type="label">Same‑day delivery</Text>
            </VStack>
            <VStack gap={1} align="center">
              <Icon icon="info" size="md" color="secondary" label="7‑day freshness guarantee" />
              <Text type="label">7‑day freshness guarantee</Text>
            </VStack>
            <VStack gap={1} align="center">
              <Icon icon="check" size="md" color="success" label="Hand‑tied by florists" />
              <Text type="label">Hand‑tied by florists</Text>
            </VStack>
            <VStack gap={1} align="center">
              <Icon icon="warning" size="md" color="warning" label="Carbon‑neutral shipping" />
              <Text type="label">Carbon‑neutral shipping</Text>
            </VStack>
          </HStack>

          {/* FEATURED BOUQUETS */}
          <Heading level={2}>Featured Bouquets</Heading>
          <Text type="large" color="secondary">
            Hand‑picked arrangements crafted with seasonal blooms.
          </Text>

          <Grid columns={{minWidth: 300}} gap={6}>
            {/* Rose */}
            <Card variant="default" padding={4}>
              <Card padding={0}>
                <AspectRatio ratio={1}>
                  <img src="https://picsum.photos/seed/rose/400/400" alt="Red rose bouquet" style={imageFill} />
                </AspectRatio>
              </Card>
              <Heading level={3}>Rose Bouquet</Heading>
              <Text type="body" maxLines={2} color="secondary">
                Fresh, velvety roses sourced from nearby farms, arranged with care.
              </Text>
              <Badge variant="success" label="Bestseller" />
              <Text weight="bold">$79</Text>
              <Button
                label="Add"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Peony */}
            <Card variant="default" padding={4}>
              <Card padding={0}>
                <AspectRatio ratio={1}>
                  <img src="https://picsum.photos/seed/peony/400/400" alt="Pink peony arrangement" style={imageFill} />
                </AspectRatio>
              </Card>
              <Heading level={3}>Peony Arrangement</Heading>
              <Text type="body" maxLines={2} color="secondary">
                Soft pink peonies blended with garden greens for a romantic touch.
              </Text>
              <Badge variant="warning" label="Seasonal" />
              <Text weight="bold">$89</Text>
              <Button
                label="Add"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Tulip */}
            <Card variant="default" padding={4}>
              <Card padding={0}>
                <AspectRatio ratio={1}>
                  <img src="https://picsum.photos/seed/tulip/400/400" alt="Tulip mix bouquet" style={imageFill} />
                </AspectRatio>
              </Card>
              <Heading level={3}>Tulip Mix</Heading>
              <Text type="body" maxLines={2} color="secondary">
                Bright tulips in a variety of colors, perfect for spring celebrations.
              </Text>
              <Badge variant="info" label="New" />
              <Text weight="bold">$69</Text>
              <Button
                label="Add"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Sunflower */}
            <Card variant="default" padding={4}>
              <Card padding={0}>
                <AspectRatio ratio={1}>
                  <img src="https://picsum.photos/seed/sunflower/400/400" alt="Sunflower bouquet" style={imageFill} />
                </AspectRatio>
              </Card>
              <Heading level={3}>Sunflower Delight</Heading>
              <Text type="body" maxLines={2} color="secondary">
                Cheerful sunflowers paired with wild grasses for a sunny vibe.
              </Text>
              <Badge variant="warning" label="Seasonal" />
              <Text weight="bold">$74</Text>
              <Button
                label="Add"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Orchid */}
            <Card variant="default" padding={4}>
              <Card padding={0}>
                <AspectRatio ratio={1}>
                  <img src="https://picsum.photos/seed/orchid/400/400" alt="Orchid arrangement" style={imageFill} />
                </AspectRatio>
              </Card>
              <Heading level={3}>Orchid Elegance</Heading>
              <Text type="body" maxLines={2} color="secondary">
                Exotic orchids in a sleek, modern design for sophisticated settings.
              </Text>
              <Badge variant="info" label="New" />
              <Text weight="bold">$119</Text>
              <Button
                label="Add"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Wildflower */}
            <Card variant="default" padding={4}>
              <Card padding={0}>
                <AspectRatio ratio={1}>
                  <img src="https://picsum.photos/seed/wildflower/400/400" alt="Wildflower bouquet" style={imageFill} />
                </AspectRatio>
              </Card>
              <Heading level={3}>Wildflower Bunch</Heading>
              <Text type="body" maxLines={2} color="secondary">
                A rustic mix of native wildflowers for a natural, effortless look.
              </Text>
              <Text weight="bold">$59</Text>
              <Button
                label="Add"
                variant="primary"
                size="sm"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>
          </Grid>

          {/* OCCASIONS */}
          <Heading level={2}>Occasions</Heading>
          <Grid columns={4} gap={6}>
            <Card variant="red" padding={4} onClick={() => console.log('Birthday selected')}>
              <Heading level={3}>Birthday</Heading>
              <Text type="body">Bright and joyful arrangements for every celebration.</Text>
            </Card>

            <Card variant="pink" padding={4} onClick={() => console.log('Anniversary selected')}>
              <Heading level={3}>Anniversary</Heading>
              <Text type="body">Romantic bouquets for every love story.</Text>
            </Card>

            <Card variant="gray" padding={4} onClick={() => console.log('Sympathy selected')}>
              <Heading level={3}>Sympathy</Heading>
              <Text type="body">Elegant and comforting gestures during difficult times.</Text>
            </Card>

            <Card variant="yellow" padding={4} onClick={() => console.log('Just Because selected')}>
              <Heading level={3}>Just Because</Heading>
              <Text type="body">Surprise someone special today with a spontaneous bouquet.</Text>
            </Card>
          </Grid>

          {/* HOW IT WORKS */}
          <Heading level={2}>How It Works</Heading>
          <Grid columns={3} gap={6}>
            <VStack gap={2} align="center">
              <Icon icon="search" size="md" color="primary" label="Choose" />
              <Heading level={4}>Choose</Heading>
              <Text type="body">Pick the perfect blooms from our seasonal collection.</Text>
            </VStack>

            <VStack gap={2} align="center">
              <Icon icon="check" size="md" color="success" label="Hand‑tie" />
              <Heading level={4}>We Hand‑Tie</Heading>
              <Text type="body">Our skilled florists craft each bouquet with meticulous care.</Text>
            </VStack>

            <VStack gap={2} align="center">
              <Icon icon="calendar" size="md" color="primary" label="Same‑day delivery" />
              <Heading level={4}>Fast Delivery</Heading>
              <Text type="body">Enjoy same‑day delivery to your doorstep.</Text>
            </VStack>
          </Grid>

          {/* TESTIMONIALS */}
          <Heading level={2}>What Our Clients Say</Heading>
          <Grid columns={2} gap={6}>
            <Card variant="muted" padding={4}>
              <Text type="supporting">
                "The freshness of these flowers is unmatched – they arrived looking like they were just cut from the garden."
              </Text>
              <Heading level={4}>Emma L.</Heading>
              <Text type="label">Customer</Text>
            </Card>

            <Card variant="muted" padding={4}>
              <Text type="supporting">
                "Petal & Stem transformed our event with stunning arrangements that wowed every guest."
              </Text>
              <Heading level={4}>James K.</Heading>
              <Text type="label">Client</Text>
            </Card>

            <Card variant="muted" padding={4}>
              <Text type="supporting">
                "Every stem feels fresh, and the care put into each arrangement shines through."
              </Text>
              <Heading level={4}>Sophie M.</Heading>
              <Text type="label">Client</Text>
            </Card>
          </Grid>

          {/* NEWSLETTER */}
          <Card variant="muted" padding={6}>
            <Heading level={3}>Stay Fresh with Petal & Stem</Heading>
            <Text type="body">
              Join our newsletter for exclusive offers, new arrivals, and floral tips.
            </Text>
            <TextInput
              label="Email address"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="md"
            />
            <Button
              variant="primary"
              size="md"
              isDisabled={subscribed}
              onClick={() => setSubscribed(true)}
              label={subscribed ? 'Subscribed!' : 'Subscribe'}
            />
          </Card>

          {/* ABOUT */}
          <Heading level={2}>About Petal & Stem</Heading>
          <Text type="body">
            At Petal & Stem, we believe that beauty begins with the earth. Every stem is sourced locally from sustainable farms, ensuring freshness from bud to bloom. Our artisans hand‑tie each arrangement, selecting only the finest flowers to create bespoke designs that reflect your style and sentiment.
          </Text>
          <Text type="body">
            We are committed to transparency, ethical practices, and a love for the art of floral design. From small home bouquets to grand event installations, our studio brings a personal touch to every piece we craft.
          </Text>

          {/* VISIT US */}
          <Card variant="default" padding={6}>
            <Heading level={4}>123 Blossom Lane</Heading>
            <Text>Anytown, State 12345</Text>

            <Heading level={4}>Mon–Fri 9am–6pm</Heading>
            <Text>Sat–Sun 10am–4pm</Text>

            <Heading level={4}>(555) 123‑4567</Heading>
            <Text>Call us anytime</Text>

            <Link href="https://goo.gl/maps" isExternalLink isStandalone>
              Get Directions
            </Link>
          </Card>

          {/* FOOTER */}
          <LayoutFooter padding={4}>
            <HStack gap={6} align="start">
              <Heading level={2}>Petal & Stem</Heading>
              <Text type="supporting">Fresh flowers, hand‑tied with love.</Text>
            </HStack>

            <Grid columns={3} gap={6}>
              <VStack spacing={2}>
                <Link href="/shop">Shop</Link>
                <Link href="/company">Company</Link>
              </VStack>

              <VStack spacing={2}>
                <Link href="/about">About</Link>
                <Link href="/blog">Blog</Link>
              </VStack>

              <VStack spacing={2}>
                <Link href="/contact">Contact</Link>
                <Link href="/faq">FAQ</Link>
              </VStack>
            </Grid>

            <Text type="supporting" align="center">
              © 2025 Petal & Stem. All rights reserved.
            </Text>
          </LayoutFooter>
        </LayoutContent>
      </Layout>
    </Theme>
  );
}