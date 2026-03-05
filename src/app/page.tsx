export const dynamic = 'force-dynamic';

import Hero from "@/components/home/Hero";
import OurStory from "@/components/home/OurStory";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <OurStory />
    </>
  );
}
