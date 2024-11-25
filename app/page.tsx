import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <div className="min-h-full">
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}