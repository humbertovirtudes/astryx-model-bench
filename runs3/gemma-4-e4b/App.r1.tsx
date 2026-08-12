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
    <Grid columns={{ minWidth: 340 }} gap={12} className="max-w-[1280px] mx-auto py-20">
      {/* Left Content Column */}
      <VStack spacing={6} hAlign="start" className="flex flex-col justify-center pt-8 lg:pt-0">
        {/* Eyebrow Badge */}
        <Badge variant="info" label="Fresh daily · Locally grown" />

        {/* Main Heading - Adjusted typography for better impact */}
        <Heading level={1} type="display-1" className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tighter mt-4">
          Fresh flowers, hand-tied daily
        </Heading>

        {/* Marketing Copy Text */}
        <Text type="body" color="secondary" weight="normal" maxLines={3} className="mt-6 text-lg sm:text-xl">
          Discover the beauty of seasonal blooms delivered right to your door. We source only from local farms to ensure unparalleled freshness and quality in every bouquet.
        </Text>

        {/* Button HStack */}
        <HStack gap={4} pt={8}>
          <Button label="Shop the collection" variant="primary" size="lg" />
          <Button label="How it works" variant="ghost" size="lg" />
        </HStack>
      </VStack>

      {/* Right Image Column */}
      <Card padding={0} className="overflow-hidden shadow-2xl lg:shadow-none">
        <AspectRatio ratio={4 / 3}>
          <img
            src="https://picsum.photos/seed/petal-hero/800/600"
            alt="A hand-tied seasonal bouquet"
            style={imageFill}
          />
        </AspectRatio>
      </Card>
    </Grid>
  );
}

function TrustSection() {
  const trustPoints = [
    { icon: 'clock', label: 'Same-day delivery', description: 'Fresh flowers delivered right to your door, same day.' },
    { icon: 'success', label: '7-day freshness', description: 'We ensure peak freshness with our 7-day quality guarantee.' },
    { icon: 'check', label: 'Hand-tied by florists', description: 'Every bouquet is lovingly arranged and hand-tied by professional florists.' },
    { icon: 'info', label: 'Carbon-neutral shipping', description: 'Our commitment to the planet means every shipment is carbon offset.' },
  ];

  return (
    <Grid 
      columns={{ minWidth: '23%' }} // Ensures 4 columns on desktop, collapses gracefully on mobile
      gap={6}
      width="100%"
    >
      {trustPoints.map((point, index) => (
        // Using Card provides necessary padding and visual separation for each trust point
        <Card key={index} variant="transparent" padding={4}> 
          <VStack gap={2} hAlign="start">
            {/* HStack combines the Icon and the Label into a single line */}
            <HStack gap={3} alignItems="center">
              <Icon icon={point.icon} size="md" color="primary" />
              <Text weight="semibold">{point.label}</Text>
            </HStack>
            {/* Supporting text for the description */}
            <Text type="supporting" color="secondary">{point.description}</Text>
          </VStack>
        </Card>
      ))}
    </Grid>
  );
}

function FeaturedSection({ addToCart }: { addToCart: () => void }) {
  const bouquets = [
    { name: "Rose Radiance", description: "A timeless blend of deep red and blush roses.", seed: "rose", price: "$48", badges: [{ type: 'success', label: 'Bestseller' }, { type: 'warning', label: 'Seasonal' }, { type: 'info', label: 'New' }] },
    { name: "Peony Dream", description: "Soft, voluminous peonies capturing spring's gentle essence.", seed: "peony", price: "$52", badges: [{ type: 'success', label: 'Bestseller' }, { type: 'warning', label: 'Seasonal' }, { type: 'info', label: 'New' }] },
    { name: "Tulip Sunrise", description: "Vibrant tulips mimicking the first blush of dawn.", seed: "tulip", price: "$39", badges: [{ type: 'success', label: 'Bestseller' }, { type: 'warning', label: 'Seasonal' }, { type: 'info', label: 'New' }] },
    { name: "Sunflower Fields", description: "A burst of golden joy, reminiscent of endless summer.", seed: "sunflower", price: "$60", badges: [] },
    { name: "Orchid Elegance", description: "Exotic and sophisticated blooms for the discerning admirer.", seed: "orchid", price: "$75", badges: [] },
    { name: "Wildflower Meadow", description: "A carefree mix of nature's beautiful, untamed palette.", seed: "wildflower", price: "$45", badges: [] },
  ];

  return (
    <VStack gap={8}>
      <Heading level={3} className="text-3xl">Featured bouquets</Heading>
      <Text type="supporting" color="secondary" maxLines={2}>
        Discover our handpicked collection of the season's most breathtaking floral arrangements.
      </Text>

      {/* Responsive Grid: Min width 280px allows for 4 columns on desktop (1280/4 = 320), and collapses to 1 column on mobile */}
      <Grid columns={{ minWidth: 280 }} gap={6}>
        {bouquets.map((bouquet, index) => (
          <Card key={index} padding={0}>
            <AspectRatio ratio={1} shape="rectangle">
              <img src={`https://picsum.photos/seed/${bouquet.seed}/600/600`} alt={`${bouquet.name}`} style={imageFill} />
            </AspectRatio>
            <VStack padding={4} gap={3}>
              <Heading level={3} className="text-xl">{bouquet.name}</Heading>
              <Text type="supporting" maxLines={2} color="secondary">
                {bouquet.description}
              </Text>

              <HStack justify="between" vAlign="center" pt={1}>
                <Text weight="bold">{bouquet.price}</Text>
                <VStack gap={1}>
                  {bouquet.badges.map((badge, i) => (
                    // Assuming badge type is handled by the variant prop structure
                    <Badge key={i} variant={`${badge.type}-${badge.label.toLowerCase()}`}>{badge.label}</Badge>
                  ))}
                </VStack>
              </HStack>

              <Button label="Add to Cart" variant="primary" size="md" w="100%" onClick={addToCart} />
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}

function OccasionsSection() {
  return (
    <VStack gap={8}>
      <Heading level={2} className="max-w-[600px]">Shop by occasion</Heading>
      <Grid columns={{ minWidth: 240 }} gap={5}>
        {/* Birthday - Pink */}
        <Card variant="pink" padding={6}>
          <VStack gap={1}>
            <Heading level={3}>Birthday</Heading>
            <Text type="body">Celebrate life's biggest milestones with thoughtful gifts.</Text>
          </VStack>
        </Card>

        {/* Anniversary - Purple */}
        <Card variant="purple" padding={6}>
          <VStack gap={1}>
            <Heading level={3}>Anniversary</Heading>
            <Text type="body">Marking years of love with timeless keepsakes.</Text>
          </VStack>
        </Card>

        {/* Sympathy - Orange */}
        <Card variant="orange" padding={6}>
          <VStack gap={1}>
            <Heading level={3}>Sympathy</Heading>
            <Text type="body">Sending comfort and warm thoughts during difficult times.</Text>
          </VStack>
        </Card>

        {/* Just Because - Teal */}
        <Card variant="teal" padding={6}>
          <VStack gap={1}>
            <Heading level={3}>Just Because</Heading>
            <Text type="body">A little reminder that you are loved, anytime.</Text>
          </VStack>
        </Card>
      </Grid>
    </VStack>
  );
}

function HowItWorksSection() {
  return (
    <VStack gap={8} p={6}>
      <Heading level={2} className="text-center">How it works</Heading>

      {/* Responsive Grid Container */}
      <Grid 
        columns={{ minWidth: 300 }} // Ensures stacking on mobile (<300px) and up to 3 columns on desktop.
        gap={6}
        className="w-full"
      >
        {/* Step 1 Card/Container */}
        <VStack gap={4} p={5} className="bg-gray-50 rounded-lg shadow-sm border border-gray-100">
          <HStack gap={2}>
            <Text type="large" weight="bold" color="primary">1</Text>
            <Heading level={3} className="flex-grow">Choose Your Piece</Heading>
          </HStack>
          <Text type="body" color="secondary">
            Select the perfect artisanal piece from our curated collection of handcrafted goods. Browse and discover unique items tailored just for you.
          </Text>
        </VStack>

        {/* Step 2 Card/Container */}
        <VStack gap={4} p={5} className="bg-gray-50 rounded-lg shadow-sm border border-gray-100">
          <HStack gap={2}>
            <Text type="large" weight="bold" color="primary">2</Text>
            <Heading level={3} className="flex-grow">Expert Hand-Tying</Heading>
          </HStack>
          <Text type="body" color="secondary">
            Our expert artisans meticulously hand-tie and finish your selection to perfection, ensuring quality craftsmanship in every detail.
          </Text>
        </VStack>

        {/* Step 3 Card/Container */}
        <VStack gap={4} p={5} className="bg-gray-50 rounded-lg shadow-sm border border-gray-100">
          <HStack gap={2}>
            <Text type="large" weight="bold" color="primary">3</Text>
            <Heading level={3} className="flex-grow">Same-Day Delivery</Heading>
          </HStack>
          <Text type="body" color="secondary">
            Enjoy the ultimate convenience with same-day delivery, ensuring you receive your beautiful goods quickly and safely.
          </Text>
        </VStack>
      </Grid>
    </VStack>
  );
}

function TestimonialsSection() {
  return (
    <VStack gap={10} width="full">
      <Heading level={2}>Loved by locals</Heading>
      <Grid columns={{ minWidth: 300 }} gap={6}>
        {/* Card 1 */}
        <Card variant="default" padding={6}>
          <VStack gap={4}>
            <Text type="body">
              "The quality of service here is unmatched. I highly recommend it to anyone looking for a reliable and professional experience."
            </Text>
            <VStack gap={1}>
              <Heading level={4}>John Doe</Heading>
              <Text type="supporting" color="secondary">Software Engineer</Text>
            </VStack>
          </VStack>
        </Card>

        {/* Card 2 */}
        <Card variant="default" padding={6}>
          <VStack gap={4}>
            <Text type="body">
              "I was initially skeptical, but the results exceeded all my expectations. A truly seamless and delightful process from start to finish."
            </Text>
            <VStack gap={1}>
              <Heading level={4}>Jane Smith</Heading>
              <Text type="supporting" color="secondary">UX Designer</Text>
            </VStack>
          </VStack>
        </Card>

        {/* Card 3 */}
        <Card variant="default" padding={6}>
          <VStack gap={4}>
            <Text type="body">
              "Exceptional attention to detail and deep local knowledge. It feels like discovering a hidden gem that everyone should know about."
            </Text>
            <VStack gap={1}>
              <Heading level={4}>Robert Brown</Heading>
              <Text type="supporting" color="secondary">Independent Consultant</Text>
            </VStack>
          </VStack>
        </Card>
      </Grid>
    </VStack>
  );
}

function NewsletterSection({ email, setEmail }: { email: string; setEmail: (v: string) => void }) {
  return (
    <Card variant="muted" padding={8} maxWidth={{ base: '100%', md: 640 }}>
      <VStack gap={5} hAlign="center">
        <Heading level={2} justify="center">Bloom with us</Heading>
        <Text type="large" color="secondary" justify="center">Stay connected and receive exclusive updates.</Text>

        {/* Responsive Input Group: Uses HStack for side-by-side layout on larger screens, 
            but the components themselves handle wrapping/scaling gracefully. */}
        <HStack gap={2} vAlign="center" width="100%">
          <TextInput 
            label="" // Removed label to allow cleaner inline input experience with placeholder
            placeholder="you@example.com" 
            value={email} 
            onChange={(v) => setEmail(v)} 
            // Allowing the TextInput to take up most of the available space
            flexGrow={1} 
          />
          <Button label="Subscribe" variant="primary" onClick={() => {}} />
        </HStack>
      </VStack>
    </Card>
  );
}

function AboutSection() {
  return (
    <VStack gap={8} maxWidth={1024}>
      <Heading level={2}>Our Story</Heading>
      <Text type="body" color="secondary">
        At Bloom & Branch, we believe the most beautiful flowers are those nurtured by community. Our studio is deeply rooted in local sourcing, meaning every stem and bloom comes from within 100 miles of our home. This commitment ensures peak freshness and supports regional growers who share our passion for natural beauty.
      </Text>

      <Grid
        columns={{ minWidth: 280 }} // Ensures 3 columns on desktop/tablet, stacking to 1 column on mobile
        gap={6}
        maxWidth={1200}
      >
        {/* Pillar 1: Local Sourcing */}
        <Card variant="default" padding={6}>
          <Heading level={4} color="primary">Local Roots</Heading>
          <Text type="supporting" color="secondary">
            Every bloom comes from within 100 miles. We prioritize regional growers, ensuring peak freshness and supporting our community's agricultural heart.
          </Text>
        </Card>

        {/* Pillar 2: Artistry */}
        <Card variant="default" padding={6}>
          <Heading level={4} color="primary">Hand-Tied Artistry</Heading>
          <Text type="supporting" color="secondary">
            More than just a bouquet, we craft wearable art. Each arrangement is hand-tied with intention by our expert florists.
          </Text>
        </Card>

        {/* Pillar 3: Experience */}
        <Card variant="default" padding={6}>
          <Heading level={4} color="primary">Nature's Fresh Moments</Heading>
          <Text type="supporting" color="secondary">
            When you choose Bloom & Branch, you are choosing a piece of local artistry designed to bring nature's freshest moments into your life.
          </Text>
        </Card>
      </Grid>
    </VStack>
  );
}

function VisitSection() {
  return (
    <Card padding={6}>
      <VStack gap={6}>
        <Heading level={2}>Visit us</Heading>

        {/* Responsive Grid: Columns stack gracefully on mobile (<300px) */}
        <Grid columns={{ minWidth: 300 }} gap={8} className="mt-4">
          {/* Address Block */}
          <VStack gap={1.5}>
            <Heading level={4} color="secondary">Address</Heading>
            <Text type="body" weight="medium">123 Astryx Way, Tech City, CA 90210</Text>
            <Text type="body">Suite 500</Text>
          </VStack>

          {/* Hours Block */}
          <VStack gap={1.5}>
            <Heading level={4} color="secondary">Hours</Heading>
            <Text type="body" weight="medium">Mon - Fri: 9am - 6pm</Text>
            <Text type="body">Sat: 10am - 2pm</Text>
          </VStack>

          {/* Phone Block */}
          <VStack gap={1.5}>
            <Heading level={4} color="secondary">Phone</Heading>
            <Text type="body" weight="medium">(555) 123-4567</Text>
          </VStack>
        </Grid>

        {/* Call to Action */}
        <Link href="https://maps.google.com" isExternalLink isStandalone className="mt-8">
          Get directions
        </Link>
      </VStack>
    </Card>
  );
}

function FooterSection() {
  return (
    <VStack gap={8} p={6}>
      {/* Main content row: Branding (left) and Links Grid (right) */}
      <HStack justify="between" wrap="wrap" gap={{ base: 6, md: 10 }}>
        {/* Left Side: Logo/Branding VStack */}
        <VStack gap={2} maxW={{ base: '100%', md: 250 }}>
          <Heading level={3}>Petal & Stem</Heading>
          <Text type="supporting" color="secondary">Crafting beauty from nature's finest threads.</Text>
        </VStack>

        {/* Right Side: Link Columns Grid */}
        {/* Using minWidth ensures columns stack when space is limited (mobile) */}
        <Grid 
          columns={{ minWidth: 140 }} 
          gap={6} 
          align="start"
          maxW={{ base: '100%', md: 'auto' }} // Ensure it takes full width on mobile if needed
        >
          {/* Shop Column */}
          <VStack gap={2}>
            <Heading level={4}>Shop</Heading>
            <Link href="#shop-items/necklaces">Necklaces</Link>
            <Link href="#shop-items/earrings">Earrings</Link>
            <Link href="#shop-items/bracelets">Bracelets</Link>
          </VStack>

          {/* Company Column */}
          <VStack gap={2}>
            <Heading level={4}>Company</Heading>
            <Link href="#about-us">About Us</Link>
            <Link href="#contact">Contact</Link>
            <Link href="#careers">Careers</Link>
          </VStack>

          {/* Support Column */}
          <VStack gap={2}>
            <Heading level={4}>Support</Heading>
            <Link href="#faq">FAQ</Link>
            <Link href="#shipping-policy">Shipping</Link>
            <Link href="#returns-policy">Returns</Link>
          </VStack>
        </Grid>
      </HStack>

      {/* Divider */}
      <Divider variant="subtle" />

      {/* Copyright Text */}
      <Text type="supporting" color="secondary" mt={2}>© 2026 Petal & Stem. All rights reserved.</Text>
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
