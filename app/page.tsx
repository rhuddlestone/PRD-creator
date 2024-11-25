import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <main className="relative min-h-full">
      <div className="relative z-50">
        <Hero />
      </div>
      <Features />
      <Testimonials />
      <CTA />
    </main>
  );
}