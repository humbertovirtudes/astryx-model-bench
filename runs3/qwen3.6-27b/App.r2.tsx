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
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {useState} from 'react';

const imageFill = { width: '100%', height: '100%', objectFit: 'cover' } as const;

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');

  const addToCart = () => setCartCount(c => c + 1);

  const products = [
    { id: 'midnight-rose', name: 'Midnight Rose', desc: 'Deep crimson long-stem roses arranged with eucalyptus and dark foliage for a dramatic, romantic statement.', price: 68, badge: 'Bestseller', badgeVariant: 'success' as const, seed: 'midnight-rose' },
    { id: 'blush-peony', name: 'Blush Peony', desc: 'Soft pink peonies nestled with baby\'s breath and ivy — the quintessential spring garden feeling.', price: 74, badge: 'Seasonal', badgeVariant: 'orange' as const, seed: 'blush-peony' },
    { id: 'dutch-tulip', name: 'Dutch Tulip Mix', desc: 'A cheerful medley of purple, yellow, and white tulips, tightly wrapped in kraft paper.', price: 42, badge: 'New', badgeVariant: 'info' as const, seed: 'dutch-tulip' },
    { id: 'golden-hour', name: 'Golden Hour', desc: 'Bright sunflowers paired with orange dahlias and green hypericum berries for pure sunshine.', price: 56, badge: undefined, badgeVariant: 'neutral' as const, seed: 'golden-hour' },
    { id: 'phalaenopsis', name: 'Phalaenopsis Elegance', desc: 'A single stem of premium white orchid in a clear glass cube — minimalist, modern, and long-lasting.', price: 52, badge: undefined, badgeVariant: 'neutral' as const, seed: 'phalaenopsis' },
    { id: 'meadow-wild', name: 'Meadow Wildflower', desc: 'Locally foraged asters, Queen Anne\'s lace, and lavender tied with twine for a rustic charm.', price: 48, badge: 'Sustainable', badgeVariant: 'success' as const, seed: 'meadow-wild' },
  ];

  const occasions = [
    { name: 'Birthday', desc: 'Bright, joyful arrangements that make any birthday feel celebrated.', variant: 'pink' as const, seed: 'birthday-occasion' },
    { name: 'Anniversary', desc: 'Timeless roses and lilies crafted for milestones and quiet evenings.', variant: 'purple' as const, seed: 'anniversary-occasion' },
    { name: 'Sympathy', desc: 'Gentle, respectful tributes that speak when words fall short.', variant: 'gray' as const, seed: 'sympathy-occasion' },
    { name: 'Just Because', desc: 'No occasion needed — a surprise bouquet is always the right idea.', variant: 'green' as const, seed: 'just-because-occasion' },
  ];

  const testimonials = [
    { quote: 'I ordered the Midnight Rose for my wife\'s birthday and she literally cried. The arrangement was even more stunning than the photos — and it lasted over ten days.', author: 'Marcus Chen', role: 'Repeat customer since 2022' },
    { quote: 'Petal & Stem has completely changed how I think about flowers. The quality is unmatched, and knowing they source locally makes every bouquet feel like a small act of care.', author: 'Elena Vasquez', role: 'Interior designer' },
    { quote: 'I use them for every client event now. The florists understand scale and palette in a way that elevates the entire room. Professional, reliable, and beautiful.', author: 'James Whitfield', role: 'Event planner' },
  ];

  const steps = [
    { num: '01', title: 'Choose your bouquet', desc: 'Browse our curated collection or let our florists recommend the perfect arrangement for your occasion.' },
    { num: '02', title: 'We hand-tie it fresh', desc: 'Our studio florists select the freshest stems from local growers and craft your bouquet the same day.' },
    { num: '03', title: 'Same-day delivery', desc: 'Your flowers arrive wrapped in our signature paper, looking just as vibrant as the moment they were cut.' },
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout
        height="fill"
        contentWidth={1200}
        header={
          <LayoutHeader padding={4}>
            <HStack justify="between" vAlign="center" wrap="wrap" gap={4}>
              <HStack gap={2} vAlign="center">
                <Icon icon="check" size="md" color="accent" label="Petal & Stem logo" />
                <Heading level={2} type="label">Petal &amp; Stem</Heading>
              </HStack>
              <HStack gap={6} vAlign="center" wrap="wrap">
                <HStack gap={5} vAlign="center">
                  <Link href="#shop">Shop</Link>
                  <Link href="#occasions">Occasions</Link>
                  <Link href="#story">About</Link>
                  <Link href="#contact">Contact</Link>
                </HStack>
                <HStack gap={3} vAlign="center">
                  <Button
                    label={mode === 'light' ? 'Dark' : 'Light'}
                    variant="ghost"
                    size="sm"
                    onClick={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
                  />
                  <Button
                    label={`Cart (${cartCount})`}
                    variant="ghost"
                    size="sm"
                    onClick={() => {}}
                    endContent={<Badge label={String(cartCount)} variant="neutral" />}
                  />
                </HStack>
              </HStack>
            </HStack>
          </LayoutHeader>
        }
        footer={
          <LayoutFooter padding={6}>
            <VStack gap={8} padding={4}>
              <Grid columns={{minWidth: 200, repeat: 'fit'}} gap={6}>
                <VStack gap={2}>
                  <Heading level={3}>Petal &amp; Stem</Heading>
                  <Text type="supporting">Hand-tied flowers, delivered with care.</Text>
                </VStack>
                <VStack gap={2}>
                  <Heading level={3}>Shop</Heading>
                  <Link href="#shop">All Bouquets</Link>
                  <Link href="#seasonal">Seasonal</Link>
                  <Link href="#subscriptions">Subscriptions</Link>
                </VStack>
                <VStack gap={2}>
                  <Heading level={3}>Company</Heading>
                  <Link href="#story">Our Story</Link>
                  <Link href="#growers">Growers</Link>
                  <Link href="#careers">Careers</Link>
                </VStack>
                <VStack gap={2}>
                  <Heading level={3}>Support</Heading>
                  <Link href="#delivery">Delivery Info</Link>
                  <Link href="#faq">FAQ</Link>
                  <Link href="#contact">Contact</Link>
                </VStack>
              </Grid>
              <Divider variant="subtle" />
              <Text type="supporting" color="secondary">© 2025 Petal &amp; Stem. All rights reserved.</Text>
            </VStack>
          </LayoutFooter>
        }
      >
        <LayoutContent padding={4}>
          <VStack gap={10}>

            {/* HERO */}
            <VStack gap={6}>
              <Grid columns={{minWidth: 320}} gap={6}>
                <VStack gap={4} gapInline={4} justify="center">
                  <Badge label="Fresh daily · Locally grown" variant="success" />
                  <Heading level={1} type="display-2">Flowers that feel like a hug</Heading>
                  <Text type="large" color="secondary" maxLines={4}>
                    Hand-tied bouquets from local growers, delivered the same day you order. Every stem is chosen with intention, every arrangement crafted to bring a little more warmth into your world.
                  </Text>
                  <HStack gap={4} wrap="wrap">
                    <Button label="Shop the collection" variant="primary" size="md" onClick={() => {}} endContent={<Icon icon="chevronRight" size="sm" />} />
                    <Button label="How it works" variant="ghost" size="md" onClick={() => {}} />
                  </HStack>
                </VStack>
                <Card padding={0}>
                  <AspectRatio ratio={4 / 3}>
                    <img src="https://picsum.photos/seed/petal-stem-hero/800/600" alt="A lush arrangement of fresh flowers being prepared in a sunlit studio" style={imageFill} />
                  </AspectRatio>
                </Card>
              </Grid>
            </VStack>

            {/* FEATURES BAR */}
            <Grid columns={{minWidth: 220, repeat: 'fill'}} gap={4}>
              {[
                { icon: 'clock' as const, title: 'Same-day delivery', desc: 'Order by noon, delivered by evening.' },
                { icon: 'check' as const, title: '7-day freshness guarantee', desc: 'Or we replace it, no questions.' },
                { icon: 'calendar' as const, title: 'Hand-tied by florists', desc: 'Every stem chosen and arranged by hand.' },
                { icon: 'success' as const, title: 'Carbon-neutral shipping', desc: 'Offset on every single delivery.' },
              ].map((f) => (
                <Card key={f.title} variant="muted" padding={4}>
                  <VStack gap={2}>
                    <Icon icon={f.icon} size="md" color="accent" label={f.title} />
                    <Heading level={4}>{f.title}</Heading>
                    <Text type="supporting" color="secondary">{f.desc}</Text>
                  </VStack>
                </Card>
              ))}
            </Grid>

            {/* FEATURED BOUQUETS */}
            <VStack gap={6}>
              <VStack gap={2}>
                <Heading level={2}>Featured Bouquets</Heading>
                <Text type="large" color="secondary">Our most loved arrangements — each one hand-tied and ready for same-day delivery.</Text>
              </VStack>
              <Grid columns={{minWidth: 260, repeat: 'fill'}} gap={4}>
                {products.map((p) => (
                  <Card key={p.id} padding={0}>
                    <AspectRatio ratio={4 / 3}>
                      <img src={`https://picsum.photos/seed/${p.seed}/600/450`} alt={`A ${p.name} bouquet featuring ${p.desc.split('—')[0]?.split(',')[0]}`} style={imageFill} />
                    </AspectRatio>
                    <VStack gap={3} padding={4}>
                      <HStack justify="between" vAlign="center" wrap="wrap" gap={2}>
                        <Heading level={4}>{p.name}</Heading>
                        {p.badge && <Badge label={p.badge} variant={p.badgeVariant} />}
                      </HStack>
                      <Text type="supporting" color="secondary" maxLines={2}>{p.desc}</Text>
                      <HStack justify="between" vAlign="center">
                        <Text type="large" weight="semibold">${p.price}</Text>
                        <Button label="Add to Cart" variant="secondary" size="sm" onClick={addToCart} />
                      </HStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* SHOP BY OCCASION */}
            <VStack gap={6}>
              <VStack gap={2}>
                <Heading level={2}>Shop by Occasion</Heading>
                <Text type="large" color="secondary">Every moment deserves the right arrangement. Find the perfect bouquet for your occasion.</Text>
              </VStack>
              <Grid columns={{minWidth: 240, repeat: 'fill'}} gap={4}>
                {occasions.map((o) => (
                  <Card key={o.name} variant={o.variant} padding={0}>
                    <AspectRatio ratio={16 / 10}>
                      <img src={`https://picsum.photos/seed/${o.seed}/600/375`} alt={`A beautiful floral arrangement perfect for ${o.name.toLowerCase()} celebrations`} style={imageFill} />
                    </AspectRatio>
                    <VStack gap={2} padding={4}>
                      <Heading level={4}>{o.name}</Heading>
                      <Text type="supporting" maxLines={2}>{o.desc}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* HOW IT WORKS */}
            <VStack gap={6}>
              <VStack gap={2}>
                <Heading level={2}>How It Works</Heading>
                <Text type="large" color="secondary">From our studio to your door in three simple steps.</Text>
              </VStack>
              <Grid columns={{minWidth: 260, repeat: 'fill'}} gap={4}>
                {steps.map((s) => (
                  <Card key={s.num} variant="muted" padding={5}>
                    <VStack gap={3}>
                      <Badge label={s.num} variant="neutral" />
                      <Heading level={3}>{s.title}</Heading>
                      <Text type="body" color="secondary">{s.desc}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* TESTIMONIALS */}
            <VStack gap={6}>
              <VStack gap={2}>
                <Heading level={2}>What Our Customers Say</Heading>
                <Text type="large" color="secondary">Real words from real people who've experienced the Petal &amp; Stem difference.</Text>
              </VStack>
              <Grid columns={{minWidth: 280, repeat: 'fill'}} gap={4}>
                {testimonials.map((t) => (
                  <Card key={t.author} padding={5}>
                    <VStack gap={4}>
                      <Text type="body" color="secondary">"{t.quote}"</Text>
                      <Divider variant="subtle" />
                      <VStack gap={0}>
                        <Text weight="semibold">{t.author}</Text>
                        <Text type="supporting" color="secondary">{t.role}</Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* NEWSLETTER */}
            <Card variant="muted" padding={6}>
              <VStack gap={4} hAlign="center" maxWidth={600}>
                <Heading level={2}>Stay in Bloom</Heading>
                <Text type="large" color="secondary" justify="center">
                  Get early access to seasonal collections, florist tips, and exclusive offers — straight to your inbox, once a week.
                </Text>
                <HStack gap={3} wrap="wrap" width="100%" maxWidth={480}>
                  <TextInput
                    label="Email address"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                    type="email"
                  />
                  <Button label="Subscribe" variant="primary" size="md" onClick={() => setEmail('')} />
                </HStack>
              </VStack>
            </Card>

            {/* OUR STORY */}
            <VStack gap={6}>
              <VStack gap={2}>
                <Heading level={2}>Our Story</Heading>
              </VStack>
              <VStack gap={4}>
                <Text type="body" color="secondary">
                  Petal &amp; Stem was born from a simple belief: flowers should feel personal, not mass-produced. We partner with small farms within a 100-mile radius of our studio, sourcing only what's in season and at its peak. That means our bouquets change with the calendar — and every arrangement tells the story of where it came from.
                </Text>
                <Text type="body" color="secondary">
                  Our team of three florists brings over two decades of combined experience, from wedding design to botanical illustration. We hand-tie every bouquet in our sunlit studio, treating each stem with the same care we'd want for our own homes. When you receive a Petal &amp; Stem arrangement, you're getting something made by hands that know flowers intimately.
                </Text>
              </VStack>
            </VStack>

            {/* VISIT US */}
            <Card variant="default" padding={6}>
              <VStack gap={4}>
                <Heading level={3}>Visit Our Studio</Heading>
                <Grid columns={{minWidth: 200, repeat: 'fit'}} gap={6}>
                  <VStack gap={2}>
                    <Text weight="semibold">Address</Text>
                    <Text type="body" color="secondary">247 Blossom Lane<br />Portland, OR 97205</Text>
                    <Link href="#directions" isExternalLink>Get Directions <Icon icon="externalLink" size="xsm" /></Link>
                  </VStack>
                  <VStack gap={2}>
                    <Text weight="semibold">Hours</Text>
                    <Text type="body" color="secondary">Mon – Fri: 8am – 6pm<br />Sat: 9am – 4pm<br />Sun: Closed</Text>
                  </VStack>
                  <VStack gap={2}>
                    <Text weight="semibold">Phone</Text>
                    <Text type="body" color="secondary">(503) 555-0172</Text>
                  </VStack>
                </Grid>
              </VStack>
            </Card>

          </VStack>
        </LayoutContent>
      </Layout>
    </Theme>
  );
}