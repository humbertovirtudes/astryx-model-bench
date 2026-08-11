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

/* __SECTIONS__ */

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
