import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { VStack, HStack, Layout, LayoutContent, LayoutHeader, LayoutFooter } from '@astryxdesign/core/Layout';
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
import { useState } from 'react';

const imageFill = { width: '100%', height: '100%', objectFit: 'cover' } as const;

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('you@example.com');

  const bouquets = [
    { id: 1, name: 'Rose Romance', badge: 'Bestseller', badgeVariant: 'success' as const, price: 85, desc: 'Classic red roses with soft eucalyptus and seasonal filler.', seed: 'rose1' },
    { id: 2, name: 'Peony Blush', badge: 'Seasonal', badgeVariant: 'orange' as const, price: 92, desc: 'Cream and blush peonies with garden greens.', seed: 'peony1' },
    { id: 3, name: 'Tulip Garden', badge: 'New', badgeVariant: 'neutral' as const, price: 68, desc: 'Mixed spring tulips, delicate and bright.', seed: 'tulip1' },
    { id: 4, name: 'Sunflower Field', badge: null, badgeVariant: 'neutral' as const, price: 75, desc: 'Golden sunflowers with ruscus and soft greens.', seed: 'sunflower1' },
    { id: 5, name: 'Orchid Luxe', badge: 'Bestseller', badgeVariant: 'success' as const, price: 110, desc: 'Phalaenopsis orchid in a ceramic vessel.', seed: 'orchid1' },
    { id: 6, name: 'Wildflower Meadow', badge: 'Seasonal', badgeVariant: 'orange' as const, price: 78, desc: 'Foraged wildflowers, changes weekly.', seed: 'wild1' },
  ];

  const occasions = [
    { name: 'Birthday', desc: 'Joyful color, playful stems for celebration.', seed: 'occ1' },
    { name: 'Anniversary', desc: 'Romantic roses and soft textures.', seed: 'occ2' },
    { name: 'Sympathy', desc: 'Gentle whites and greens, delivered with care.', seed: 'occ3' },
    { name: 'Just Because', desc: 'Surprise blooms for everyday moments.', seed: 'occ4' },
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout contentWidth={1120} height="auto"
        header={
          <LayoutHeader padding={2}>
            <HStack justify="between" wrap="wrap" hAlign="center" gap={4}>
              <Link href="#">Petal & Stem</Link>
              <HStack gap={4} wrap="wrap">
                <Link href="#">Shop</Link>
                <Link href="#">Occasions</Link>
                <Link href="#">About</Link>
                <Link href="#">Contact</Link>
              </HStack>
              <HStack gap={3} hAlign="center">
                <Button label={mode === 'light' ? 'Dark' : 'Light'} variant="ghost" size="sm" onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')} />
                <Text type="label" weight="medium">Cart ({cartCount})</Text>
              </HStack>
            </HStack>
          </LayoutHeader>
        }
        footer={
          <LayoutFooter padding={4}>
            <Divider />
            <VStack gap={6} paddingBlock={4}>
              <Grid columns={4} gap={6}>
                <VStack gap={2}>
                  <Text type="label" weight="semibold">Petal & Stem</Text>
                  <Text type="supporting">Fresh daily, locally grown, hand-tied with care.</Text>
                </VStack>
                <VStack gap={2}>
                  <Text type="label" weight="semibold">Shop</Text>
                  <Link href="#">Bouquets</Link>
                  <Link href="#">Occasions</Link>
                  <Link href="#">Plants</Link>
                </VStack>
                <VStack gap={2}>
                  <Text type="label" weight="semibold">Company</Text>
                  <Link href="#">About</Link>
                  <Link href="#">Studio</Link>
                  <Link href="#">Careers</Link>
                </VStack>
                <VStack gap={2}>
                  <Text type="label" weight="semibold">Support</Text>
                  <Link href="#">Contact</Link>
                  <Link href="#">Shipping</Link>
                  <Link href="#">Returns</Link>
                </VStack>
              </Grid>
              <Text type="supporting">© 2026 Petal & Stem. All rights reserved.</Text>
            </VStack>
          </LayoutFooter>
        }
      >
        <LayoutContent padding={4}>
          <VStack gap={10}>
            <Grid columns={{ minWidth: 360 }} gap={6}>
              <VStack gap={3} justify="center">
                <Badge variant="neutral" label="Fresh daily · Locally grown" />
                <Heading level={1} type="display-1">Flowers that feel like home</Heading>
                <Text type="large">Hand-tied bouquets from our studio to your door in 24 hours. Seasonal stems, thoughtful design, zero waste.</Text>
                <HStack gap={3} wrap="wrap">
                  <Button label="Shop the collection" variant="primary" onClick={() => {}} />
                  <Link href="#">How it works</Link>
                </HStack>
              </VStack>
              <Card padding={0}>
                <AspectRatio ratio={4/3}>
                  <img src="https://picsum.photos/seed/hero1/800/600" alt="Eiffel Tower view with Parisian buildings and bare trees" style={imageFill} />
                </AspectRatio>
              </Card>
            </Grid>

            <Grid columns={{ minWidth: 220 }} gap={4} align="center">
              <HStack gap={2} hAlign="center">
                <Icon icon="clock" size="sm" label="clock" />
                <Text type="label">Same-day delivery</Text>
              </HStack>
              <HStack gap={2} hAlign="center">
                <Icon icon="check" size="sm" label="check" />
                <Text type="label">7-day freshness guarantee</Text>
              </HStack>
              <HStack gap={2} hAlign="center">
                <Icon icon="check" size="sm" label="check" />
                <Text type="label">Hand-tied by florists</Text>
              </HStack>
              <HStack gap={2} hAlign="center">
                <Icon icon="info" size="sm" label="info" />
                <Text type="label">Carbon-neutral shipping</Text>
              </HStack>
            </Grid>

            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={2}>Featured bouquets</Heading>
                <Text type="supporting">Our most loved seasonal arrangements, updated weekly.</Text>
              </VStack>
              <Grid columns={{ minWidth: 280 }} gap={4}>
                {bouquets.map(b => (
                  <Card key={b.id} padding={0}>
                    <VStack gap={0}>
                      <AspectRatio ratio={4/3}>
                        <img src={`https://picsum.photos/seed/${b.seed}/600/450`} alt={`${b.name} bouquet`} style={imageFill} />
                      </AspectRatio>
                      <VStack padding={3} gap={2}>
                        <HStack justify="center" gap={2} wrap="wrap">
                          <Text type="label" weight="semibold">{b.name}</Text>
                          {b.badge && <Badge variant={b.badgeVariant} label={b.badge} />}
                        </HStack>
                        <Text type="supporting" justify="center">{b.desc}</Text>
                        <Text type="label" weight="semibold">${b.price}</Text>
                        <Button label="Add to Cart" variant="secondary" onClick={() => setCartCount(c => c + 1)} />
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <VStack gap={4}>
              <Heading level={2}>Shop by occasion</Heading>
              <Grid columns={{ minWidth: 240 }} gap={4}>
                {occasions.map(o => (
                  <Card key={o.name} padding={0}>
                    <VStack gap={0}>
                      <AspectRatio ratio={4/3}>
                        <img src={`https://picsum.photos/seed/${o.seed}/600/450`} alt={`${o.name} occasion flowers`} style={imageFill} />
                      </AspectRatio>
                      <VStack padding={3} gap={1}>
                        <Text type="label" weight="semibold">{o.name}</Text>
                        <Text type="supporting">{o.desc}</Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <VStack gap={4}>
              <Heading level={2}>How it works</Heading>
              <Grid columns={{ minWidth: 240 }} gap={4}>
                {[
                  { n: '1', t: 'Choose', d: 'Pick a bouquet or build your own with seasonal stems.' },
                  { n: '2', t: 'We hand-tie', d: 'Our florists design each arrangement fresh that morning.' },
                  { n: '3', t: 'Same-day delivery', d: 'Local couriers deliver within hours, with care notes included.' },
                ].map(s => (
                  <Card key={s.n} variant="muted" padding={4}>
                    <VStack gap={2}>
                      <Badge variant="neutral" label={s.n} />
                      <Text type="label" weight="semibold">{s.t}</Text>
                      <Text type="supporting">{s.d}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <VStack gap={4}>
              <Heading level={2}>Loved by customers</Heading>
              <Grid columns={{ minWidth: 280 }} gap={4}>
                {[
                  { q: 'Petal & Stem made my anniversary unforgettable. Arrived perfect and still blooming after a week.', a: 'Maya R.', l: 'Portland' },
                  { q: 'Supportive, thoughtful, and beautiful. The sympathy arrangement was exactly right.', a: 'James K.', l: 'Seattle' },
                  { q: 'Fast, fresh, and personal. I get a note with every delivery.', a: 'Lena T.', l: 'Boise' },
                ].map((t, i) => (
                  <Card key={i} variant="muted" padding={4}>
                    <VStack gap={2}>
                      <Text type="body">“{t.q}”</Text>
                      <VStack gap={0}>
                        <Text type="label" weight="semibold">{t.a}</Text>
                        <Text type="supporting">{t.l}</Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <Card variant="muted" padding={5}>
              <VStack gap={3}>
                <Heading level={3}>Stay in bloom</Heading>
                <Text type="supporting">Get seasonal picks, studio notes, and first access to limited stems.</Text>
                <HStack gap={3} wrap="wrap">
                  <VStack gap={1} style={{ minWidth: 220 }}>
                    <Text type="label">Email</Text>
                    <TextInput value={email} onChange={setEmail} placeholder="you@example.com" />
                  </VStack>
                  <Button label="Subscribe" variant="primary" onClick={() => {}} />
                </HStack>
              </VStack>
            </Card>

            <VStack gap={4}>
              <Heading level={2}>About Petal & Stem</Heading>
              <Text type="body">We are a small studio rooted in Portland’s flower district. Every bouquet is hand-tied with locally grown, seasonal stems and delivered the same day. We work directly with regional growers, keep waste low, and design for longevity.</Text>
              <Text type="body">Our team of florists treats each order like a commission: thoughtful color, clean lines, and a note written by hand. From everyday joy to life’s quiet moments, we make flowers feel personal.</Text>
            </VStack>

            <Card variant="default" padding={5}>
              <VStack gap={4}>
                <Heading level={3}>Visit us</Heading>
                <Grid columns={{ minWidth: 220 }} gap={6}>
                  <VStack gap={1}>
                    <Text type="label" weight="semibold">Address</Text>
                    <Text type="body">1247 Bloom St, Portland, OR 97205</Text>
                  </VStack>
                  <VStack gap={1}>
                    <Text type="label" weight="semibold">Hours</Text>
                    <Text type="body">Tue–Sat 9am–6pm</Text>
                    <Text type="body">Sun 10am–4pm</Text>
                  </VStack>
                  <VStack gap={1}>
                    <Text type="label" weight="semibold">Phone</Text>
                    <Text type="body">(503) 555-0147</Text>
                  </VStack>
                </Grid>
                <Link href="#" isExternalLink>Get Directions</Link>
              </VStack>
            </Card>
          </VStack>
        </LayoutContent>
      </Layout>
    </Theme>
  );
}