import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Badge } from '@astryxdesign/core/Badge';
import { Divider } from '@astryxdesign/core/Divider';
import { Link } from '@astryxdesign/core/Link';
import { useState, useCallback } from 'react';

// Define a type for the bouquet data structure (optional but good practice)
interface Bouquet {
  name: string;
  description: string;
  price: number;
  badgeVariant?: 'success' | 'warning';
  cardColor: 'pink' | 'green' | 'yellow' | 'purple' | 'cyan';
}

const featuredBouquets: Bouquet[] = [
  { name: "Romantic Rose Dream", description: "Velvety red and blush roses for timeless romance.", price: 79.0, cardColor: 'pink', badgeVariant: 'success' },
  { name: "Meadow Fresh Mix", description: "A vibrant blend of seasonal wildflowers.", price: 55.0, cardColor: 'green' },
  { name: "Sunshine Burst", description: "Bright yellow sunflowers and cheerful accents.", price: 62.0, cardColor: 'yellow', badgeVariant: 'warning' },
  { name: "Royal Orchid Splendor", description: "Exotic purple orchids for sophisticated elegance.", price: 95.0, cardColor: 'purple' },
  { name: "Coastal Bloom", description: "Teal and white blooms inspired by the ocean tide.", price: 72.0, cardColor: 'cyan' },
  { name: "Peony Delight Bouquet", description: "Full-bodied peonies in delicate shades.", price: 85.0, cardColor: 'pink', badgeVariant: 'success' },
];

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  // Use useCallback for stable function reference
  const handleAddToCart = useCallback(() => {
    setCartCount((prev) => prev + 1);
    console.log("Item added to cart!");
  }, []);

  return (
    <Theme theme={neutralTheme}>
      {/* Outer wrapper for centering content and providing max width */}
      <VStack className="min-h-screen" paddingBottom={8} gap={0}>
        <div style={{ maxWidth: 1100, width: '100%' }}>
          
          {/* 1. Header Row */}
          <HStack gap={5} padding={4} alignItems="center">
            <Heading level={2} color="primary" children="Petal & Stem" />
            {/* Cart Indicator Button */}
            <Button 
              label={`Cart (${cartCount})`} 
              variant="secondary" 
              size="md" 
              onClick={() => {}} // Placeholder action
            />
          </HStack>

          {/* Main Content Container (Centered) */}
          <VStack gap={10} paddingBottom={8}>
            
            {/* 2. Hero Section */}
            <VStack gap={3} alignItems="center" textAlignment="center">
              <Heading level={1} type="display-1" color="primary" children="Where Nature Meets Art." />
              <Text type="large" weight="medium" color="secondary" children="Handcrafted bouquets celebrating life's most beautiful moments." />
              <Button 
                label="Shop Our Collections" 
                variant="primary" 
                size="lg" 
                onClick={() => {}}
              />
            </VStack>

            {/* Divider */}
            <Divider orientation="horizontal" variant="subtle" />


            {/* 3. Featured Bouquets Grid */}
            <VStack gap={4}>
              <Heading level={2} color="primary" children="Featured Collections" />
              <Grid 
                columns={{ minWidth: 280 }} 
                gap={4} 
                rowGap={6}
              >
                {featuredBouquets.map((bouquet, index) => (
                  <Card key={index} variant={`variant-${bouquet.cardColor}`} padding={4}>
                    <VStack gap={3}>
                      {/* Bouquet Name */}
                      <Heading level={3} color="primary" children={bouquet.name} />
                      
                      {/* Badge */}
                      {bouquet.badgeVariant && (
                        <Badge 
                          variant={bouquet.badgeVariant === 'success' ? 'green' : 'warning'} 
                          label={bouquet.badgeVariant === 'success' ? "Bestseller" : "Seasonal"} 
                        />
                      )}

                      {/* Description */}
                      <Text type="supporting" color="secondary" children={bouquet.description} />
                      
                      {/* Price and Add to Cart Row (HStack) */}
                      <HStack gap={3} justifyContent="space-between" alignItems="flex-end">
                        <Text weight="bold" color="primary" children={`$${bouquet.price.toFixed(1)}`} />
                        <Button 
                          label="Add to Cart" 
                          variant="primary" 
                          size="sm" 
                          onClick={handleAddToCart} 
                          icon={<>🛒</>} // Using an emoji as a simple icon placeholder
                        />
                      </HStack>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>

            {/* Divider */}
            <Divider orientation="horizontal" variant="subtle" />


            {/* 4. About Section */}
            <VStack gap={3} paddingBottom={8}>
              <Heading level={2} color="primary" children="Our Promise to You." />
              <Text type="body" weight="medium" color="secondary" children="At Petal & Stem, we believe that flowers are more than just decoration—they are messengers. We curate every bouquet with care and intention, making sure your sentiment is delivered perfectly." />
              <Divider orientation="horizontal" variant="subtle" />
              <Text type="body" color="secondary" children="We specialize in fresh, locally-sourced blooms. By partnering directly with regional farms, we ensure that every petal retains its natural vibrancy and longevity, bringing the freshest touch of nature to your home." />
            </VStack>

            {/* 5. Visit Us Section */}
            <Card variant="default" padding={6}>
              <VStack gap={3}>
                <Heading level={2} color="primary" children="Visit Our Shop" />
                <Divider orientation="horizontal" variant="subtle" />

                {/* Address */}
                <VStack gap={1} alignItems="flex-start">
                    <Heading level={4} color="secondary" children="Location" />
                    <Text type="body" color="supporting" children="123 Floral Lane, Bloom City, ST 90210" />
                </VStack>

                {/* Hours */}
                <VStack gap={1} alignItems="flex-start">
                    <Heading level={4} color="secondary" children="Hours" />
                    <Text type="body" color="supporting" children="Mon - Sat: 10:00 AM - 6:00 PM | Sun: 12:00 PM - 5:00 PM" />
                </VStack>

                {/* Phone */}
                <VStack gap={1} alignItems="flex-start">
                    <Heading level={4} color="secondary" children="Phone" />
                    <Text type="body" color="supporting" children="(555) 123-STEM" />
                </VStack>

                {/* Get Directions Link */}
                <Link href="#" isStandalone={true} onClick={() => {}}>
                  Get Directions (Google Maps)
                </Link>
              </VStack>
            </Card>
          </VStack>


          {/* 6. Footer */}
          <VStack gap={1} paddingBottom={8}>
            <Heading level={2} color="primary" children="Petal & Stem" />
            <Text type="supporting" color="secondary">Handcrafted bouquets celebrating life's most beautiful moments.</Text>
          </VStack>

        </div>
      </VStack>
    </Theme>
  );
};

export default App;