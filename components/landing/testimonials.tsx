import Image from "next/image";

const testimonials = [
  {
    quote: "PRD Generator has transformed how we document our project requirements. What used to take days now takes minutes.",
    author: "Sarah Chen",
    title: "Product Manager at TechCorp",
    image: "/avatars/avatar-1.png"
  },
  {
    quote: "The AI-powered suggestions are incredibly accurate and help us consider aspects we might have otherwise missed.",
    author: "Michael Rodriguez",
    title: "Lead Developer at StartupX",
    image: "/avatars/avatar-2.png"
  },
  {
    quote: "This tool has streamlined our entire product development process. The export options make sharing with stakeholders a breeze.",
    author: "Emily Thompson",
    title: "Product Owner at InnovateCo",
    image: "/avatars/avatar-3.png"
  }
];

export function Testimonials() {
  return (
    <div className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Loved by product teams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border"
            >
              <div className="flex flex-col h-full">
                <blockquote className="flex-1 mb-8">
                  <p className="text-lg text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
