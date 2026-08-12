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
    { id: 1, name: 'Rose Romance', badge: 'Bestseller', badgeVariant: 'success' as const, desc: 'Classic red roses with soft eucalyptus and seasonal filler.', price: '$85', img: 'https://picsum.photos/seed/rose/800/600' },
    { id: 2, name: 'Peony Blush', badge: 'Seasonal', badgeVariant: 'warning' as const, desc: 'Cream and blush peonies with garden greens.', price: '$92', img: 'https://picsum.photos/seed/peony/800/600' },
    { id: 3, name: 'Tulip Garden', badge: 'New', badgeVariant: 'neutral' as const, desc: 'Mixed spring tulips, delicate and bright.', price: '$68', img: 'https://picsum.photos/seed/tulip/800/600' },
    { id: 4, name: 'Sunflower Field', badge: null, badgeVariant: 'neutral' as const, desc: 'Golden sunflowers with ruscus and soft greens.', price: '$75', img: 'https://picsum.photos/seed/sunflower/800/600' },
    { id: 5, name: 'Orchid Luxe', badge: 'Bestseller', badgeVariant: 'success' as const, desc: 'Phalaenopsis orchid in a ceramic vessel.', price: '$110', img: 'https://picsum.photos/seed/orchid/800/600' },
    { id: 6, name: 'Wildflower Meadow', badge: 'Seasonal', badgeVariant: 'warning' as const, desc: 'Foraged wildflowers, changes weekly.', price: '$78', img: 'https://picsum.photos/seed/wild/800/600' },
  ];

  const occasions = [
    { name: 'Birthday', desc: 'Joyful color, playful stems for celebration.', img: 'https://picsum.photos/seed/birthday/800/600', variant: 'pink' as const },
    { name: 'Anniversary', desc: 'Romantic roses and soft textures.', img: 'https://picsum.photos/seed/anniv/800/600', variant: 'purple' as const },
    { name: 'Sympathy', desc: 'Gentle whites and greens, delivered with care.', img: 'https://picsum.photos/seed/sympathy/800/600', variant: 'gray' as const },
    { name: 'Just Because', desc: 'Surprise blooms for everyday moments.', img: 'https://picsum.photos/seed/just/800/600', variant: 'teal' as const },
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout contentWidth={1200} height="auto">
        <LayoutHeader padding={2}>
          <HStack gap={3} hAlign="between" wrap>
            <Text type="label" weight="bold">Petal & Stem</Text>
            <HStack gap={3} wrap>
              <Link href="#shop">Shop</Link>
              <Link href="#occasions">Occasions</Link>
              <Link href="#about">About</Link>
              <Link href="#contact">Contact</Link>
            </HStack>
            <HStack gap={3}>
              <Button label={mode === 'light' ? 'Dark' : 'Light'} variant="ghost" size="sm" onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')} />
              <Text type="label">Cart ({cartCount})</Text>
            </HStack>
          </HStack>
        </LayoutHeader>

        <LayoutContent padding={4}>
          <VStack gap={10}>
            {/* Hero */}
            <VStack gap={6}>
              <Grid columns={{ minWidth: 320 }} gap={6}>
                <VStack gap={4} vAlign="center">
                  <Card variant="muted" padding={1}>
                    <Text type="label" color="secondary">Fresh daily · Locally grown</Text>
                  </Card>
                  <Heading level={1}>Flowers that feel like home</Heading>
                  <Text type="body">Hand-tied bouquets from our studio to your door in 24 hours. Seasonal stems, thoughtful design, zero waste.</Text>
                  <HStack gap={3} wrap>
                    <Button label="Shop the collection" variant="primary" size="md" onClick={() => {}} />
                    <Link href="#how">How it works</Link>
                  </HStack>
                </VStack>
                <Card padding={0}>
                  <AspectRatio ratio={4/3}>
                    <img src="https://picsum.photos/seed/hero/1200/900" alt="Waves crashing against rocks at sunrise" style={imageFill} />
                  </AspectRatio>
                </Card>
              </Grid>

              <Grid columns={{ minWidth: 180 }} gap={4}>
                {[
                  { icon: 'clock', label: 'Same-day delivery' },
                  { icon: 'check', label: '7-day freshness guarantee' },
                  { icon: 'success', label: 'Hand-tied by florists' },
                  { icon: 'info', label: 'Carbon-neutral shipping' },
                ].map((f) => (
                  <HStack gap={2} key={f.label}>
                    <Icon icon={f.icon as any} size="sm" label={`${f.label} icon`} />
                    <Text type="label">{f.label}</Text>
                  </HStack>
                ))}
              </Grid>
            </VStack>

            {/* Featured */}
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={2}>Featured bouquets</Heading>
                <Text type="supporting" color="secondary">Our most loved seasonal arrangements, updated weekly.</Text>
              </VStack>
              <Grid columns={{ minWidth: 280 }} gap={6}>
                {bouquets.map(b => (
                  <Card key={b.id} padding={0} variant="default">
                    <AspectRatio ratio={4/3}>
                      <img src={b.img} alt={b.name} style={imageFill} />
                    </AspectRatio>
                    <VStack padding={4} gap={2}>
                      <HStack gap={2} hAlign="center">
                        <Text type="label" weight="semibold">{b.name}</Text>
                        {b.badge && <Badge variant={b.badgeVariant} label={b.badge} />}
                      </HStack>
                      <Text type="supporting" color="secondary">{b.desc}</Text>
                      <Text type="label" weight="bold">{b.price}</Text>
                      <Button label="Add to Cart" variant="secondary" size="md" width="100%" onClick={() => setCartCount(c => c + 1)} />
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* Occasions */}
            <VStack gap={4} id="occasions">
              <Heading level={2}>Shop by occasion</Heading>
              <Grid columns={{ minWidth: 240 }} gap={6}>
                {occasions.map(o => (
                  <Card key={o.name} padding={0}>
                    <AspectRatio ratio={4/3}>
                      <img src={o.img} alt={o.name} style={imageFill} />
                    </AspectRatio>
                    <VStack padding={4} gap={1}>
                      <Text type="label" weight="semibold">{o.name}</Text>
                      <Text type="supporting" color="secondary">{o.desc}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* How it works */}
            <VStack gap={4} id="how">
              <Heading level={2}>How it works</Heading>
              <Grid columns={{ minWidth: 260 }} gap={6}>
                {[
                  { step: '1', title: 'Choose', desc: 'Pick a bouquet or build your own with seasonal stems.' },
                  { step: '2', title: 'We hand-tie', desc: 'Our florists design each arrangement fresh that morning.' },
                  { step: '3', title: 'Same-day delivery', desc: 'Local couriers deliver within hours, with care notes included.' },
                ].map(s => (
                  <Card key={s.step} variant="muted" padding={4}>
                    <Badge variant="neutral" label={s.step} />
                    <VStack gap={2} paddingBlock={2}>
                      <Text type="label" weight="semibold">{s.title}</Text>
                      <Text type="supporting" color="secondary">{s.desc}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* Testimonials */}
            <VStack gap={4}>
              <Heading level={2}>Loved by customers</Heading>
              <Grid columns={{ minWidth: 300 }} gap={6}>
                {[
                  { quote: '“Petal & Stem made my anniversary unforgettable. Arrived perfect and still blooming after a week.”', name: 'Maya R.', city: 'Portland' },
                  { quote: '“Supportive, thoughtful, and beautiful. The sympathy arrangement was exactly right.”', name: 'James K.', city: 'Seattle' },
                  { quote: '“Fast, fresh, and personal. I get a note with every delivery.”', name: 'Lena T.', city: 'Boise' },
                ].map(t => (
                  <Card key={t.name} variant="muted" padding={4}>
                    <Text type="body"> {t.quote} </Text>
                    <VStack gap={0} paddingBlock={2}>
                      <Text type="label" weight="semibold">{t.name}</Text>
                      <Text type="supporting" color="secondary">{t.city}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* Newsletter */}
            <Card variant="muted" padding={6}>
              <VStack gap={3}>
                <Heading level={3}>Stay in bloom</Heading>
                <Text type="supporting" color="secondary">Get seasonal picks, studio notes, and first access to limited stems.</Text>
                <HStack gap={3} wrap>
                  <TextInput label="Email" placeholder="you@example.com" value={email} onChange={setEmail} />
                  <Button label="Subscribe" variant="primary" size="md" onClick={() => {}} />
                </HStack>
              </VStack>
            </Card>

            {/* About */}
            <VStack gap={4} id="about">
              <Heading level={2}>About Petal & Stem</Heading>
              <Text type="body">We are a small studio rooted in Portland’s flower district. Every bouquet is hand-tied with locally grown, seasonal stems and delivered the same day. We work directly with regional growers, keep waste low, and design for longevity.</Text>
              <Text type="body">Our team of florists treats each order like a commission: thoughtful color, clean lines, and a note written by hand. From everyday joy to life’s quiet moments, we make flowers feel personal.</Text>
            </VStack>

            {/* Visit */}
            <Card variant="default" padding={6}>
              <VStack gap={4}>
                <Heading level={3}>Visit us</Heading>
                <Grid columns={{ minWidth: 200 }} gap={4}>
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

        <LayoutFooter padding={4}>
          <Divider />
          <VStack gap={6} paddingBlock={4}>
            <Grid columns={{ minWidth: 200 }} gap={6}>
              <VStack gap={2}>
                <Text type="label" weight="bold">Petal & Stem</Text>
                <Text type="supporting" color="secondary">Fresh daily, locally grown, hand-tied with care.</Text>
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
            <Text type="supporting" color="secondary">© 2026 Petal & Stem. All rights reserved.</Text>
          </VStack>
        </LayoutFooter>
      </Layout>
    </Theme>
  );
}