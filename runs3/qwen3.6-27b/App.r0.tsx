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

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');

  const addToCart = () => setCartCount((c) => c + 1);

  const bouquetData = [
    {
      name: 'Midnight Rose',
      desc: 'Deep crimson long-stem roses arranged with eucalyptus and dark foliage for a dramatic, romantic statement.',
      price: '$68',
      badge: 'success',
      badgeLabel: 'Bestseller',
      seed: 'petal-rose',
    },
    {
      name: 'Blush Peony',
      desc: 'Soft pink peonies nestled with baby\'s breath and ivy — the quintessential spring garden bouquet.',
      price: '$74',
      badge: 'warning',
      badgeLabel: 'Seasonal',
      seed: 'petal-peony',
    },
    {
      name: 'Dutch Tulip Mix',
      desc: 'A cheerful medley of purple, yellow, and white tulips, tightly wrapped in kraft paper with a satin ribbon.',
      price: '$42',
      badge: 'info',
      badgeLabel: 'New',
      seed: 'petal-tulip',
    },
    {
      name: 'Golden Hour',
      desc: 'Bright sunflowers paired with orange dahlias and green hypericum berries for pure summer warmth.',
      price: '$56',
      badge: undefined,
      badgeLabel: '',
      seed: 'petal-sunflower',
    },
    {
      name: 'Phalaenopsis Elegance',
      desc: 'A single stem of premium white orchid in a clear glass cube — minimalist, modern, and long-lasting.',
      price: '$52',
      badge: undefined,
      badgeLabel: '',
      seed: 'petal-orchid',
    },
    {
      name: 'Meadow Wildflower',
      desc: 'Locally foraged asters, Queen Anne\'s lace, and lavender tied with twine for a rustic, free-spirited feel.',
      price: '$48',
      badge: 'success',
      badgeLabel: 'Bestseller',
      seed: 'petal-wildflower',
    },
  ];

  const occasionData = [
    {
      name: 'Birthday',
      desc: 'Bright, joyful arrangements that make any birthday feel celebrated.',
      seed: 'petal-birthday',
      variant: 'pink' as const,
    },
    {
      name: 'Anniversary',
      desc: 'Timeless roses and lilies crafted for milestones and quiet evenings.',
      seed: 'petal-anniversary',
      variant: 'purple' as const,
    },
    {
      name: 'Sympathy',
      desc: 'Gentle, respectful tributes that speak when words fall short.',
      seed: 'petal-sympathy',
      variant: 'gray' as const,
    },
    {
      name: 'Just Because',
      desc: 'No occasion needed — a surprise bouquet is always the right idea.',
      seed: 'petal-justbecause',
      variant: 'green' as const,
    },
  ];

  const trustItems = [
    {
      icon: 'clock' as const,
      label: 'Same-day delivery',
      desc: 'Order by noon, delivered by evening.',
    },
    {
      icon: 'check' as const,
      label: '7-day freshness guarantee',
      desc: 'Or we replace it, no questions.',
    },
    {
      icon: 'calendar' as const,
      label: 'Hand-tied by florists',
      desc: 'Every stem chosen and arranged by hand.',
    },
    {
      icon: 'success' as const,
      label: 'Carbon-neutral shipping',
      desc: 'Offset on every single delivery.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Choose your bouquet',
      desc: 'Browse our curated collection or let our florists recommend the perfect arrangement for your occasion.',
    },
    {
      number: '02',
      title: 'We hand-tie it fresh',
      desc: 'Our studio florists select the freshest stems from local growers and craft your bouquet the same day.',
    },
    {
      number: '03',
      title: 'Same-day delivery',
      desc: 'Your flowers arrive wrapped in our signature paper, looking just as vibrant as the moment they were cut.',
    },
  ];

  const testimonials = [
    {
      quote:
        'I ordered the Midnight Rose for my wife\'s birthday and she literally cried. The arrangement was even more stunning than the photos — and it lasted over ten days.',
      name: 'Marcus Chen',
      role: 'Repeat customer since 2022',
    },
    {
      quote:
        'Petal & Stem has completely changed how I think about flowers. The quality is unmatched, and knowing they source locally makes every bouquet feel like a small act of care.',
      name: 'Elena Vasquez',
      role: 'Interior designer',
    },
    {
      quote:
        'I use them for every client event now. The florists understand scale and palette in a way that elevates the entire room. Professional, reliable, and beautiful.',
      name: 'James Whitfield',
      role: 'Event planner',
    },
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout height="fill" contentWidth={1200}>
        {/* HEADER */}
        <LayoutHeader padding={4}>
          <HStack
            gap={4}
            hAlign="stretch"
            justify="between"
            wrap="wrap"
          >
            <Heading level={1} type="display-3">
              Petal &amp; Stem
            </Heading>
            <HStack gap={1} wrap="wrap">
              <Button label="Shop" variant="ghost" size="sm" />
              <Button label="Occasions" variant="ghost" size="sm" />
              <Button label="About" variant="ghost" size="sm" />
              <Button label="Contact" variant="ghost" size="sm" />
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
              />
            </HStack>
          </HStack>
        </LayoutHeader>

        {/* MAIN CONTENT */}
        <LayoutContent padding={6}>
          <VStack gap={10}>
            {/* 1. HERO */}
            <Grid columns={{ minWidth: 340 }} gap={8}>
              <VStack gap={4}>
                <Badge label="Fresh daily · Locally grown" variant="green" />
                <Heading level={2} type="display-1">
                  Flowers that feel like a hug
                </Heading>
                <Text type="large" color="secondary">
                  Hand-tied bouquets from local growers, delivered the same day
                  you order. Every stem is chosen with intention, every
                  arrangement crafted to bring a little more warmth into your
                  world.
                </Text>
                <HStack gap={3}>
                  <Button
                    label="Shop the collection"
                    variant="primary"
                    endContent={
                      <Icon icon="chevronRight" size="sm" label="Go to collection" />
                    }
                    onClick={() => {}}
                  />
                  <Button
                    label="How it works"
                    variant="ghost"
                    onClick={() => {}}
                  />
                </HStack>
              </VStack>
              <Card padding={0}>
                <AspectRatio ratio={4 / 3}>
                  <img
                    src="https://picsum.photos/seed/petal-hero/800/600"
                    alt="A lush arrangement of seasonal flowers in soft pastel tones, photographed in natural light"
                    style={imageFill}
                  />
                </AspectRatio>
              </Card>
            </Grid>

            {/* 2. TRUST STRIP */}
            <Divider variant="subtle" />
            <Grid columns={4} gap={4}>
              {trustItems.map((item) => (
                <Card key={item.label} variant="muted" padding={4}>
                  <VStack gap={2}>
                    <Icon
                      icon={item.icon}
                      size="lg"
                      color="accent"
                      label={item.label}
                    />
                    <Heading level={4}>{item.label}</Heading>
                    <Text type="supporting" color="secondary">
                      {item.desc}
                    </Text>
                  </VStack>
                </Card>
              ))}
            </Grid>

            {/* 3. FEATURED BOUQUETS */}
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={2}>Featured Bouquets</Heading>
                <Text type="large" color="secondary">
                  Our most loved arrangements — each one hand-tied and ready
                  for same-day delivery.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 300 }} gap={6}>
                {bouquetData.map((b) => (
                  <Card key={b.name} padding={4}>
                    <VStack gap={3}>
                      <Card padding={0}>
                        <AspectRatio ratio={1}>
                          <img
                            src={`https://picsum.photos/seed/${b.seed}/600/600`}
                            alt={`A hand-tied ${b.name.toLowerCase()} bouquet with fresh seasonal flowers`}
                            style={imageFill}
                          />
                        </AspectRatio>
                      </Card>
                      <HStack gap={2} justify="between" wrap="wrap">
                        <Heading level={3}>{b.name}</Heading>
                        {b.badge && (
                          <Badge label={b.badgeLabel} variant={b.badge} />
                        )}
                      </HStack>
                      <Text type="body" color="secondary" maxLines={2}>
                        {b.desc}
                      </Text>
                      <HStack gap={3} justify="between">
                        <Text weight="bold">{b.price}</Text>
                        <Button
                          label="Add to Cart"
                          variant="primary"
                          size="sm"
                          onClick={addToCart}
                        />
                      </HStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* 4. OCCASIONS */}
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={2}>Shop by Occasion</Heading>
                <Text type="large" color="secondary">
                  Every moment deserves the right arrangement. Find the perfect
                  bouquet for your occasion.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 260 }} gap={6}>
                {occasionData.map((o) => (
                  <Card key={o.name} variant={o.variant} padding={0}>
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={`https://picsum.photos/seed/${o.seed}/600/450`}
                        alt={`Flower arrangement styled for a ${o.name.toLowerCase()} occasion`}
                        style={imageFill}
                      />
                    </AspectRatio>
                    <VStack gap={1} padding={4}>
                      <Heading level={3}>{o.name}</Heading>
                      <Text type="body" color="secondary">
                        {o.desc}
                      </Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* 5. HOW IT WORKS */}
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={2}>How It Works</Heading>
                <Text type="large" color="secondary">
                  From our studio to your door in three simple steps.
                </Text>
              </VStack>
              <Grid columns={3} gap={6}>
                {steps.map((s) => (
                  <Card key={s.number} variant="muted" padding={5}>
                    <VStack gap={3}>
                      <Text type="code" color="accent" weight="bold">
                        {s.number}
                      </Text>
                      <Heading level={3}>{s.title}</Heading>
                      <Text type="body" color="secondary">
                        {s.desc}
                      </Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* 6. TESTIMONIALS */}
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={2}>What Our Customers Say</Heading>
                <Text type="large" color="secondary">
                  Real words from real people who've experienced the Petal &amp;
                  Stem difference.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 300 }} gap={6}>
                {testimonials.map((t) => (
                  <Card key={t.name} variant="transparent" padding={5}>
                    <VStack gap={3}>
                      <Text type="large" color="secondary">
                        &ldquo;{t.quote}&rdquo;
                      </Text>
                      <Divider variant="subtle" />
                      <VStack gap={0}>
                        <Heading level={4}>{t.name}</Heading>
                        <Text type="supporting" color="secondary">
                          {t.role}
                        </Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* 7. NEWSLETTER */}
            <Card variant="muted" padding={8}>
              <VStack gap={4} hAlign="center">
                <Heading level={2}>Stay in Bloom</Heading>
                <Text type="large" color="secondary" justify="center">
                  Get early access to seasonal collections, florist tips, and
                  exclusive offers — straight to your inbox, once a week.
                </Text>
                <HStack gap={3} wrap="wrap" hAlign="stretch">
                  <TextInput
                    label="Email address"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={setEmail}
                  />
                  <Button
                    label="Subscribe"
                    variant="primary"
                    onClick={() => setEmail('')}
                  />
                </HStack>
              </VStack>
            </Card>

            {/* 8. ABOUT */}
            <VStack gap={4}>
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
                hand-tie every bouquet in our sunlit studio, treating each stem
                with the same care we\'d want for our own homes. When you
                receive a Petal &amp; Stem arrangement, you\'re getting
                something made by hands that know flowers intimately.
              </Text>
            </VStack>

            {/* 9. VISIT US */}
            <Card variant="default" padding={6}>
              <VStack gap={5}>
                <Heading level={2}>Visit Our Studio</Heading>
                <Grid columns={3} gap={6}>
                  <VStack gap={1}>
                    <Heading level={4}>Address</Heading>
                    <Text type="body" color="secondary">
                      247 Blossom Lane
                      <br />
                      Portland, OR 97205
                    </Text>
                  </VStack>
                  <VStack gap={1}>
                    <Heading level={4}>Hours</Heading>
                    <Text type="body" color="secondary">
                      Mon – Fri: 8am – 6pm
                      <br />
                      Sat: 9am – 4pm
                      <br />
                      Sun: Closed
                    </Text>
                  </VStack>
                  <VStack gap={1}>
                    <Heading level={4}>Phone</Heading>
                    <Text type="body" color="secondary">
                      (503) 555-0172
                    </Text>
                  </VStack>
                </Grid>
                <Link
                  href="https://maps.google.com"
                  isExternalLink
                  isStandalone
                >
                  Get Directions
                </Link>
              </VStack>
            </Card>
          </VStack>
        </LayoutContent>

        {/* FOOTER */}
        <LayoutFooter padding={6}>
          <VStack gap={6}>
            <HStack gap={8} justify="between" wrap="wrap">
              <VStack gap={1}>
                <Heading level={3}>Petal &amp; Stem</Heading>
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
            </HStack>
            <Divider variant="subtle" />
            <Text type="supporting" color="secondary">
              &copy; {new Date().getFullYear()} Petal &amp; Stem. All rights
              reserved.
            </Text>
          </VStack>
        </LayoutFooter>
      </Layout>
    </Theme>
  );
}