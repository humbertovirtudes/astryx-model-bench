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

  const bouquets = [
    {name:'Blush Rose Romance', desc:'Soft blush roses hand-tied with eucalyptus and ranunculus for a romantic, timeless feel.', price:'$89', badge:{label:'Bestseller', variant:'success' as const}, seed:'petal-1'},
    {name:'Peony Garden Luxe', desc:'Lush peonies, garden roses and seasonal greens, grown within 80 miles of our studio.', price:'$125', badge:{label:'Seasonal', variant:'warning' as const}, seed:'petal-2'},
    {name:'Tulip Morning Light', desc:'Bright tulips in warm tones with delicate filler blooms. Light, fresh, and cheerful.', price:'$64', badge:{label:'New', variant:'info' as const}, seed:'petal-3'},
    {name:'Sunflower Golden Hour', desc:'Golden sunflowers with ruscus and seasonal grasses for a sunny, effortless vibe.', price:'$72', badge:undefined, seed:'petal-4'},
    {name:'Orchid Minimal', desc:'Single stem phalaenopsis orchid with minimalist ceramic vessel. Elegant and long-lasting.', price:'$98', badge:{label:'Bestseller', variant:'success' as const}, seed:'petal-5'},
    {name:'Wildflower Meadow', desc:'A loose, airy mix of wildflowers and grasses, tied with natural twine.', price:'$76', badge:{label:'Seasonal', variant:'warning' as const}, seed:'petal-6'},
  ];

  const occasions = [
    {title:'Birthday', desc:'Joyful color palettes and playful textures.', seed:'occasion-1'},
    {title:'Anniversary', desc:'Classic roses and peonies with handwritten notes.', seed:'occasion-2'},
    {title:'Sympathy', desc:'Gentle whites and soft greens, delivered with care.', seed:'occasion-3'},
    {title:'Just Because', desc:'Surprise blooms for the everyday moments.', seed:'occasion-4'},
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout height="fill" contentWidth={1200}>
        <LayoutHeader padding={2}>
          <HStack justify="between" width="100%" hAlign="center">
            <Heading level={3}>Petal & Stem</Heading>
            <HStack gap={2} wrap="wrap">
              <Button label="Shop" variant="ghost" size="sm" onClick={()=>{}} />
              <Button label="Occasions" variant="ghost" size="sm" onClick={()=>{}} />
              <Button label="About" variant="ghost" size="sm" onClick={()=>{}} />
              <Button label="Contact" variant="ghost" size="sm" onClick={()=>{}} />
              <Button label={mode==='light'?'Dark':'Light'} variant="ghost" size="sm" onClick={()=>setMode(m=>m==='light'?'dark':'light')} />
              <Button label={`Cart (${cartCount})`} variant="ghost" size="sm" onClick={()=>{}} />
            </HStack>
          </HStack>
        </LayoutHeader>

        <LayoutContent padding={6}>
          <VStack gap={10}>
            <Grid columns={{minWidth:340}} gap={6} align="center">
              <VStack gap={4}>
                <Badge variant="neutral" label="Fresh daily · Locally grown" />
                <Heading level={1} type="display-1">Hand-tied blooms, delivered with care</Heading>
                <Text type="large" color="secondary">Petal & Stem grows and arranges with local farms within 100 miles. Every bouquet is hand-tied in our Portland studio and delivered the same day.</Text>
                <HStack gap={3}>
                  <Button label="Shop the collection" variant="primary" endContent={<Icon icon="chevronRight" size="sm" label="Open shop" />} onClick={()=>{}} />
                  <Button label="How it works" variant="ghost" onClick={()=>{}} />
                </HStack>
              </VStack>
              <Card padding={0}>
                <AspectRatio ratio={4/3}>
                  <img src="https://picsum.photos/seed/petal-hero/1200/900" alt="Hand-tied bouquet of blush roses and eucalyptus on a wooden table" style={imageFill} />
                </AspectRatio>
              </Card>
            </Grid>

            <Grid columns={{minWidth:200}} gap={4}>
              {[
                {icon:'clock', label:'Same-day delivery'},
                {icon:'check', label:'7-day freshness guarantee'},
                {icon:'success', label:'Hand-tied by florists'},
                {icon:'info', label:'Carbon-neutral shipping'},
              ].map((t,i)=>(
                <HStack key={i} gap={2} hAlign="center">
                  <Icon icon={t.icon} size="sm" label={t.label} />
                  <Text type="label" weight="semibold">{t.label}</Text>
                </HStack>
              ))}
            </Grid>

            <VStack gap={6}>
              <VStack gap={2}>
                <Heading level={2}>Featured bouquets</Heading>
                <Text type="supporting" color="secondary">Seasonal favorites, curated for color, scent, and longevity.</Text>
              </VStack>
              <Grid columns={{minWidth:300}} gap={6}>
                {bouquets.map(b=>(
                  <Card key={b.name} padding={4}>
                    <VStack gap={3}>
                      <Card padding={0}>
                        <AspectRatio ratio={1}>
                          <img src={`https://picsum.photos/seed/${b.seed}/600/600`} alt={`${b.name} bouquet`} style={imageFill} />
                        </AspectRatio>
                      </Card>
                      <VStack gap={1}>
                        <Heading level={3}>{b.name}</Heading>
                        <Text type="body" color="secondary" maxLines={2}>{b.desc}</Text>
                        <HStack justify="between" hAlign="center">
                          <Text type="label" weight="bold">{b.price}</Text>
                          {b.badge && <Badge variant={b.badge.variant} label={b.badge.label} />}
                        </HStack>
                        <Button label="Add to Cart" variant="primary" size="sm" onClick={()=>setCartCount(c=>c+1)} />
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <VStack gap={6}>
              <Heading level={2}>Shop by occasion</Heading>
              <Grid columns={{minWidth:260}} gap={6}>
                {occasions.map(o=>(
                  <Card key={o.title} padding={0}>
                    <VStack gap={0}>
                      <AspectRatio ratio={4/3}>
                        <img src={`https://picsum.photos/seed/${o.seed}/800/600`} alt={`${o.title} flowers`} style={imageFill} />
                      </AspectRatio>
                      <VStack padding={4} gap={1}>
                        <Heading level={3}>{o.title}</Heading>
                        <Text type="body" color="secondary">{o.desc}</Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <VStack gap={6}>
              <Heading level={2}>How it works</Heading>
              <Grid columns={{minWidth:260}} gap={6}>
                {[
                  {step:'1', title:'Choose', desc:'Pick a bouquet or custom arrangement. Add notes and delivery details.'},
                  {step:'2', title:'We hand-tie', desc:'Our florists select fresh stems and tie each bouquet in the studio.'},
                  {step:'3', title:'Same-day delivery', desc:'Local couriers deliver within hours, with care instructions included.'},
                ].map(s=>(
                  <VStack key={s.step} gap={2}>
                    <Badge variant="neutral" label={s.step} />
                    <Heading level={3}>{s.title}</Heading>
                    <Text type="body" color="secondary">{s.desc}</Text>
                  </VStack>
                ))}
              </Grid>
            </VStack>

            <VStack gap={6}>
              <Heading level={2}>Loved by customers</Heading>
              <Grid columns={{minWidth:300}} gap={6}>
                {[
                  {quote:'The roses arrived perfect and the note was handwritten. Felt so personal.', name:'Maya R.', role:'Portland'},
                  {quote:'Fast, thoughtful delivery. My mom cried—in a good way.', name:'Jonah K.', role:'Seattle'},
                  {quote:'I order every month. Consistent quality and beautiful wrapping.', name:'Aisha P.', role:'Beaverton'},
                ].map((t,i)=>(
                  <Card key={i} variant="muted" padding={4}>
                    <VStack gap={3}>
                      <Text type="body">“{t.quote}”</Text>
                      <VStack gap={0}>
                        <Text type="label" weight="semibold">{t.name}</Text>
                        <Text type="supporting" color="secondary">{t.role}</Text>
                      </VStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            <Card variant="muted" padding={6}>
              <HStack justify="between" wrap="wrap" gap={4}>
                <VStack gap={2} maxWidth={600}>
                  <Heading level={3}>Get fresh blooms in your inbox</Heading>
                  <Text type="body" color="secondary">Seasonal picks, studio notes, and first access to limited arrangements.</Text>
                </VStack>
                <HStack gap={2} wrap="nowrap">
                  <TextInput label="Email address" placeholder="you@email.com" value={email} onChange={setEmail} />
                  <Button label="Subscribe" variant="primary" onClick={()=>{setSubscribed(true); setEmail('')}} />
                </HStack>
              </HStack>
              {subscribed && <Text type="supporting" color="accent">Thanks for subscribing! Check your inbox.</Text>}
            </Card>

            <VStack gap={4}>
              <Heading level={2}>About Petal & Stem</Heading>
              <Text type="body">We are a small studio rooted in Portland’s flower community. We partner with family farms and grow our own seasonal filler, focusing on longevity, scent, and honest color. Every bouquet is hand-tied, never mass-produced.</Text>
              <Text type="body">Our team trains in sustainable practices and slow floristry. We believe flowers should feel calm, personal, and a little wild—just like the garden they come from.</Text>
            </VStack>

            <Card padding={4}>
              <VStack gap={4}>
                <Heading level={2}>Visit us</Heading>
                <Grid columns={{minWidth:240}} gap={4}>
                  <VStack gap={1}>
                    <Heading level={4}>Address</Heading>
                    <Text type="body">124 Bloom Lane<br/>Portland, OR 97205</Text>
                  </VStack>
                  <VStack gap={1}>
                    <Heading level={4}>Hours</Heading>
                    <Text type="body">Tue–Sat 9am–6pm<br/>Sun–Mon by appointment</Text>
                  </VStack>
                  <VStack gap={1}>
                    <Heading level={4}>Phone</Heading>
                    <Text type="body">(503) 555-0142</Text>
                  </VStack>
                </Grid>
                <Link href="https://maps.google.com" isExternalLink> Get Directions </Link>
              </VStack>
            </Card>

            <Divider />
          </VStack>
        </LayoutContent>

        <LayoutFooter padding={6}>
          <VStack gap={6}>
            <HStack justify="between" wrap="wrap" gap={6}>
              <VStack gap={2}>
                <Heading level={3}>Petal & Stem</Heading>
                <Text type="supporting" color="secondary">Fresh, local flowers. Hand-tied with care.</Text>
              </VStack>
              <VStack gap={2}>
                <Text type="label" weight="semibold">Shop</Text>
                <VStack gap={1}>
                  <Link href="#">Bouquets</Link>
                  <Link href="#">Seasonal</Link>
                  <Link href="#">Plants</Link>
                </VStack>
              </VStack>
              <VStack gap={2}>
                <Text type="label" weight="semibold">Company</Text>
                <VStack gap={1}>
                  <Link href="#">About</Link>
                  <Link href="#">Journal</Link>
                  <Link href="#">Careers</Link>
                </VStack>
              </VStack>
              <VStack gap={2}>
                <Text type="label" weight="semibold">Support</Text>
                <VStack gap={1}>
                  <Link href="#">Delivery</Link>
                  <Link href="#">Returns</Link>
                  <Link href="#">Contact</Link>
                </VStack>
              </VStack>
            </HStack>
            <Text type="supporting" color="secondary">© {new Date().getFullYear()} Petal & Stem. All rights reserved.</Text>
          </VStack>
        </LayoutFooter>
      </Layout>
    </Theme>
  );
}