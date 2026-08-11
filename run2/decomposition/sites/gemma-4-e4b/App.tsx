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

function HeroSection() {
  return (
    <Grid columns={{ minWidth: 340 }} gap={6}>
      {/* Left Column Content */}
      <VStack spacing={4}>
        <Badge variant="info" label="Fresh daily · Locally grown" />
        <Heading level={1} type="display-1">
          Fresh flowers, hand-tied daily
        </Heading>
        <Text type="large" color="secondary">
          Experience the freshest blooms delivered right to your door. Our local partnerships ensure that every bouquet is crafted with care and passion.
        </Text>
        <HStack gap={3}>
          <Button label="Shop the collection" variant="primary" size="md" />
          <Button label="How it works" variant="ghost" size="md" />
        </HStack>
      </VStack>

      {/* Right Column Content */}
      <Card padding={0}>
        <AspectRatio ratio={4 / 3}>
          <img src="https://picsum.photos/seed/petal-hero/800/600" alt="A hand-tied seasonal bouquet" style={imageFill} />
        </AspectRatio>
      </Card>
    </Grid>
  );
}

function TrustSection() {
  return (
    <Grid columns={4} gap={4}>
      {/* Same-day delivery */}
      <VStack gap={1} hAlign="center">
        <Icon icon="clock" size="md" color="accent" label="Same-day delivery" />
        <Text weight="semibold">Same-Day Delivery</Text>
        <Text type="supporting" color="secondary">Guaranteed fresh flowers delivered when you need them.</Text>
      </VStack>

      {/* 7-day freshness */}
      <VStack gap={1} hAlign="center">
        <Icon icon="success" size="md" color="accent" label="7-day freshness" />
        <Text weight="semibold">7-Day Freshness</Text>
        <Text type="supporting" color="secondary">We ensure your blooms stay vibrant and beautiful.</Text>
      </VStack>

      {/* Hand-tied by florists */}
      <VStack gap={1} hAlign="center">
        <Icon icon="check" size="md" color="accent" label="Hand-tied by florists" />
        <Text weight="semibold">Hand-Tied Quality</Text>
        <Text type="supporting" color="secondary">Every bouquet is crafted with care and expertise.</Text>
      </VStack>

      {/* Carbon-neutral shipping */}
      <VStack gap={1} hAlign="center">
        <Icon icon="info" size="md" color="accent" label="Carbon-neutral shipping" />
        <Text weight="semibold">Eco-Friendly Shipping</Text>
        <Text type="supporting" color="secondary">Making beautiful gestures without harming the planet.</Text>
      </VStack>
    </Grid>
  );
}

function FeaturedSection({ addToCart }: { addToCart: () => void }) {
  const bouquets = [
    { name: "Rose Radiance", description: "A timeless blend of deep red roses.", seed: "rose", price: "$48", badges: ['success', 'Bestseller'], isNew: false },
    { name: "Peony Dream", description: "Soft, romantic peonies in full bloom.", seed: "peony", price: "$52", badges: ['warning', 'Seasonal'], isNew: false },
    { name: "Tulip Sunrise", description: "Bright and cheerful mix of spring tulips.", seed: "tulip", price: "$45", badges: ['info', 'New'], isNew: true },
    { name: "Sunflower Fields", description: "Vibrant yellows capturing summer sunshine.", seed: "sunflower", price: "$60", badges: [], isNew: false },
    { name: "Orchid Elegance", description: "Exotic and sophisticated orchid varieties.", seed: "orchid", price: "$75", badges: [], isNew: false },
    { name: "Wildflower Meadow", description: "A charming mix of delicate wildflowers.", seed: "wildflower", price: "$39", badges: [], isNew: false },
  ];

  const renderCard = (bouquet: typeof bouquets[0]) => {
    // Determine if the card should show Bestseller/Seasonal/New based on index (first three)
    const getBadges = () => {
      if (!bouquet.badges || bouquet.badges.length === 0) return null;

      return (
        <>
          {bouquet.badges.map((badgeType, i) => (
            <Badge key={i} variant={badgeType}>{badgeType}</Badge>
          ))}
        </>
      );
    };

    return (
      <Card padding={0}>
        <AspectRatio ratio={1} shape="rectangle">
          <img src={`https://picsum.photos/seed/${bouquet.seed}/600/600`} alt={`${bouquet.name} bouquet`} style={imageFill} />
        </AspectRatio>

        <VStack padding={4} gap={2}>
          <Heading level={3}>{bouquet.name}</Heading>
          <Text type="supporting" maxLines={2} color="secondary">{bouquet.description}</Text>

          <HStack justify="between" vAlign="center">
            {/* Price */}
            <Text weight="bold">{bouquet.price}</Text>

            {/* Badges and Button */}
            <HStack gap={2}>
              {getBadges()}
              <Button label="Add to Cart" variant="primary" size="sm" onClick={() => addToCart(bouquet)} />
            </HStack>
          </HStack>
        </VStack>
      </Card>
    );
  };

  return (
    <VStack gap={6}>
      {/* Header */}
      <VStack gap={2}>
        <Heading level={2}>Featured bouquets</Heading>
        <Text type="supporting" color="secondary">Hand-picked arrangements for every occasion.</Text>
      </VStack>

      {/* Grid */}
      <Grid columns={{ minWidth: 300 }} gap={6}>
        {bouquets.map((bouquet, index) => (
          <div key={index}>{renderCard(bouquet)}</div>
        ))}
      </Grid>
    </VStack>
  );
}

function OccasionsSection() {
  return (
    <VStack gap={6}>
      <Heading level={2}>Shop by occasion</Heading>
      <Grid columns={{ minWidth: 240 }} gap={4}>
        {/* Card 1: Pink - Birthday */}
        <Card variant="pink" padding={5}>
          <VStack gap={1}>
            <Heading level={3}>Birthday</Heading>
            <Text type="supporting">Celebrate life's brightest moments with a gift that shines.</Text>
          </VStack>
        </Card>

        {/* Card 2: Purple - Anniversary */}
        <Card variant="purple" padding={5}>
          <VStack gap={1}>
            <Heading level={3}>Anniversary</Heading>
            <Text type="supporting">Marking another year together deserves something truly special.</Text>
          </VStack>
        </Card>

        {/* Card 3: Orange - Sympathy */}
        <Card variant="orange" padding={5}>
          <VStack gap={1}>
            <Heading level={3}>Sympathy</Heading>
            <Text type="supporting">Offering comfort and remembrance during difficult times.</Text>
          </VStack>
        </Card>

        {/* Card 4: Teal - Just Because */}
        <Card variant="teal" padding={5}>
          <VStack gap={1}>
            <Heading level={3}>Just Because</Heading>
            <Text type="supporting">Because some days just need a little unexpected joy.</Text>
          </VStack>
        </Card>
      </Grid>
    </VStack>
  );
}

function HowItWorksSection() {
  return (
    <VStack gap={6}>
      <Heading level={2}>How it works</Heading>
      <Grid columns={3} gap={6}>
        {/* Step 1 */}
        <VStack gap={2}>
          <Heading level={3}>1. Choose</Heading>
          <Text type="supporting" color="secondary">Select your desired design and materials from our curated collection.</Text>
        </VStack>

        {/* Step 2 */}
        <VStack gap={2}>
          <Heading level={3}>2. We hand-tie</Heading>
          <Text type="supporting" color="secondary">Our expert artisans meticulously hand-tie each piece to ensure premium quality.</Text>
        </VStack>

        {/* Step 3 */}
        <VStack gap={2}>
          <Heading level={3}>3. Same-day delivery</Heading>
          <Text type="supporting" color="secondary">Get your unique creation delivered right to your door in a single day.</Text>
        </VStack>
      </Grid>
    </VStack>
  );
}

function TestimonialsSection() {
  return (
    <VStack gap={6}>
      <Heading level={2}>Loved by locals</Heading>
      <Grid columns={{ minWidth: 300 }} gap={6}>
        {/* Testimonial Card 1 */}
        <Card padding={5}>
          <VStack gap={3}>
            <Text type="body">"The quality exceeded my expectations. It's robust, beautifully designed, and has made a noticeable difference in our daily operations."</Text>
            <VStack gap={0}>
              <Heading level={4}>Sarah Chen</Heading>
              <Text type="supporting" color="secondary">Marketing Director at Global Solutions</Text>
            </VStack>
          </VStack>
        </Card>

        {/* Testimonial Card 2 */}
        <Card padding={5}>
          <VStack gap={3}>
            <Text type="body">"I was skeptical at first, but the ease of use and powerful features quickly won me over. Highly recommend this to anyone in the industry."</Text>
            <VStack gap={0}>
              <Heading level={4}>Michael Rodriguez</Heading>
              <Text type="supporting" color="secondary">Freelance Consultant & Designer</Text>
            </VStack>
          </VStack>
        </Card>

        {/* Testimonial Card 3 */}
        <Card padding={5}>
          <VStack gap={3}>
            <Text type="body">"Fantastic support and an incredibly reliable product. It seamlessly integrated with our existing stack, saving us countless hours."</Text>
            <VStack gap={0}>
              <Heading level={4}>Emily Carter</Heading>
              <Text type="supporting" color="secondary">Product Manager at InnovateCo</Text>
            </VStack>
          </VStack>
        </Card>
      </Grid>
    </VStack>
  );
}

function NewsletterSection({ email, setEmail }: { email: string; setEmail: (v: string) => void }) {
  return (
    <Card variant="muted" padding={8}>
      <VStack gap={4} hAlign="center">
        <Heading level={2} justify="center">Bloom with us</Heading>
        <Text type="large" color="secondary" justify="center">Stay updated on our latest designs and insights.</Text>
        <HStack gap={2} wrap="wrap" vAlign="end">
          <TextInput 
            label="Email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Button label="Subscribe" variant="primary" onClick={() => {}} />
        </HStack>
      </VStack>
    </Card>
  );
}

function AboutSection() {
  return (
    <VStack gap={4} maxWidth={760}>
      <Heading level={2}>Our story</Heading>
      <Text type="body" color="secondary">
        Nestled in the heart of our community, [Studio Name] is more than just a flower studio—it's a celebration of local life and natural beauty. We believe that the most vibrant bouquets come from the freshest sources, which is why we are deeply committed to sourcing over 90% of our blooms within a hundred-mile radius.
      </Text>
      <Text type="body" color="secondary">
        Every single bouquet leaving our hands is treated as a piece of art. Our flowers aren't just arranged; they are hand-tied with care, reflecting the unique character and spirit of our local area. Experience the difference that true locality makes in every petal.
      </Text>
    </VStack>
  );
}

function VisitSection() {
  return (
    <Card padding={6}>
      <VStack gap={4}>
        <Heading level={2}>Visit us</Heading>
        <Grid columns={3} gap={4}>
          {/* Address */}
          <VStack gap={1}>
            <Heading level={4}>Address</Heading>
            <Text type="body">123 Astryx Lane, Suite 500</Text>
            <Text type="supporting">City, State 90210</Text>
          </VStack>

          {/* Hours */}
          <VStack gap={1}>
            <Heading level={4}>Hours</Heading>
            <Text type="body">Mon - Fri: 9:00 AM - 5:00 PM</Text>
            <Text type="supporting">Sat: By Appointment</Text>
          </VStack>

          {/* Phone */}
          <VStack gap={1}>
            <Heading level={4}>Phone</Heading>
            <Text type="body">(555) 123-4567</Text>
          </VStack>
        </Grid>
        <Link href="https://maps.google.com" isExternalLink isStandalone>
          Get directions
        </Link>
      </VStack>
    </Card>
  );
}

function FooterSection() {
  return (
    <VStack gap={4}>
      {/* Main content row: Logo/Tagline + 3 Columns */}
      <HStack justify="between" wrap="wrap" gap={6}>
        {/* Logo / Tagline Block */}
        <VStack gap={1}>
          <Heading level={3}>Petal & Stem</Heading>
          <Text type="supporting" color="secondary">tagline</Text>
        </VStack>

        {/* Shop Column */}
        <VStack gap={1}>
          <Heading level={4}>Shop</Heading>
          <Link href="#shop-item-1">Product A</Link>
          <Link href="#shop-item-2">Collection B</Link>
          <Link href="#shop-item-3">Sale Items</Link>
        </VStack>

        {/* Company Column */}
        <VStack gap={1}>
          <Heading level={4}>Company</Heading>
          <Link href="#about">About Us</Link>
          <Link href="#careers">Careers</Link>
          <Link href="#contact-us">Contact</Link>
        </VStack>

        {/* Support Column */}
        <VStack gap={1}>
          <Heading level={4}>Support</Heading>
          <Link href="#faq">FAQ</Link>
          <Link href="#shipping">Shipping Info</Link>
          <Link href="#returns">Returns Policy</Link>
        </VStack>
      </HStack>

      {/* Divider */}
      <Divider variant="subtle" />

      {/* Copyright Text */}
      <Text type="supporting" color="secondary">© 2026 Petal & Stem. All rights reserved.</Text>
    </VStack>
  );
}

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');
  const addToCart = () => setCartCount((c) => c + 1);
  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout height="fill" contentWidth={1200}
        header={
          <LayoutHeader padding={4}>
            <HStack justify="between" vAlign="center" wrap="wrap" gap={2}>
              <Heading level={1} type="display-3">Petal &amp; Stem</Heading>
              <HStack gap={2} vAlign="center" wrap="wrap">
                <Button label="Shop" variant="ghost" size="sm" onClick={() => {}} />
                <Button label="Occasions" variant="ghost" size="sm" onClick={() => {}} />
                <Button label="About" variant="ghost" size="sm" onClick={() => {}} />
                <Button label="Contact" variant="ghost" size="sm" onClick={() => {}} />
                <Button label={mode === 'light' ? 'Dark' : 'Light'} variant="ghost" size="sm" onClick={toggleMode} />
                <Button label={`Cart (${cartCount})`} variant="primary" size="sm" onClick={() => {}} />
              </HStack>
            </HStack>
          </LayoutHeader>
        }
        footer={<LayoutFooter padding={6}><FooterSection /></LayoutFooter>}
      >
        <LayoutContent padding={6}>
          <VStack gap={10}>
            <HeroSection />
            <TrustSection />
            <FeaturedSection addToCart={addToCart} />
            <OccasionsSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <NewsletterSection email={email} setEmail={setEmail} />
            <AboutSection />
            <VisitSection />
          </VStack>
        </LayoutContent>
      </Layout>
    </Theme>
  );
}
