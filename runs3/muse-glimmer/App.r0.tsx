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

  const handleSubscribe = () => {
    if (email.includes('@') && email.includes('.')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const bouquets = [
    { seed: 'bouquet-rose', name: 'Rose Romance', desc: 'Classic red roses with soft eucalyptus and seasonal filler.', price: '$85', badge: {label:'Bestseller', variant:'success'} },
    { seed: 'bouquet-peony', name: 'Peony Blush', desc: 'Cream and blush peonies with garden greens.', price: '$92', badge: {label:'Seasonal', variant:'warning'} },
    { seed: 'bouquet-tulip', name: 'Tulip Garden', desc: 'Mixed spring tulips, delicate and bright.', price: '$68', badge: {label:'New', variant:'info'} },
    { seed: 'bouquet-sunflower', name: 'Sunflower Field', desc: 'Golden sunflowers with ruscus and soft greens.', price: '$75' },
    { seed: 'bouquet-orchid', name: 'Orchid Luxe', desc: 'Phalaenopsis orchid in a ceramic vessel.', price: '$110', badge: {label:'Bestseller', variant:'success'} },
    { seed: 'bouquet-wildflower', name: 'Wildflower Meadow', desc: 'Foraged wildflowers, changes weekly.', price: '$78', badge: {label:'Seasonal', variant:'warning'} },
  ];

  const occasions = [
    { seed: 'occasion-birthday', name: 'Birthday', desc: 'Joyful color, playful stems for celebration.', variant:'pink' as const },
    { seed: 'occasion-anniversary', name: 'Anniversary', desc: 'Romantic roses and soft textures.', variant:'purple' as const },
    { seed: 'occasion-sympathy', name: 'Sympathy', desc: 'Gentle whites and greens, delivered with care.', variant:'gray' as const },
    { seed: 'occasion-justbecause', name: 'Just Because', desc: 'Surprise blooms for everyday moments.', variant:'teal' as const },
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout
        height="fill"
        contentWidth={1200}
        header={
          <LayoutHeader padding={3}>
            <HStack justify="between" hAlign="center" width="100%">
              <Heading level={1}>Petal & Stem</Heading>
              <HStack gap={2} hAlign="center">
                <Button label="Shop" variant="ghost" size="sm" onClick={()=>{}} />
                <Button label="Occasions" variant="ghost" size="sm" onClick={()=>{}} />
                <Button label="About" variant="ghost" size="sm" onClick={()=>{}} />
                <Button label="Contact" variant="ghost" size="sm" onClick={()=>{}} />
                <Button label={mode === 'light' ? 'Dark' : 'Light'} variant="ghost" size="sm" onClick={()=>setMode(m=>m==='light'?'dark':'light')} />
                <Button label={`Cart (${cartCount})`} variant="ghost" size="sm" onClick={()=>{}} />
              </HStack>
            </HStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent padding={6}>
            <VStack gap={10}>
              <Grid columns={{minWidth:340}} gap={6} hAlign="center" vAlign="center">
                <VStack gap={4}>
                  <Badge label="Fresh daily · Locally grown" />
                  <Heading level={2} type="display-1">Flowers that feel like home</Heading>
                  <Text type="large" color="secondary">Hand-tied bouquets from our studio to your door in 24 hours. Seasonal stems, thoughtful design, zero waste.</Text>
                  <HStack gap={3}>
                    <Button label="Shop the collection" variant="primary" endContent={<Icon icon="chevronRight" label="Open collection" size="sm" />} onClick={()=>{}} />
                    <Button label="How it works" variant="ghost" onClick={()=>{}} />
                  </HStack>
                </VStack>
                <Card padding={0}>
                  <AspectRatio ratio={4/3}>
                    <img src="https://picsum.photos/seed/petal-hero/1200/900" alt="Hand-tied bouquet of roses and peonies on a linen table" style={imageFill} />
                  </AspectRatio>
                </Card>
              </Grid>

              <Grid columns={4} gap={4}>
                {[
                  {icon:'clock', label:'Same-day delivery'},
                  {icon:'check', label:'7-day freshness guarantee'},
                  {icon:'success', label:'Hand-tied by florists'},
                  {icon:'info', label:'Carbon-neutral shipping'},
                ].map((t,i)=>(
                  <HStack key={i} gap={2} hAlign="center">
                    <Icon icon={t.icon} label={t.label+' icon'} size="sm" />
                    <Text type="label" weight="medium">{t.label}</Text>
                  </HStack>
                ))}
              </Grid>

              <VStack gap={6}>
                <VStack gap={2}>
                  <Heading level={2}>Featured bouquets</Heading>
                  <Text type="supporting" color="secondary">Our most loved seasonal arrangements, updated weekly.</Text>
                </VStack>
                <Grid columns={{minWidth:300}} gap={6}>
                  {bouquets.map(b=>(
                    <Card key={b.name} padding={4}>
                      <VStack gap={3}>
                        <Card padding={0}>
                          <AspectRatio ratio={1}>
                            <img src={`https://picsum.photos/seed/${b.seed}/600/600`} alt={b.name} style={imageFill} />
                          </AspectRatio>
                        </Card>
                        <VStack gap={1}>
                          <HStack justify="between" hAlign="center">
                            <Heading level={3}>{b.name}</Heading>
                            {b.badge && <Badge variant={b.badge.variant} label={b.badge.label} />}
                          </HStack>
                          <Text type="body" color="secondary" maxLines={2}>{b.desc}</Text>
                          <Text weight="bold">{b.price}</Text>
                        </VStack>
                        <Button label="Add to Cart" variant="primary" size="sm" onClick={()=>setCartCount(c=>c+1)} />
                      </VStack>
                    </Card>
                  ))}
                </Grid>
              </VStack>

              <VStack gap={6}>
                <Heading level={2}>Shop by occasion</Heading>
                <Grid columns={{minWidth:260}} gap={6}>
                  {occasions.map(o=>(
                    <Card key={o.name} variant={o.variant} padding={0}>
                      <VStack gap={0}>
                        <AspectRatio ratio={4/3}>
                          <img src={`https://picsum.photos/seed/${o.seed}/800/600`} alt={`${o.name} flowers`} style={imageFill} />
                        </AspectRatio>
                        <VStack padding={4} gap={2}>
                          <Heading level={3}>{o.name}</Heading>
                          <Text type="body" color="secondary">{o.desc}</Text>
                        </VStack>
                      </VStack>
                    </Card>
                  ))}
                </Grid>
              </VStack>

              <VStack gap={6}>
                <Heading level={2}>How it works</Heading>
                <Grid columns={3} gap={6}>
                  {[
                    {title:'Choose', text:'Pick a bouquet or build your own with seasonal stems.'},
                    {title:'We hand-tie', text:'Our florists design each arrangement fresh that morning.'},
                    {title:'Same-day delivery', text:'Local couriers deliver within hours, with care notes included.'},
                  ].map((s,i)=>(
                    <VStack key={i} gap={3}>
                      <Badge label={`${i+1}`} />
                      <Heading level={3}>{s.title}</Heading>
                      <Text type="body" color="secondary">{s.text}</Text>
                    </VStack>
                  ))}
                </Grid>
              </VStack>

              <VStack gap={6}>
                <Heading level={2}>Loved by customers</Heading>
                <Grid columns={{minWidth:300}} gap={6}>
                  {[
                    {quote:'Petal & Stem made my anniversary unforgettable. Arrived perfect and still blooming after a week.', name:'Maya R.', role:'Portland'},
                    {quote:'Supportive, thoughtful, and beautiful. The sympathy arrangement was exactly right.', name:'James K.', role:'Seattle'},
                    {quote:'Fast, fresh, and personal. I get a note with every delivery.', name:'Lena T.', role:'Boise'},
                  ].map((t,i)=>(
                    <Card key={i} variant="muted" padding={5}>
                      <VStack gap={3}>
                        <Text type="large">“{t.quote}”</Text>
                        <VStack gap={0}>
                          <Text weight="semibold">{t.name}</Text>
                          <Text type="supporting" color="secondary">{t.role}</Text>
                        </VStack>
                      </VStack>
                    </Card>
                  ))}
                </Grid>
              </VStack>

              <Card variant="muted" padding={6}>
                <VStack gap={4}>
                  <VStack gap={2}>
                    <Heading level={2}>Stay in bloom</Heading>
                    <Text type="body" color="secondary">Get seasonal picks, studio notes, and first access to limited stems.</Text>
                  </VStack>
                  <HStack gap={3} wrap="wrap">
                    <TextInput label="Email" placeholder="you@example.com" value={email} onChange={setEmail} />
                    <Button label="Subscribe" variant="primary" onClick={handleSubscribe} />
                  </HStack>
                  {subscribed && <Text type="supporting" color="accent">Thanks for subscribing! Check your inbox.</Text>}
                </VStack>
              </Card>

              <VStack gap={4}>
                <Heading level={2}>About Petal & Stem</Heading>
                <Text type="body">We are a small studio rooted in Portland’s flower district. Every bouquet is hand-tied with locally grown, seasonal stems and delivered the same day. We work directly with regional growers, keep waste low, and design for longevity.</Text>
                <Text type="body">Our team of florists treats each order like a commission: thoughtful color, clean lines, and a note written by hand. From everyday joy to life’s quiet moments, we make flowers feel personal.</Text>
              </VStack>

              <Card padding={6}>
                <VStack gap={4}>
                  <Heading level={2}>Visit us</Heading>
                  <Grid columns={{minWidth:240}} gap={6}>
                    <VStack gap={1}>
                      <Heading level={4}>Address</Heading>
                      <Text type="body">1247 Bloom St, Portland, OR 97205</Text>
                    </VStack>
                    <VStack gap={1}>
                      <Heading level={4}>Hours</Heading>
                      <Text type="body">Tue–Sat 9am–6pm</Text>
                      <Text type="body">Sun 10am–4pm</Text>
                    </VStack>
                    <VStack gap={1}>
                      <Heading level={4}>Phone</Heading>
                      <Text type="body">(503) 555-0147</Text>
                    </VStack>
                  </Grid>
                  <Link href="https://maps.google.com" isExternalLink isStandalone> Get Directions </Link>
                </VStack>
              </Card>

              <Divider />
            </VStack>
          </LayoutContent>
        }
        footer={
          <LayoutFooter padding={6}>
            <VStack gap={6}>
              <Grid columns={{minWidth:200}} gap={6}>
                <VStack gap={2}>
                  <Heading level={2}>Petal & Stem</Heading>
                  <Text type="supporting" color="secondary">Fresh daily, locally grown, hand-tied with care.</Text>
                </VStack>
                <VStack gap={2}>
                  <Heading level={4}>Shop</Heading>
                  <Link href="#">Bouquets</Link>
                  <Link href="#">Occasions</Link>
                  <Link href="#">Plants</Link>
                </VStack>
                <VStack gap={2}>
                  <Heading level={4}>Company</Heading>
                  <Link href="#">About</Link>
                  <Link href="#">Studio</Link>
                  <Link href="#">Careers</Link>
                </VStack>
                <VStack gap={2}>
                  <Heading level={4}>Support</Heading>
                  <Link href="#">Contact</Link>
                  <Link href="#">Shipping</Link>
                  <Link href="#">Returns</Link>
                </VStack>
              </Grid>
              <Text type="supporting" color="secondary">© {new Date().getFullYear()} Petal & Stem. All rights reserved.</Text>
            </VStack>
          </LayoutFooter>
        }
      />
    </Theme>
  );
}