import { 
  Bot, 
  FileEdit, 
  FileDown, 
  Zap, 
  Clock, 
  RefreshCw 
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Generation",
    description: "Harness advanced AI to transform basic project details into comprehensive PRDs instantly."
  },
  {
    icon: FileEdit,
    title: "Real-time Editing",
    description: "Edit and refine your PRDs in real-time with our intuitive Markdown editor."
  },
  {
    icon: FileDown,
    title: "Export Options",
    description: "Export your PRDs in multiple formats including Markdown and PDF for easy sharing."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete PRDs in minutes, not hours. Save time without sacrificing quality."
  },
  {
    icon: Clock,
    title: "Version History",
    description: "Track changes and maintain version history of your PRDs for better collaboration."
  },
  {
    icon: RefreshCw,
    title: "Iterative Refinement",
    description: "Continuously improve your PRDs with AI-assisted suggestions and refinements."
  }
];

export function Features() {
  return (
    <div id="features" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Everything you need to create perfect PRDs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
