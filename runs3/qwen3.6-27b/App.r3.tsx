import {
  VStack,
  HStack,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutFooter,
} from '@astryxdesign/core/Layout';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Badge } from '@astryxdesign/core/Badge';
import { Divider } from '@astryxdesign/core/Divider';
import { Link } from '@astryxdesign/core/Link';
import { Icon } from '@astryxdesign/core/Icon';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { useState } from 'react';

const imageFill = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
} as const;

const bouquets = [
  {
    name: 'Midnight Rose',
    badge: 'Bestseller',
    badgeVariant: 'success' as const,
    desc: 'Deep crimson long-stem roses arranged with eucalyptus and dark foliage for a dramatic, romantic statement.',
    price: 68,
    seed: 'midnight-rose',
  },
  {
    name: 'Blush Peony',
    badge: 'Seasonal',
    badgeVariant: 'orange' as const,
    desc: 'Soft pink peonies nestled with baby\'s breath and ivy — the quintessential spring garden bouquet.',
    price: 74,
    seed: 'blush-peony',
  },
  {
    name: 'Dutch Tulip Mix',
    badge: 'New',
    badgeVariant: 'purple' as const,
    desc: 'A cheerful medley of purple, yellow, and white tulips, tightly wrapped in kraft paper.',
    price: 42,
    seed: 'dutch-tulip',
  },
  {
    name: 'Golden Hour',
    badge: undefined,
    desc: 'Bright sunflowers paired with orange dahlias and green hypericum berries for a warm, sunlit feel.',
    price: 56,
    seed: 'golden-hour',
  },
  {
    name: 'Phalaenopsis Elegance',
    badge: undefined,
    desc: 'A single stem of premium white orchid in a clear glass cube — minimalist, modern, and long-lasting.',
    price: 52,
    seed: 'phalaenopsis',
  },
  {
    name: 'Meadow Wildflower',
    badge: 'Sustainable',
    badgeVariant: 'green' as const,
    desc: 'Locally foraged asters, Queen Anne\'s lace, and lavender tied with twine for a rustic charm.',
    price: 48,
    seed: 'meadow-wildflower',
  },
];

const occasions = [
  {
    name: 'Birthday',
    desc: 'Bright, joyful arrangements that make any birthday feel celebrated.',
    variant: 'pink' as const,
    seed: 'birthday-occasion',
  },
  {
    name: 'Anniversary',
    desc: 'Timeless roses and lilies crafted for milestones and quiet evenings.',
    variant: 'purple' as const,
    seed: 'anniversary-occasion',
  },
  {
    name: 'Sympathy',
    desc: 'Gentle, respectful tributes that speak when words fall short.',
    variant: 'gray' as const,
    seed: 'sympathy-occasion',
  },
  {
    name: 'Just Because',
    desc: 'No occasion needed — a surprise bouquet is always the right idea.',
    variant: 'green' as const,
    seed: 'just-because-occasion',
  },
];

const testimonials = [
  {
    quote:
      '"I ordered the Midnight Rose for my wife\'s birthday and she literally cried. The arrangement was even more stunning than the photos — and it lasted over ten days."',
    name: 'Marcus Chen',
    role: 'Repeat customer since 2022',
  },
  {
    quote:
      '"Petal & Stem has completely changed how I think about flowers. The quality is unmatched, and knowing they source locally makes every bouquet feel like a small act of care."',
    name: 'Elena Vasquez',
    role: 'Interior designer',
  },
  {
    quote:
      '"I use them for every client event now. The florists understand scale and palette in a way that elevates the entire room. Professional, reliable, and beautiful."',
    name: 'James Whitfield',
    role: 'Event planner',
  },
];

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');

  const addToCart = () => setCartCount((c) => c + 1);

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout
        height="fill"
        contentWidth={1280}
        header={
          <LayoutHeader padding={4}>
            <VStack gap={4} width="100%">
              <HStack
                justify="between"
                vAlign="center"
                width="100%"
                wrap="wrap"
                gap={4}
              >
                <HStack gap={3} vAlign="center">
                  <Icon
                    icon="check"
                    size="sm"
                    color="success"
                    label="Petal & Stem logo"
                  />
                  <Heading level={2} type="label">
                    Petal &amp; Stem
                  </Heading>
                </HStack>
                <HStack gap={6} vAlign="center" wrap="wrap">
                  <Link href="#bouquets">Shop</Link>
                  <Link href="#occasions">Occasions</Link>
                  <Link href="#story">About</Link>
                  <Link href="#footer">Contact</Link>
                  <Button
                    label={mode === 'light' ? 'Dark' : 'Light'}
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setMode((m) => (m === 'light' ? 'dark' : 'light'))
                    }
                  />
                  <Button
                    label={`Cart (${cartCount})`}
                    variant="ghost"
                    size="sm"
                    onClick={() => {}}
                    endContent={
                      <Badge
                        variant={cartCount > 0 ? 'success' : 'neutral'}
                        label={String(cartCount)}
                      />
                    }
                  />
                </HStack>
              </HStack>
            </VStack>
          </LayoutHeader>
        }
        footer={
          <LayoutFooter padding={8}>
            <VStack gap={8} width="100%">
              <Divider variant="subtle" />
              <Heading level={3}>Visit Our Studio</Heading>
              <Grid columns={{ minWidth: 220 }} gap={6}>
                <VStack gap={2}>
                  <Text weight="semibold" type="label">
                    Address
                  </Text>
                  <Text type="body" color="secondary">
                    247 Blossom Lane
                    {'\n'}Portland, OR 97205
                  </Text>
                  <Link href="#" isExternalLink>
                    Get Directions
                  </Link>
                </VStack>
                <VStack gap={2}>
                  <Text weight="semibold" type="label">
                    Hours
                  </Text>
                  <Text type="body" color="secondary">
                    Mon – Fri: 8am – 6pm
                    {'\n'}Sat: 9am – 4pm
                    {'\n'}Sun: Closed
                  </Text>
                </VStack>
                <VStack gap={2}>
                  <Text weight="semibold" type="label">
                    Phone
                  </Text>
                  <Text type="body" color="secondary">
                    (503) 555-0172
                  </Text>
                </VStack>
              </Grid>
              <Divider variant="subtle" />
              <Grid columns={{ minWidth: 180 }} gap={6}>
                <VStack gap={2}>
                  <Heading level={4}>Petal &amp; Stem</Heading>
                  <Text type="supporting" color="secondary">
                    Hand-tied flowers, delivered with care.
                  </Text>
                </VStack>
                <VStack gap={2}>
                  <Heading level={4}>Shop</Heading>
                  <Link href="#">All Bouquets</Link>
                  <Link href="#">Seasonal</Link>
                  <Link href="#">Subscriptions</Link>
                </VStack>
                <VStack gap={2}>
                  <Heading level={4}>Company</Heading>
                  <Link href="#">Our Story</Link>
                  <Link href="#">Growers</Link>
                  <Link href="#">Careers</Link>
                </VStack>
                <VStack gap={2}>
                  <Heading level={4}>Support</Heading>
                  <Link href="#">Delivery Info</Link>
                  <Link href="#">FAQ</Link>
                  <Link href="#">Contact</Link>
                </VStack>
              </Grid>
              <Divider variant="subtle" />
              <Text type="supporting" color="secondary">
                © 2025 Petal &amp; Stem. All rights reserved.
              </Text>
            </VStack>
          </LayoutFooter>
        }
      >
        <LayoutContent padding={0}>
          <VStack gap={10} width="100%">
            {/* HERO */}
            <VStack gap={8} paddingBlock={8} paddingInline={6} width="100%">
              <Grid columns={2} gap={8}>
                <VStack gap={5} justify="center">
                  <Badge variant="success" label="Fresh daily · Locally grown" />
                  <Heading level={1} type="display-2">
                    Flowers that feel like a hug
                  </Heading>
                  <Text type="large" color="secondary">
                    Hand-tied bouquets from local growers, delivered the same
                    day you order. Every stem is chosen with intention, every
                    arrangement crafted to bring a little more warmth into your
                    world.
                  </Text>
                  <HStack gap={4} wrap="wrap">
                    <Button
                      label="Shop the collection"
                      variant="primary"
                      size="lg"
                      onClick={() => {}}
                      endContent={
                        <Icon icon="chevronRight" size="sm" label="" />
                      }
                    />
                    <Button
                      label="How it works"
                      variant="ghost"
                      size="lg"
                      onClick={() => {}}
                    />
                  </HStack>
                </VStack>
                <VStack>
                  <Card padding={0}>
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src="https://picsum.photos/seed/petal-stem-hero/800/600"
                        alt="A florist in a red coat arranging flowers in a sunlit studio"
                        style={imageFill}
                      />
                    </AspectRatio>
                  </Card>
                </VStack>
              </Grid>
            </VStack>

            {/* FEATURES BAR */}
            <VStack gap={6} paddingBlock={6} paddingInline={6} width="100%">
              <Grid columns={{ minWidth: 220 }} gap={4}>
                {[
                  {
                    icon: 'clock' as const,
                    title: 'Same-day delivery',
                    desc: 'Order by noon, delivered by evening.',
                  },
                  {
                    icon: 'check' as const,
                    title: '7-day freshness guarantee',
                    desc: 'Or we replace it, no questions.',
                  },
                  {
                    icon: 'calendar' as const,
                    title: 'Hand-tied by florists',
                    desc: 'Every stem chosen and arranged by hand.',
                  },
                  {
                    icon: 'success' as const,
                    title: 'Carbon-neutral shipping',
                    desc: 'Offset on every single delivery.',
                  },
                ].map((f) => (
                  <Card key={f.title} variant="muted" padding={4}>
                    <VStack gap={3}>
                      <Icon icon={f.icon} size="md" color="primary" label="" />
                      <Heading level={4}>{f.title}</Heading>
                      <Text type="supporting" color="secondary">
                        {f.desc}
                      </Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* FEATURED BOUQUETS */}
            <VStack gap={6} paddingBlock={6} paddingInline={6} width="100%">
              <VStack gap={2}>
                <Heading level={2}>Featured Bouquets</Heading>
                <Text type="large" color="secondary">
                  Our most loved arrangements — each one hand-tied and ready for
                  same-day delivery.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 260 }} gap={5}>
                {bouquets.map((b) => (
                  <Card key={b.name} padding={0}>
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={`https://picsum.photos/seed/${b.seed}/600/450`}
                        alt={`${b.name} bouquet`}
                        style={imageFill}
                      />
                    </AspectRatio>
                    <VStack gap={3} padding={4}>
                      <HStack justify="between" vAlign="center" wrap="wrap" gap={2}>
                        <Heading level={4}>{b.name}</Heading>
                        {b.badge && (
                          <Badge variant={b.badgeVariant} label={b.badge} />
                        )}
                      </HStack>
                      <Text type="body" color="secondary" maxLines={2}>
                        {b.desc}
                      </Text>
                      <HStack justify="between" vAlign="center">
                        <Text weight="bold" type="large">
                          ${b.price}
                        </Text>
                        <Button
                          label="Add to Cart"
                          variant="secondary"
                          size="sm"
                          onClick={addToCart}
                        />
                      </HStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* SHOP BY OCCASION */}
            <VStack gap={6} paddingBlock={6} paddingInline={6} width="100%">
              <VStack gap={2}>
                <Heading level={2}>Shop by Occasion</Heading>
                <Text type="large" color="secondary">
                  Every moment deserves the right arrangement. Find the perfect
                  bouquet for your occasion.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 240 }} gap={5}>
                {occasions.map((o) => (
                  <Card key={o.name} variant={o.variant} padding={0}>
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={`https://picsum.photos/seed/${o.seed}/600/450`}
                        alt={`${o.name} flower arrangement`}
                        style={imageFill}
                      />
                    </AspectRatio>
                    <VStack gap={2} padding={4}>
                      <Heading level={4}>{o.name}</Heading>
                      <Text type="body" color="secondary" maxLines={2}>
                        {o.desc}
                      </Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* HOW IT WORKS */}
            <VStack gap={6} paddingBlock={6} paddingInline={6} width="100%">
              <VStack gap={2}>
                <Heading level={2}>How It Works</Heading>
                <Text type="large" color="secondary">
                  From our studio to your door in three simple steps.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 260 }} gap={5}>
                {[
                  {
                    step: '01',
                    title: 'Choose your bouquet',
                    desc: 'Browse our curated collection or let our florists recommend the perfect arrangement for your occasion.',
                  },
                  {
                    step: '02',
                    title: 'We hand-tie it fresh',
                    desc: 'Our studio florists select the freshest stems from local growers and craft your bouquet the same day.',
                  },
                  {
                    step: '03',
                    title: 'Same-day delivery',
                    desc: 'Your flowers arrive wrapped in our signature paper, looking just as vibrant as the moment they were cut.',
                  },
                ].map((s) => (
                  <Card key={s.step} variant="muted" padding={5}>
                    <VStack gap={3}>
                      <Badge variant="neutral" label={s.step} />
                      <Heading level={4}>{s.title}</Heading>
                      <Text type="body" color="secondary">
                        {s.desc}
                      </Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* TESTIMONIALS */}
            <VStack gap={6} paddingBlock={6} paddingInline={6} width="100%">
              <VStack gap={2}>
                <Heading level={2}>What Our Customers Say</Heading>
                <Text type="large" color="secondary">
                  Real words from real people who\'ve experienced the Petal &amp;
                  Stem difference.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 280 }} gap={5}>
                {testimonials.map((t) => (
                  <Card key={t.name} variant="default" padding={5}>
                    <VStack gap={4}>
                      <Text type="body" color="secondary">
                        {t.quote}
                      </Text>
                      <Divider variant="subtle" />
                      <VStack gap={0.5}>
                        <Text weight="semibold" type="body">
                          {t.name}
                        </Text>
                        <Text type="supporting" color="secondary">
                          {t.role}
                        </Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* NEWSLETTER */}
            <VStack gap={6} paddingBlock={6} paddingInline={6} width="100%">
              <Card variant="muted" padding={6}>
                <VStack gap={4} width="100%">
                  <Heading level={3}>Stay in Bloom</Heading>
                  <Text type="large" color="secondary">
                    Get early access to seasonal collections, florist tips, and
                    exclusive offers — straight to your inbox, once a week.
                  </Text>
                  <HStack gap={4} wrap="wrap" width="100%">
                    <TextInput
                      label="Email address"
                      placeholder="you@example.com"
                      value={email}
                      onChange={setEmail}
                      type="email"
                    />
                    <Button
                      label="Subscribe"
                      variant="primary"
                      size="md"
                      onClick={() => setEmail('')}
                    />
                  </HStack>
                </VStack>
              </Card>
            </VStack>

            {/* OUR STORY */}
            <VStack gap={6} paddingBlock={6} paddingInline={6} width="100%">
              <VStack gap={3}>
                <Heading level={2}>Our Story</Heading>
                <Text type="large" color="secondary">
                  Petal &amp; Stem was born from a simple belief: flowers should
                  feel personal, not mass-produced. We partner with small farms
                  within a 100-mile radius of our studio, sourcing only what\'s
                  in season and at its peak. That means our bouquets change with
                  the calendar — and every arrangement tells the story of where
                  it came from.
                </Text>
                <Text type="large" color="secondary">
                  Our team of three florists brings over two decades of combined
                  experience, from wedding design to botanical illustration. We
                  hand-tie every bouquet in our sunlit studio, treating each
                  stem with the same care we\'d want for our own homes. When you
                  receive a Petal &amp; Stem arrangement, you\'re getting
                  something made by hands that know flowers intimately.
                </Text>
              </VStack>
              <Card padding={0}>
                <AspectRatio ratio={21 / 9}>
                  <img
                    src="https://picsum.photos/seed/petal-stem-studio/1200/514"
                    alt="The Petal and Stem sunlit studio with florists arranging flowers at wooden worktables"
                    style={imageFill}
                  />
                </AspectRatio>
              </Card>
            </VStack>
          </VStack>
        </LayoutContent>
      </Layout>
    </Theme>
  );
}