import {
  VStack,
  HStack,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutFooter,
} from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Card } from "@astryxdesign/core/Card";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Badge } from "@astryxdesign/core/Badge";
import { Divider } from "@astryxdesign/core/Divider";
import { Link } from "@astryxdesign/core/Link";
import { Icon } from "@astryxdesign/core/Icon";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import { useState } from "react";

const imageFill = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
} as const;

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [cartCount, setCartCount] = useState<number>(0);
  const [newsletter, setNewsletter] = useState<string>("");

  const items = [
    {
      id: 1,
      imgUrl: `https://picsum.photos/seed/${Date.now()}-1/800/600`,
      title: "Mountain Sunrise",
      description:
        "A breathtaking view of the sun rising over misty peaks, casting golden light across the valley.",
    },
    {
      id: 2,
      imgUrl: `https://picsum.photos/seed/${Date.now()}-2/800/600`,
      title: "Coastal Cliffs",
      description:
        "Dramatic cliffs overlook a turquoise sea, with waves crashing against the rugged shoreline.",
    },
    {
      id: 3,
      imgUrl: `https://picsum.photos/seed/${Date.now()}-3/800/600`,
      title: "Forest Path",
      description:
        "A winding trail through dense woodland, dappled with sunlight filtering through the canopy.",
    },
    {
      id: 4,
      imgUrl: `https://picsum.photos/seed/${Date.now()}-4/800/600`,
      title: "Desert Dunes",
      description:
        "Golden sands stretch to the horizon under a clear sky, capturing the serene vastness of the desert.",
    },
    {
      id: 5,
      imgUrl: `https://picsum.photos/seed/${Date.now()}-5/800/600`,
      title: "Urban Skyline",
      description:
        "A modern cityscape at dusk, with illuminated buildings reflecting the fading light.",
    },
    {
      id: 6,
      imgUrl: `https://picsum.photos/seed/${Date.now()}-6/800/600`,
      title: "Wildlife Close‑up",
      description:
        "An intimate portrait of a curious fox in its natural habitat, eyes focused and alert.",
    },
  ];

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <Layout>
        {/* Header */}
        <LayoutHeader padding={4}>
          <HStack align="center" gap={6}>
            {/* Logo */}
            <Text type="display-3" weight="bold">
              Blooming Beautifully
            </Text>

            {/* Navigation links */}
            <VStack spacing={2}>
              <Text type="body" weight="medium">Home</Text>
              <Text type="body" weight="medium">Shop</Text>
              <Text type="body" weight="medium">About</Text>
            </VStack>

            {/* Cart & Theme toggle */}
            <HStack align="end" gap={6}>
              <Button
                label={`Cart (${cartCount})`}
                variant="ghost"
                size="sm"
                onClick={() => setCartCount((c) => c + 1)}
              />
              <Button
                label={mode === "light" ? "Dark" : "Light"}
                variant="ghost"
                size="sm"
                onClick={() =>
                  setMode((m) => (m === "light" ? "dark" : "light"))
                }
              />
            </HStack>
          </HStack>
        </LayoutHeader>

        {/* Hero */}
        <LayoutContent padding={10}>
          <VStack gap={8} align="center">
            <Heading level={1}>Blooming Beautifully</Heading>
            <Text type="large" color="secondary" maxLines={2}>
              Discover the beauty of nature through our curated collection of stunning photographs.
              Each image captures a moment of serenity, adventure, and wonder.
            </Text>

            {/* Hero Image */}
            <Card padding={0}>
              <AspectRatio ratio={4 / 3}>
                <img
                  src={`https://picsum.photos/seed/${Date.now()}/1200/800`}
                  alt="Mountain landscape"
                  style={imageFill}
                />
              </AspectRatio>
            </Card>

            <Button
              label="Explore Gallery"
              variant="primary"
              size="lg"
              onClick={() => {}}
            />
          </VStack>
        </LayoutContent>

        {/* Featured Items */}
        <LayoutContent padding={10}>
          <Heading level={2}>Featured Items</Heading>
          <Grid columns={{ minWidth: 600 }} gap={8}>
            {items.map((item) => (
              <Card key={item.id} variant="default" width={300}>
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    style={imageFill}
                  />
                </AspectRatio>

                <Text type="body" weight="semibold" color="primary" maxLines={1}>
                  {item.title}
                </Text>
                <Text type="supporting" color="secondary" maxLines={2}>
                  {item.description}
                </Text>

                {/* Button */}
                <Button
                  label="Read More"
                  variant="secondary"
                  size="sm"
                  onClick={() => {}}
                />
              </Card>
            ))}
          </Grid>
        </LayoutContent>

        {/* Why Choose Us */}
        <LayoutContent padding={10}>
          <Heading level={2}>Why Choose Us</Heading>
          <Divide orientation="horizontal" variant="subtle" />
          <VStack gap={6} align="start">
            <HStack spacing={4}>
              <Text type="body" weight="semibold">Quality Imagery</Text>
              <Text type="supporting">
                Our photos are captured in high resolution, ensuring crisp detail on any device.
              </Text>
            </HStack>

            <HStack spacing={4}>
              <Text type="body" weight="semibold">Fast Delivery</Text>
              <Text type="supporting">
                Digital downloads are instant, so you can start enjoying your new wall art right away.
              </Text>
            </HStack>

            <HStack spacing={4}>
              <Text type="body" weight="semibold">Customer Support</Text>
              <Text type="supporting">
                Friendly support team available 24/7 to answer any questions.
              </Text>
            </HStack>
          </VStack>
        </LayoutContent>

        {/* Our Services */}
        <LayoutContent padding={10}>
          <Heading level={2}>Our Services</Heading>
          <Grid columns={{ minWidth: 600 }} gap={8}>
            {[
              {
                title: "Custom Sizing",
                desc: "We offer tailored dimensions to fit your space.",
              },
              {
                title: "Print Options",
                desc: "Choose from matte, glossy, canvas, and more.",
              },
              {
                title: "Gift Wrapping",
                desc: "Perfect for gifting, with premium packaging.",
              },
            ].map((svc, i) => (
              <Card key={i} variant="muted" width={250}>
                <Text type="body" weight="semibold">{svc.title}</Text>
                <Text type="supporting">{svc.desc}</Text>
              </Card>
            ))}
          </Grid>
        </LayoutContent>

        {/* Testimonials */}
        <LayoutContent padding={10}>
          <Heading level={2}>What Our Customers Say</Heading>
          <Divide orientation="horizontal" variant="subtle" />
          <VStack gap={6}>
            <HStack spacing={4}>
              <Text type="body" weight="semibold">
                “Incredible quality and beautiful colors!” – Jane D.
              </Text>
              <Text type="supporting">
                The print arrived perfectly packaged and the colors are vibrant.
              </Text>
            </HStack>

            <HStack spacing={4}>
              <Text type="body" weight="semibold">“Easy ordering process.” – Mark S.</Text>
              <Text type="supporting">
                Simple checkout and fast shipping made my experience delightful.
              </Text>
            </HStack>
          </VStack>
        </LayoutContent>

        {/* Footer */}
        <LayoutFooter padding={10}>
          <Divide orientation="horizontal" variant="subtle" />
          <HStack spacing={4} align="center">
            <Text type="body">
              © 2025 Blooming Beautifully. All rights reserved.
            </Text>
            <Link href="https://example.com/privacy" isStandalone>
              Privacy Policy
            </Link>
            <Link href="https://example.com/terms" isStandalone>
              Terms of Service
            </Link>
          </HStack>
        </LayoutFooter>
      </Layout>
    </Theme>
  );
}