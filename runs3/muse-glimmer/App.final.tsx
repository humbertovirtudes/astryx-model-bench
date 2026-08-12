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

const imageFill = { width: '100%', height: '100%', objectFit: 'cover' } as const;

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('you@example.com');

  const addToCart = () => setCartCount(c => c + 1);

  const bouquets = [
    {name:'Rose Romance', tag:'Bestseller', tagVariant:'success' as const, desc:'Classic red roses with soft eucalyptus and seasonal filler.', price:'$85', seed:'rose1'},
    {name:'Peony Blush', tag:'Seasonal', tagVariant:'warning' as const, desc:'Cream and blush peonies with garden greens.', price:'$92', seed:'peony1'},
    {name:'Tulip Garden', tag:'New', tagVariant:'neutral' as const, desc:'Mixed spring tulips, delicate and bright.', price:'$68', seed:'tulip1'},
    {name:'Sunflower Field', tag:null, tagVariant:'neutral' as const, desc:'Golden sunflowers with ruscus and soft greens.', price:'$75', seed:'sunflower1'},
    {name:'Orchid Luxe', tag:'Bestseller', tagVariant:'success' as const, desc:'Phalaenopsis orchid in a ceramic vessel.', price:'$110', seed:'orchid1'},
    {name:'Wildflower Meadow', tag:'Seasonal', tagVariant:'warning' as const, desc:'Foraged wildflowers, changes weekly.', price:'$78', seed:'wild1'},
  ];

  const occasions = [
    {name:'Birthday', desc:'Joyful color, playful stems for celebration.', seed:'occasion1'},
    {name:'Anniversary', desc:'Romantic roses and soft textures.', seed:'occasion2'},
    {name:'Sympathy', desc:'Gentle whites and greens, delivered with care.', seed:'occasion3'},
    {name:'Just Because', desc:'Surprise blooms for everyday moments.', seed:'occasion4'},
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout contentWidth={1120} height="auto">
        <LayoutHeader padding={2}>
          <HStack justify="between" wrap="wrap" gap={3}>
            <Heading level={3}>Petal & Stem</Heading>
            <HStack gap={4} wrap="wrap" hAlign="center">
              <Link href="#">Shop</Link>
              <Link href="#">Occasions</Link>
              <Link href="#">About</Link>
              <Link href="#">Contact</Link>
              <Button label={mode === 'light' ? 'Dark' : 'Light'} variant="ghost" size="sm" onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')} />
              <Text type="label" weight="medium">Cart ({cartCount})</Text>
            </HStack>
          </HStack>
        </LayoutHeader>

        <LayoutContent padding={4}>
          <VStack gap={10}>
            <Grid columns={{minWidth: 480}} gap={6} align="center">
              <VStack gap={4} hAlign="stretch">
                <Badge variant="neutral" label="Fresh daily · Locally grown" />
                <Heading level={1} type="display-1">Flowers that feel like home</Heading>
                <Text type="large" color="secondary">
                  Hand-tied bouquets from our studio to your door in 24 hours. Seasonal stems, thoughtful design, zero waste.
                </Text>
                <HStack gap={3} wrap="wrap">
                  <Button label="Shop the collection" variant="primary" onClick={addToCart} />
                  <Link href="#">How it works</Link>
                </HStack>
              </VStack>
              <Card padding={0}>
                <AspectRatio ratio={4/3}>
                  <img src="https://picsum.photos/seed/flower-hero/1200/800" alt="Hand-tied seasonal bouquet in soft natural light" style={imageFill} />
                </AspectRatio>
              </Card>
            </Grid>

            <Grid columns={{minWidth: 220}} gap={4} align="center">
              {[
                {icon:'clock', label:'Same-day delivery'},
                {icon:'check', label:'7-day freshness guarantee'},
                {icon:'check', label:'Hand-tied by florists'},
                {icon:'info', label:'Carbon-neutral shipping'},
              ].map((f,i)=>(
                <HStack key={i} gap={2} hAlign="center">
                  <Icon icon={f.icon} label={f.label} size="sm" />
                  <Text type="label">{f.label}</Text>
                </HStack>
              ))}
            </Grid>

            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={2}>Featured bouquets</Heading>
                <Text type="supporting" color="secondary">Our most loved seasonal arrangements, updated weekly.</Text>
              </VStack>
              <Grid columns={{minWidth: 280}} gap={4}>
                {bouquets.map(b=>(
                  <Card key={b.name} padding={0} variant="default">
                    <AspectRatio ratio={4/3}>
                      <img src={`https://picsum.photos/seed/${b.seed}/800/600`} alt={`${b.name} bouquet`} style={imageFill} />
                    </AspectRatio>
                    <VStack padding={4} gap={2}>
                      <HStack gap={2} justify="center" wrap="wrap">
                        <Text type="label" weight="semibold">{b.name}</Text>
                        {b.tag && <Badge variant={b.tagVariant} label={b.tag} />}
                      </HStack>
                      <Text type="supporting" color="secondary" justify="center">{b.desc}</Text>
                      <Text type="label" weight="bold">{b.price}</Text>
                      <Button label="Add to Cart" variant="secondary" size="sm" onClick={addToCart} />
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <VStack gap={4}>
              <Heading level={2}>Shop by occasion</Heading>
              <Grid columns={{minWidth: 260}} gap={4}>
                {occasions.map(o=>(
                  <Card key={o.name} padding={0} variant="default">
                    <AspectRatio ratio={4/3}>
                      <img src={`https://picsum.photos/seed/${o.seed}/800/600`} alt={`${o.name} occasion flowers`} style={imageFill} />
                    </AspectRatio>
                    <VStack padding={4} gap={1}>
                      <Text type="label" weight="semibold">{o.name}</Text>
                      <Text type="supporting" color="secondary">{o.desc}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <VStack gap={4}>
              <Heading level={2}>How it works</Heading>
              <Grid columns={{minWidth: 260}} gap={4}>
                {[
                  {title:'Choose', desc:'Pick a bouquet or build your own with seasonal stems.'},
                  {title:'We hand-tie', desc:'Our florists design each arrangement fresh that morning.'},
                  {title:'Same-day delivery', desc:'Local couriers deliver within hours, with care notes included.'},
                ].map((s,i)=>(
                  <Card key={i} variant="muted" padding={4}>
                    <VStack gap={2}>
                      <Badge variant="neutral" label={`${i+1}`} />
                      <Text type="label" weight="semibold">{s.title}</Text>
                      <Text type="supporting" color="secondary">{s.desc}</Text>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <VStack gap={4}>
              <Heading level={2}>Loved by customers</Heading>
              <Grid columns={{minWidth: 280}} gap={4}>
                {[
                  {quote:'“Petal & Stem made my anniversary unforgettable. Arrived perfect and still blooming after a week.”', name:'Maya R.', city:'Portland'},
                  {quote:'“Supportive, thoughtful, and beautiful. The sympathy arrangement was exactly right.”', name:'James K.', city:'Seattle'},
                  {quote:'“Fast, fresh, and personal. I get a note with every delivery.”', name:'Lena T.', city:'Boise'},
                ].map((t,i)=>(
                  <Card key={i} variant="muted" padding={4}>
                    <VStack gap={2}>
                      <Text type="body">"{t.quote}"</Text>
                      <VStack gap={0}>
                        <Text type="label" weight="semibold">{t.name}</Text>
                        <Text type="supporting" color="secondary">{t.city}</Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <Card variant="muted" padding={6}>
              <VStack gap={3} maxWidth={720}>
                <Heading level={3}>Stay in bloom</Heading>
                <Text type="supporting" color="secondary">Get seasonal picks, studio notes, and first access to limited stems.</Text>
                <HStack gap={3} wrap="wrap">
                  <VStack gap={1} style={{flex:1, minWidth:240}}>
                    <Text type="label">Email</Text>
                    <TextInput label="" placeholder="you@example.com" value={email} onChange={setEmail} />
                  </VStack>
                  <Button label="Subscribe" variant="primary" onClick={()=>{}} />
                </HStack>
              </VStack>
            </Card>

            <VStack gap={4}>
              <Heading level={2}>About Petal & Stem</Heading>
              <Text type="body" color="secondary">
                We are a small studio rooted in Portland’s flower district. Every bouquet is hand-tied with locally grown, seasonal stems and delivered the same day. We work directly with regional growers, keep waste low, and design for longevity.
              </Text>
              <Text type="body" color="secondary">
                Our team of florists treats each order like a commission: thoughtful color, clean lines, and a note written by hand. From everyday joy to life’s quiet moments, we make flowers feel personal.
              </Text>
              <Card variant="default" padding={4}>
                <VStack gap={4}>
                  <Heading level={4}>Visit us</Heading>
                  <Grid columns={{minWidth: 220}} gap={4}>
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
                  <Link href="#" isExternalLink> Get Directions</Link>
                </VStack>
              </Card>
            </VStack>
          </VStack>
        </LayoutContent>

        <LayoutFooter padding={6}>
          <Divider />
          <Grid columns={{minWidth: 200}} gap={6} style={{marginTop:16}}>
            <VStack gap={2}>
              <Text type="label" weight="semibold">Petal & Stem</Text>
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
          <Text type="supporting" color="secondary" style={{marginTop:24}}>© 2026 Petal & Stem. All rights reserved.</Text>
        </LayoutFooter>
      </Layout>
    </Theme>
  );
}