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
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';

const imageFill = { width: '100%', height: '100%', objectFit: 'cover' } as const;

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');

  const addToCart = () => setCartCount(c => c + 1);

  const headerContent = (
    <LayoutHeader padding={4}>
      <HStack justify="between" vAlign="center">
        <Heading level={2} type="display-3">
          Petal &amp; Stem
        </Heading>
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Button label="Shop" variant="ghost" size="sm" onClick={() => {}} />
          <Button label="Occasions" variant="ghost" size="sm" onClick={() => {}} />
          <Button label="About" variant="ghost" size="sm" onClick={() => {}} />
          <Button label="Contact" variant="ghost" size="sm" onClick={() => {}} />
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
            endContent={<Icon icon="menu" size="sm" label="cart icon" />}
          />
        </HStack>
      </HStack>
    </LayoutHeader>
  );

  const footerContent = (
    <LayoutFooter padding={8}>
      <VStack gap={6}>
        <Divider variant="subtle" />
        <HStack gap={10} justify="between" wrap="wrap">
          <VStack gap={2}>
            <Heading level={3}>Petal &amp; Stem</Heading>
            <Text type="supporting" color="secondary">
              Hand-tied bouquets, delivered with care since 2019.
            </Text>
          </VStack>
          <VStack gap={3}>
            <Heading level={4}>Shop</Heading>
            <Link href="#bouquets">Bouquets</Link>
            <Link href="#occasions">Occasions</Link>
            <Link href="#subscriptions">Subscriptions</Link>
            <Link href="#gift-cards">Gift Cards</Link>
          </VStack>
          <VStack gap={3}>
            <Heading level={4}>Company</Heading>
            <Link href="#about">Our Story</Link>
            <Link href="#studio">The Studio</Link>
            <Link href="#sustainability">Sustainability</Link>
            <Link href="#press">Press</Link>
          </VStack>
          <VStack gap={3}>
            <Heading level={4}>Support</Heading>
            <Link href="#faq">FAQ</Link>
            <Link href="#delivery">Delivery Info</Link>
            <Link href="#returns">Returns</Link>
            <Link href="#contact">Contact Us</Link>
          </VStack>
        </HStack>
        <Divider variant="subtle" />
        <HStack justify="between" vAlign="center" wrap="wrap">
          <Text type="supporting" color="secondary">
            © {new Date().getFullYear()} Petal &amp; Stem. All rights reserved.
          </Text>
          <HStack gap={3}>
            <Link href="#privacy">Privacy</Link>
            <Link href="#terms">Terms</Link>
          </HStack>
        </HStack>
      </VStack>
    </LayoutFooter>
  );

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout height="fill" contentWidth={1200} header={headerContent} footer={footerContent}>
        <LayoutContent padding={6}>
          <VStack gap={10}>

            {/* 1. HERO */}
            <Grid columns={{ minWidth: 340 }} gap={8}>
              <VStack gap={5}>
                <Badge label="Fresh daily · Locally grown" variant="green" />
                <Heading level={1} type="display-1">
                  Blooms that say what words can't
                </Heading>
                <Text type="large" color="secondary">
                  Every arrangement at Petal &amp; Stem is cut fresh each morning from local growers
                  and hand-tied by our in-house florists. From a single stem to a grand installation,
                  we bring the garden to your door — same day, every day.
                </Text>
                <HStack gap={3}>
                  <Button
                    label="Shop the collection"
                    variant="primary"
                    size="lg"
                    onClick={() => {}}
                    endContent={<Icon icon="chevronRight" size="md" label="arrow icon" />}
                  />
                  <Button label="How it works" variant="ghost" size="lg" onClick={() => {}} />
                </HStack>
              </VStack>
              <Card padding={0}>
                <AspectRatio ratio={4 / 3}>
                  <img src="https://picsum.photos/seed/petal-hero/800/600" alt="A lush hand-tied bouquet of pink peonies, white roses, and greenery wrapped in kraft paper" style={imageFill} />
                </AspectRatio>
              </Card>
            </Grid>

            {/* 2. TRUST STRIP */}
            <Card variant="muted" padding={6}>
              <Grid columns={4} gap={6}>
                <VStack gap={2} hAlign="center">
                  <Icon icon="clock" size="lg" label="clock icon" />
                  <Heading level={4}>Same-day delivery</Heading>
                  <Text type="supporting" color="secondary" maxLines={2}>
                    Order by noon, arrive by evening.
                  </Text>
                </VStack>
                <VStack gap={2} hAlign="center">
                  <Icon icon="success" size="lg" label="check icon" />
                  <Heading level={4}>7-day freshness</Heading>
                  <Text type="supporting" color="secondary" maxLines={2}>
                    Guaranteed vibrant for a full week.
                  </Text>
                </VStack>
                <VStack gap={2} hAlign="center">
                  <Icon icon="check" size="lg" label="check icon" />
                  <Heading level={4}>Hand-tied by florists</Heading>
                  <Text type="supporting" color="secondary" maxLines={2}>
                    Every stem placed with intention.
                  </Text>
                </VStack>
                <VStack gap={2} hAlign="center">
                  <Icon icon="info" size="lg" label="info icon" />
                  <Heading level={4}>Carbon-neutral shipping</Heading>
                  <Text type="supporting" color="secondary" maxLines={2}>
                    Offset at every mile we deliver.
                  </Text>
                </VStack>
              </Grid>
            </Card>

            {/* 3. FEATURED BOUQUETS */}
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={2}>Featured bouquets</Heading>
                <Text type="large" color="secondary">
                  Our most loved arrangements, refreshed weekly from the season's best.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 300 }} gap={6}>
                {/* Card 1 */}
                <Card padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={1}>
                        <img src="https://picsum.photos/seed/petal-rose/600/600" alt="Deep red garden roses arranged with eucalyptus in a spiral bouquet" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <HStack justify="between" vAlign="start" wrap="wrap">
                      <VStack gap={1}>
                        <Heading level={3}>The Velvet Rose</Heading>
                        <Text type="body" color="secondary" maxLines={2}>
                          Garden roses in shades of crimson and burgundy, wrapped with silver dollar eucalyptus.
                        </Text>
                      </VStack>
                      <Badge label="Bestseller" variant="success" />
                    </HStack>
                    <HStack justify="between" vAlign="center">
                      <Text weight="bold">$68</Text>
                      <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
                    </HStack>
                  </VStack>
                </Card>
                {/* Card 2 */}
                <Card padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={1}>
                        <img src="https://picsum.photos/seed/petal-peony/600/600" alt="Soft blush peonies with baby's breath in a loose, romantic arrangement" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <HStack justify="between" vAlign="start" wrap="wrap">
                      <VStack gap={1}>
                        <Heading level={3}>Blush Peony Dream</Heading>
                        <Text type="body" color="secondary" maxLines={2}>
                          Full, ruffled peonies in pale pink with delicate sprigs of baby's breath.
                        </Text>
                      </VStack>
                      <Badge label="Seasonal" variant="warning" />
                    </HStack>
                    <HStack justify="between" vAlign="center">
                      <Text weight="bold">$82</Text>
                      <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
                    </HStack>
                  </VStack>
                </Card>
                {/* Card 3 */}
                <Card padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={1}>
                        <img src="https://picsum.photos/seed/petal-tulip/600/600" alt="A bright mix of yellow, coral, and white tulips in a modern bunch" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <HStack justify="between" vAlign="start" wrap="wrap">
                      <VStack gap={1}>
                        <Heading level={3}>Dutch Tulip Mix</Heading>
                        <Text type="body" color="secondary" maxLines={2}>
                          A cheerful medley of yellow, coral, and white tulips cut at peak bloom.
                        </Text>
                      </VStack>
                      <Badge label="New" variant="info" />
                    </HStack>
                    <HStack justify="between" vAlign="center">
                      <Text weight="bold">$54</Text>
                      <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
                    </HStack>
                  </VStack>
                </Card>
                {/* Card 4 */}
                <Card padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={1}>
                        <img src="https://picsum.photos/seed/petal-sunflower/600/600" alt="Large golden sunflowers with green filler in a rustic arrangement" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <HStack justify="between" vAlign="start" wrap="wrap">
                      <VStack gap={1}>
                        <Heading level={3}>Golden Hour Sunflower</Heading>
                        <Text type="body" color="secondary" maxLines={2}>
                          Big, bold sunflowers paired with seeded eucalyptus and solidago.
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack justify="between" vAlign="center">
                      <Text weight="bold">$58</Text>
                      <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
                    </HStack>
                  </VStack>
                </Card>
                {/* Card 5 */}
                <Card padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={1}>
                        <img src="https://picsum.photos/seed/petal-orchid/600/600" alt="Elegant white phalaenopsis orchids with dark green foliage" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <HStack justify="between" vAlign="start" wrap="wrap">
                      <VStack gap={1}>
                        <Heading level={3}>White Orchid Elegance</Heading>
                        <Text type="body" color="secondary" maxLines={2}>
                          Phalaenopsis orchids arranged with dark foliage for a refined, lasting statement.
                        </Text>
                      </VStack>
                      <Badge label="Bestseller" variant="success" />
                    </HStack>
                    <HStack justify="between" vAlign="center">
                      <Text weight="bold">$76</Text>
                      <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
                    </HStack>
                  </VStack>
                </Card>
                {/* Card 6 */}
                <Card padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={1}>
                        <img src="https://picsum.photos/seed/petal-wildflower/600/600" alt="A free-spirited wildflower mix with lavender, daisies, and cosmos" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <HStack justify="between" vAlign="start" wrap="wrap">
                      <VStack gap={1}>
                        <Heading level={3}>Meadow Wildflower</Heading>
                        <Text type="body" color="secondary" maxLines={2}>
                        Lavender, cosmos, and daisies gathered like a walk through a summer meadow.
                        </Text>
                      </VStack>
                      <Badge label="Seasonal" variant="warning" />
                    </HStack>
                    <HStack justify="between" vAlign="center">
                      <Text weight="bold">$48</Text>
                      <Button label="Add to Cart" variant="primary" size="sm" onClick={addToCart} />
                    </HStack>
                  </VStack>
                </Card>
              </Grid>
            </VStack>

            {/* 4. OCCASIONS */}
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={2}>Shop by occasion</Heading>
                <Text type="large" color="secondary">
                  The right flowers for every moment that matters.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 260 }} gap={6}>
                <Card variant="pink" padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={4 / 3}>
                        <img src="https://picsum.photos/seed/petal-birthday/600/450" alt="A bright birthday bouquet with yellow roses and confetti" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <Heading level={3}>Birthday</Heading>
                    <Text type="body" color="secondary" maxLines={2}>
                      Celebrate another trip around the sun with blooms that pop.
                    </Text>
                    <Button label="Explore" variant="primary" size="sm" onClick={() => {}} />
                  </VStack>
                </Card>
                <Card variant="purple" padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={4 / 3}>
                        <img src="https://picsum.photos/seed/petal-anniversary/600/450" alt="An elegant anniversary arrangement with deep red roses and white lilies" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <Heading level={3}>Anniversary</Heading>
                    <Text type="body" color="secondary" maxLines={2}>
                      Timeless arrangements for the love you're still writing.
                    </Text>
                    <Button label="Explore" variant="primary" size="sm" onClick={() => {}} />
                  </VStack>
                </Card>
                <Card variant="gray" padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={4 / 3}>
                        <img src="https://picsum.photos/seed/petal-sympathy/600/450" alt="A gentle sympathy arrangement with white lilies and soft greenery" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <Heading level={3}>Sympathy</Heading>
                    <Text type="body" color="secondary" maxLines={2}>
                      Thoughtful, tender arrangements that speak when words fall short.
                    </Text>
                    <Button label="Explore" variant="primary" size="sm" onClick={() => {}} />
                  </VStack>
                </Card>
                <Card variant="yellow" padding={4}>
                  <VStack gap={3}>
                    <Card padding={0}>
                      <AspectRatio ratio={4 / 3}>
                        <img src="https://picsum.photos/seed/petal-justbecause/600/450" alt="A cheerful surprise bouquet with mixed spring flowers" style={imageFill} />
                      </AspectRatio>
                    </Card>
                    <Heading level={3}>Just Because</Heading>
                    <Text type="body" color="secondary" maxLines={2}>
                      The best reason to send flowers is no reason at all.
                    </Text>
                    <Button label="Explore" variant="primary" size="sm" onClick={() => {}} />
                  </VStack>
                </Card>
              </Grid>
            </VStack>

            {/* 5. HOW IT WORKS */}
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={2}>How it works</Heading>
                <Text type="large" color="secondary">
                  From our studio to your doorstep in three simple steps.
                </Text>
              </VStack>
              <Grid columns={3} gap={6}>
                <Card variant="cyan" padding={5}>
                  <VStack gap={3} hAlign="center">
                    <Heading level={3} type="display-3">1</Heading>
                    <Icon icon="search" size="lg" label="search icon" />
                    <Heading level={4}>Choose your bouquet</Heading>
                    <Text type="body" color="secondary" maxLines={2}>
                      Browse our curated collection or let our florists surprise you with a seasonal pick.
                    </Text>
                  </VStack>
                </Card>
                <Card variant="green" padding={5}>
                  <VStack gap={3} hAlign="center">
                    <Heading level={3} type="display-3">2</Heading>
                    <Icon icon="check" size="lg" label="check icon" />
                    <Heading level={4}>We hand-tie it fresh</Heading>
                    <Text type="body" color="secondary" maxLines={2}>
                      Your arrangement is cut and wrapped the same morning it ships — no warehouse, no wait.
                    </Text>
                  </VStack>
                </Card>
                <Card variant="orange" padding={5}>
                  <VStack gap={3} hAlign="center">
                    <Heading level={3} type="display-3">3</Heading>
                    <Icon icon="clock" size="lg" label="clock icon" />
                    <Heading level={4}>Same-day delivery</Heading>
                    <Text type="body" color="secondary" maxLines={2}>
                      Order by noon and watch your flowers arrive before the evening light.
                    </Text>
                  </VStack>
                </Card>
              </Grid>
            </VStack>

            {/* 6. TESTIMONIALS */}
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={2}>What our customers say</Heading>
                <Text type="large" color="secondary">
                  Real words from real flower lovers.
                </Text>
              </VStack>
              <Grid columns={{ minWidth: 300 }} gap={6}>
                <Card variant="muted" padding={5}>
                  <VStack gap={3}>
                    <Text type="large">
                      "I've ordered from Petal &amp; Stem for every anniversary since 2020. The peonies last
                      over a week and always look exactly like the photos. It's become our tradition."
                    </Text>
                    <Divider variant="subtle" />
                    <Heading level={4}>Margaret Chen</Heading>
                    <Text type="supporting" color="secondary">Portland, OR · 12 orders</Text>
                  </VStack>
                </Card>
                <Card variant="muted" padding={5}>
                  <VStack gap={3}>
                    <Text type="large">
                      "I sent a sympathy arrangement to my neighbor across the city and it arrived by 4pm.
                      She told me it was the most beautiful thing she'd received. Thank you for caring so much."
                    </Text>
                    <Divider variant="subtle" />
                    <Heading level={4}>James Okafor</Heading>
                    <Text type="supporting" color="secondary">Seattle, WA · 5 orders</Text>
                  </VStack>
                </Card>
                <Card variant="muted" padding={5}>
                  <VStack gap={3}>
                    <Text type="large">
                      "The subscription box is the highlight of my month. Every delivery feels like a little
                      garden party. The wildflower mix in June was absolutely breathtaking."
                    </Text>
                    <Divider variant="subtle" />
                    <Heading level={4}>Sophia Ramirez</Heading>
                    <Text type="supporting" color="secondary">San Francisco, CA · Subscriber</Text>
                  </VStack>
                </Card>
              </Grid>
            </VStack>

            {/* 7. NEWSLETTER */}
            <Card variant="muted" padding={8}>
              <VStack gap={4} hAlign="center">
                <Heading level={2}>Stay in bloom</Heading>
                <Text type="large" color="secondary" maxLines={2}>
                  Get early access to seasonal drops, florist tips, and a 10% welcome discount — straight to your inbox.
                </Text>
                <HStack gap={3} wrap="wrap" hAlign="center">
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
                    size="md"
                    onClick={() => setEmail('')}
                    isDisabled={!email}
                  />
                </HStack>
              </VStack>
            </Card>

            {/* 8. ABOUT */}
            <VStack gap={5}>
              <Heading level={2}>Our story</Heading>
              <VStack gap={4}>
                <Text type="body">
                  Petal &amp; Stem started in a converted garage in Southeast Portland with a single
                  conviction: flowers should look like they were just picked, because they were.
                  Founder Elena Vasquez spent three years apprenticing under master florists in the
                  Pacific Northwest before opening her own studio in 2019. She believed that the
                  relationship between grower and recipient should be as direct as possible — no
                  distribution centers, no days of transit, no compromise on freshness.
                </Text>
                <Text type="body">
                  Today, our team of six florists sources from over two dozen local farms within a
                  100-mile radius. Every morning at 5am, we're at the studio selecting stems,
                  conditioning water, and building the day's arrangements. The result is a collection
                  that changes with the seasons, reflects the landscape we love, and arrives at your
                  door at the peak of its life. We're not the biggest flower shop in the city, but
                  we're the one that treats every stem like it matters — because it does.
                </Text>
              </VStack>
            </VStack>

            {/* 9. VISIT US */}
            <Card variant="transparent" padding={6}>
              <VStack gap={5}>
                <Heading level={2}>Visit the studio</Heading>
                <Grid columns={3} gap={6}>
                  <VStack gap={2}>
                    <Heading level={4}>Address</Heading>
                    <Text type="body">427 SE Division Street</Text>
                    <Text type="body">Portland, OR 97202</Text>
                  </VStack>
                  <VStack gap={2}>
                    <Heading level={4}>Hours</Heading>
                    <Text type="body">Mon – Fri: 8am – 6pm</Text>
                    <Text type="body">Sat: 9am – 5pm</Text>
                    <Text type="body">Sun: Closed</Text>
                  </VStack>
                  <VStack gap={2}>
                    <Heading level={4}>Phone</Heading>
                    <Text type="body">(503) 555-0174</Text>
                    <Link href="mailto:hello@petalandstem.com" isStandalone>hello@petalandstem.com</Link>
                  </VStack>
                </Grid>
                <Link href="https://maps.google.com" isExternalLink isStandalone>
                  Get Directions
                </Link>
              </VStack>
            </Card>

          </VStack>
        </LayoutContent>
      </Layout>
    </Theme>
  );
}