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

  const bouquets = [
    { name: 'Midnight Rose', price: '$68', badge: 'Bestseller', badgeVariant: 'success' as const, desc: 'Deep crimson long-stem roses arranged with eucalyptus and dark foliage for a dramatic, romantic statement.', seed: 'midnight-rose', w: 600, h: 450 },
    { name: 'Blush Peony', price: '$74', badge: 'Seasonal', badgeVariant: 'orange' as const, desc: 'Soft pink peonies nestled with baby\'s breath and ivy — the quintessential spring garden bouquet.', seed: 'blush-peony', w: 600, h: 450 },
    { name: 'Dutch Tulip Mix', price: '$42', badge: 'New', badgeVariant: 'neutral' as const, desc: 'A cheerful medley of purple, yellow, and white tulips, tightly wrapped in kraft paper with a satin ribbon.', seed: 'dutch-tulips', w: 600, h: 450 },
    { name: 'Golden Hour', price: '$56', badge: undefined, badgeVariant: 'neutral' as const, desc: 'Bright sunflowers paired with orange dahlias and green hypericum berries for pure summer warmth.', seed: 'golden-hour', w: 600, h: 450 },
    { name: 'Phalaenopsis Elegance', price: '$52', badge: undefined, badgeVariant: 'neutral' as const, desc: 'A single stem of premium white orchid in a clear glass cube — minimalist, modern, and long-lasting.', seed: 'orchid-elegance', w: 600, h: 450 },
    { name: 'Meadow Wildflower', price: '$48', badge: 'Sustainable', badgeVariant: 'success' as const, desc: 'Locally foraged asters, Queen Anne\'s lace, and lavender tied with twine for a rustic, free-spirited look.', seed: 'meadow-wild', w: 600, h: 450 },
  ];

  const occasions = [
    { name: 'Birthday', desc: 'Bright, joyful arrangements that make any birthday feel celebrated.', color: 'pink' as const, seed: 'birthday-flowers', w: 400, h: 300 },
    { name: 'Anniversary', desc: 'Timeless roses and lilies crafted for milestones and quiet evenings.', color: 'purple' as const, seed: 'anniversary-bouquet', w: 400, h: 300 },
    { name: 'Sympathy', desc: 'Gentle, respectful tributes that speak when words fall short.', color: 'gray' as const, seed: 'sympathy-flowers', w: 400, h: 300 },
    { name: 'Just Because', desc: 'No occasion needed — a surprise bouquet is always the right idea.', color: 'green' as const, seed: 'just-because-flowers', w: 400, h: 300 },
  ];

  const testimonials = [
    { quote: 'I ordered the Midnight Rose for my wife\'s birthday and she literally cried. The arrangement was even more stunning than the photos — and it lasted over ten days.', author: 'Marcus Chen', role: 'Repeat customer since 2022' },
    { quote: 'Petal & Stem has completely changed how I think about flowers. The quality is unmatched, and knowing they source locally makes every bouquet feel like a small act of care.', author: 'Elena Vasquez', role: 'Interior designer' },
    { quote: 'I use them for every client event now. The florists understand scale and palette in a way that elevates the entire room. Professional, reliable, and beautiful.', author: 'James Whitfield', role: 'Event planner' },
  ];

  const features = [
    { icon: 'clock' as const, title: 'Same-day delivery', desc: 'Order by noon, delivered by evening.' },
    { icon: 'check' as const, title: '7-day freshness guarantee', desc: 'Or we replace it, no questions.' },
    { icon: 'calendar' as const, title: 'Hand-tied by florists', desc: 'Every stem chosen and arranged by hand.' },
    { icon: 'success' as const, title: 'Carbon-neutral shipping', desc: 'Offset on every single delivery.' },
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout
        height="fill"
        contentWidth={1280}
        header={
          <LayoutHeader padding={4}>
            <VStack gap={3}>
              <HStack justify="between" vAlign="center" wrap="wrap" gap={3}>
                <HStack gap={2} vAlign="center">
                  <Icon icon="check" size="md" color="accent" label="Petal & Stem logo" />
                  <Heading level={2} type="large">Petal & Stem</Heading>
                </HStack>
                <HStack gap={4} vAlign="center" wrap="wrap">
                  <Link href="#bouquets">Shop</Link>
                  <Link href="#occasions">Occasions</Link>
                  <Link href="#story">About</Link>
                  <Link href="#contact">Contact</Link>
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
                    endContent={
                      cartCount > 0 ? (
                        <Badge variant="info" label={String(cartCount)} />
                      ) : undefined
                    }
                  />
                </HStack>
              </HStack>
            </VStack>
          </LayoutHeader>
        }
        footer={
          <LayoutFooter padding={8}>
            <VStack gap={8}>
              <Grid columns={{minWidth: 180, repeat: 'fit'}} gap={6}>
                <VStack gap={2}>
                  <Heading level={3}>Petal & Stem</Heading>
                  <Text type="supporting">Hand-tied flowers, delivered with care.</Text>
                </VStack>
                <VStack gap={2}>
                  <Heading level={3}>Shop</Heading>
                  <Link href="#bouquets">All Bouquets</Link>
                  <Link href="#occasions">Seasonal</Link>
                  <Link href="#newsletter">Subscriptions</Link>
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
              <Text type="supporting" color="secondary">© 2025 Petal & Stem. All rights reserved.</Text>
            </VStack>
          </LayoutFooter>
        }
      >
        <LayoutContent padding={0}>
          <VStack gap={10} paddingBlock={8} paddingInline={4}>

            {/* HERO */}
            <VStack gap={6} maxWidth={1280} width="100%">
              <HStack gap={8} vAlign="center" wrap="wrap" width="100%">
                <VStack gap={4} maxWidth={480} width="100%">
                  <Badge variant="success" label="Fresh daily · Locally grown" />
                  <Heading level={1} type="display-2">Flowers that feel like a hug</Heading>
                  <Text type="body" color="secondary">
                    Hand-tied bouquets from local growers, delivered the same day you order. Every stem is chosen with intention, every arrangement crafted to bring a little more warmth into your world.
                  </Text>
                  <HStack gap={3} wrap="wrap">
                    <Button label="Shop the collection" variant="primary" onClick={() => {}} endContent={<Icon icon="chevronRight" size="sm" />} />
                    <Button label="How it works" variant="ghost" onClick={() => {}} />
                  </HStack>
                </VStack>
                <VStack width="100%" maxWidth={520}>
                  <Card padding={0}>
                    <AspectRatio ratio={4 / 3}>
                      <img src="https://picsum.photos/seed/petal-hero/800/600" alt="A lush hand-tied bouquet of white and pink flowers wrapped in brown kraft paper" style={imageFill} />
                    </AspectRatio>
                  </Card>
                </VStack>
              </HStack>
            </VStack>

            {/* FEATURES BAR */}
            <Grid columns={{minWidth: 220, repeat: 'fit'}} gap={4} width="100%" maxWidth={1280}>
              {features.map(f => (
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
            <VStack gap={4} width="100%" maxWidth={1280}>
              <VStack gap={1}>
                <Heading level={2}>Featured Bouquets</Heading>
                <Text type="body" color="secondary">Our most loved arrangements — each one hand-tied and ready for same-day delivery.</Text>
              </VStack>
              <Grid columns={{minWidth: 280, repeat: 'fit'}} gap={5} width="100%">
                {bouquets.map(b => (
                  <Card key={b.name} padding={0}>
                    <AspectRatio ratio={4 / 3}>
                      <img src={`https://picsum.photos/seed/${b.seed}/${b.w}/${b.h}`} alt={`${b.name} bouquet`} style={imageFill} />
                    </AspectRatio>
                    <VStack gap={2} padding={4}>
                      <HStack justify="between" vAlign="center" wrap="wrap" gap={2}>
                        <Heading level={4}>{b.name}</Heading>
                        {b.badge && <Badge variant={b.badgeVariant} label={b.badge} />}
                      </HStack>
                      <Text type="body" color="secondary" maxLines={2}>{b.desc}</Text>
                      <HStack justify="between" vAlign="center" gap={2}>
                        <Text type="body" weight="bold">{b.price}</Text>
                        <Button label="Add to Cart" variant="secondary" size="sm" onClick={addToCart} />
                      </HStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* SHOP BY OCCASION */}
            <VStack gap={4} width="100%" maxWidth={1280}>
              <VStack gap={1}>
                <Heading level={2}>Shop by Occasion</Heading>
                <Text type="body" color="secondary">Every moment deserves the right arrangement. Find the perfect bouquet for your occasion.</Text>
              </VStack>
              <Grid columns={{minWidth: 220, repeat: 'fit'}} gap={4} width="100%">
                {occasions.map(o => (
                  <Card key={o.name} variant={o.color} padding={0}>
                    <AspectRatio ratio={4 / 3}>
                      <img src={`https://picsum.photos/seed/${o.seed}/${o.w}/${o.h}`} alt={`${o.name} flower arrangement`} style={imageFill} />
                    </AspectRatio>
                    <VStack gap={1} padding={4}>
                      <Heading level={4}>{o.name}</Heading>
                      <Text type="supporting" color="secondary" maxLines={2}>{o.desc}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* HOW IT WORKS */}
            <VStack gap={4} width="100%" maxWidth={1280}>
              <VStack gap={1}>
                <Heading level={2}>How It Works</Heading>
                <Text type="body" color="secondary">From our studio to your door in three simple steps.</Text>
              </VStack>
              <Grid columns={{minWidth: 260, repeat: 'fit'}} gap={4} width="100%">
                {[
                  { step: '01', title: 'Choose your bouquet', desc: 'Browse our curated collection or let our florists recommend the perfect arrangement for your occasion.' },
                  { step: '02', title: 'We hand-tie it fresh', desc: 'Our studio florists select the freshest stems from local growers and craft your bouquet the same day.' },
                  { step: '03', title: 'Same-day delivery', desc: 'Your flowers arrive wrapped in our signature paper, looking just as vibrant as the moment they were cut.' },
                ].map(item => (
                  <Card key={item.step} variant="muted" padding={5}>
                    <VStack gap={3}>
                      <Text type="label" color="accent" weight="bold">{item.step}</Text>
                      <Heading level={4}>{item.title}</Heading>
                      <Text type="body" color="secondary">{item.desc}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* TESTIMONIALS */}
            <VStack gap={4} width="100%" maxWidth={1280}>
              <VStack gap={1}>
                <Heading level={2}>What Our Customers Say</Heading>
                <Text type="body" color="secondary">Real words from real people who've experienced the Petal & Stem difference.</Text>
              </VStack>
              <Grid columns={{minWidth: 280, repeat: 'fit'}} gap={4} width="100%">
                {testimonials.map(t => (
                  <Card key={t.author} variant="default" padding={5}>
                    <VStack gap={3}>
                      <Text type="body" color="secondary">"{t.quote}"</Text>
                      <Divider variant="subtle" />
                      <VStack gap={0.5}>
                        <Text type="body" weight="semibold">{t.author}</Text>
                        <Text type="supporting" color="secondary">{t.role}</Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* NEWSLETTER */}
            <Card variant="muted" padding={6} width="100%" maxWidth={1280}>
              <VStack gap={4} vAlign="center" hAlign="center">
                <Heading level={2}>Stay in Bloom</Heading>
                <Text type="body" color="secondary" justify="center" maxWidth={520}>
                  Get early access to seasonal collections, florist tips, and exclusive offers — straight to your inbox, once a week.
                </Text>
                <HStack gap={3} wrap="wrap" vAlign="end" maxWidth={440} width="100%">
                  <TextInput
                    label="Email address"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                    type="email"
                  />
                  <Button label="Subscribe" variant="primary" onClick={() => setEmail('')} />
                </HStack>
              </VStack>
            </Card>

            {/* OUR STORY */}
            <VStack gap={4} width="100%" maxWidth={1280} id="story">
              <Heading level={2}>Our Story</Heading>
              <Text type="body" color="secondary">
                Petal & Stem was born from a simple belief: flowers should feel personal, not mass-produced. We partner with small farms within a 100-mile radius of our studio, sourcing only what's in season and at its peak. That means our bouquets change with the calendar — and every arrangement tells the story of where it came from.
              </Text>
              <Text type="body" color="secondary">
                Our team of three florists brings over two decades of combined experience, from wedding design to botanical illustration. We hand-tie every bouquet in our sunlit studio, treating each stem with the same care we'd want for our own homes. When you receive a Petal & Stem arrangement, you're getting something made by hands that know flowers intimately.
              </Text>
            </VStack>

            {/* VISIT OUR STUDIO */}
            <Card variant="default" padding={6} width="100%" maxWidth={1280}>
              <VStack gap={5}>
                <Heading level={3}>Visit Our Studio</Heading>
                <Grid columns={{minWidth: 200, repeat: 'fit'}} gap={6} width="100%">
                  <VStack gap={2}>
                    <Text type="label" weight="semibold">Address</Text>
                    <Text type="body" color="secondary">247 Blossom Lane<br />Portland, OR 97205</Text>
                    <Link href="#directions">Get Directions ↗</Link>
                  </VStack>
                  <VStack gap={2}>
                    <Text type="label" weight="semibold">Hours</Text>
                    <Text type="body" color="secondary">Mon – Fri: 8am – 6pm<br />Sat: 9am – 4pm<br />Sun: Closed</Text>
                  </VStack>
                  <VStack gap={2}>
                    <Text type="label" weight="semibold">Phone</Text>
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