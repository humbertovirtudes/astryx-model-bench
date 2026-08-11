import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Link} from '@astryxdesign/core/Link';
import {useState} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Theme theme={neutralTheme}>
      <HStack justify="center">
        <VStack maxWidth={1100} spacing={8}>
          
          {/* Header */}
          <HStack justify="space-between" spacing={4}>
            <Heading level={2}>Petal & Stem</Heading>
            <Button 
              label={`Cart (${cartCount})`}
              variant="primary"
              size="sm"
              onClick={() => setCartCount(c => c + 1)}
            />
          </HStack>

          {/* Hero */}
          <VStack hAlign="center" spacing={8}>
            <Heading level={1}>Welcome to Petal & Stem</Heading>
            <Text type="large">Fresh flowers, hand‑picked for your home</Text>
            <Button 
              label="Shop Now"
              variant="primary"
              size="lg"
              onClick={() => {}}
            />
          </VStack>

          {/* Featured Bouquets */}
          <Heading level={2}>Featured Bouquets</Heading>
          <Grid columns={{minWidth: 280}} gap={4}>
            {/* Rose */}
            <Card variant="pink" padding={4}>
              <Heading level={3}>Rose Bouquet</Heading>
              <Text type="supporting">A classic mix of red and white roses.</Text>
              <Text weight="bold">$45</Text>
              <Badge variant="success" label="Bestseller" />
              <Button 
                label="Add to Cart"
                size="sm"
                variant="primary"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Peony */}
            <Card variant="purple" padding={4}>
              <Heading level={3}>Peony Bouquet</Heading>
              <Text type="supporting">Soft pink peonies with lush green foliage.</Text>
              <Text weight="bold">$55</Text>
              <Button 
                label="Add to Cart"
                size="sm"
                variant="primary"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Tulip */}
            <Card variant="yellow" padding={4}>
              <Heading level={3}>Tulip Bouquet</Heading>
              <Text type="supporting">Bright yellow tulips for a cheerful vibe.</Text>
              <Text weight="bold">$40</Text>
              <Button 
                label="Add to Cart"
                size="sm"
                variant="primary"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Sunflower */}
            <Card variant="yellow" padding={4}>
              <Heading level={3}>Sunflower Bouquet</Heading>
              <Text type="supporting">Golden sunflowers radiating warmth.</Text>
              <Text weight="bold">$50</Text>
              <Badge variant="warning" label="Seasonal" />
              <Button 
                label="Add to Cart"
                size="sm"
                variant="primary"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Orchid */}
            <Card variant="teal" padding={4}>
              <Heading level={3}>Orchid Arrangement</Heading>
              <Text type="supporting">Elegant orchids in a sleek display.</Text>
              <Text weight="bold">$70</Text>
              <Button 
                label="Add to Cart"
                size="sm"
                variant="primary"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>

            {/* Wildflower */}
            <Card variant="green" padding={4}>
              <Heading level={3}>Wildflower Mix</Heading>
              <Text type="supporting">A rustic blend of meadow flowers.</Text>
              <Text weight="bold">$60</Text>
              <Button 
                label="Add to Cart"
                size="sm"
                variant="primary"
                onClick={() => setCartCount(c => c + 1)}
              />
            </Card>
          </Grid>

          {/* About */}
          <Heading level={2}>About Us</Heading>
          <Text type="body" weight="normal">
            At Petal & Stem we source only the freshest, locally‑grown flowers.
          </Text>
          <Text type="body" weight="normal">
            Our commitment to sustainability ensures every bouquet supports local growers.
          </Text>

          {/* Visit Us */}
          <Card variant="muted" padding={4}>
            <HStack spacing={4}>
              <Heading level={4}>Address</Heading>
              <Text>123 Blossom Lane, City</Text>
            </HStack>
            <HStack spacing={4}>
              <Heading level={4}>Hours</Heading>
              <Text>Mon‑Fri 9am‑6pm, Sat 10am‑4pm</Text>
            </HStack>
            <HStack spacing={4}>
              <Heading level={4}>Phone</Heading>
              <Text>(555) 123‑4567</Text>
            </HStack>
            <Link href="#" isStandalone={true}>
              <Text>Get Directions</Text>
            </Link>
          </Card>

          {/* Footer */}
          <HStack justify="center" spacing={8}>
            <Heading level={2}>Petal & Stem</Heading>
            <Text type="supporting">Growing beauty, one stem at a time.</Text>
          </HStack>

        </VStack>
      </HStack>
    </Theme>
  );
}