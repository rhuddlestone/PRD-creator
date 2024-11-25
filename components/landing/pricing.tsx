import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out PRD Generator",
    features: [
      "3 PRDs per month",
      "Basic AI generation",
      "Export to Markdown",
      "Real-time editing",
    ],
    cta: "Get Started",
    href: "/dashboard"
  },
  {
    name: "Pro",
    price: "$19",
    description: "Ideal for product managers and developers",
    features: [
      "Unlimited PRDs",
      "Advanced AI generation",
      "Export to Markdown & PDF",
      "Real-time editing",
      "Version history",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: "/dashboard",
    featured: true
  }
];

export function Pricing() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that&apos;s right for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl bg-white p-8 shadow-sm border ${
                tier.featured ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              {tier.featured && (
                <span className="absolute top-0 -translate-y-1/2 bg-indigo-500 text-white px-3 py-0.5 text-sm font-semibold rounded-full">
                  Most Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground mb-4">{tier.description}</p>
                <p className="text-4xl font-bold">{tier.price}<span className="text-base font-normal text-muted-foreground">/month</span></p>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-indigo-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={tier.href} className="block">
                <Button
                  className={tier.featured ? 'bg-indigo-500 hover:bg-indigo-600 w-full' : 'w-full'}
                  variant={tier.featured ? 'default' : 'outline'}
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
