const CDN = "https://cdn.prod.website-files.com/66387c0fa39192a87e403b2a";

export type Signal = {
  id: string;
  text: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
};

export const eidenStats = [
  { value: "27+", label: "Businesses" },
  { value: "43%", label: "Efficiency lift" },
  { value: "4", label: "Continents" },
  { value: "2025", label: "Founded" },
];

export const eidenTestimonials: Testimonial[] = [
  {
    id: "001",
    quote:
      "EIDEN didn't just give us a strategy. They mapped every fracture in our operations and gave us a blueprint we could actually build on. It changed how we see the business entirely.",
    author: "Karim Benali",
    location: "Casablanca",
  },
  {
    id: "002",
    quote:
      "Two hours of Hydra Analysis™ revealed structural issues we had been circling around for years. The clarity was immediate and the architecture they delivered was precise.",
    author: "Sara El Fassi",
    location: "Dubai",
  },
  {
    id: "003",
    quote:
      "What separates EIDEN is that they architect before they advise. No slides, no guesswork   just a rigorous system that actually holds under pressure.",
    author: "Omar Tahiri",
    location: "Riyadh",
  },
  {
    id: "004",
    quote:
      "We were scaling fast but something structural was off. EIDEN named it, mapped it, and built a system around it. Decisions became faster, priorities became clear.",
    author: "Nadia Chraibi",
    location: "Paris",
  },
  {
    id: "005",
    quote:
      "Their methodology is unlike anything we had encountered. It is not consulting   it is engineering applied to the business itself. The results spoke in weeks, not quarters.",
    author: "Youssef Azella",
    location: "Agadir",
  },
  {
    id: "006",
    quote:
      "The Hydra Analysis™ session was one of the most valuable two hours we have ever invested. EIDEN sees patterns in organisations that most people miss entirely.",
    author: "Leila Mansouri",
    location: "London",
  },
];

export const eidenSignals: Signal[] = [
  {
    id: "001",
    text: "Before we advise, we map. The Hydra Analysis™ reveals the fracture network the hidden structural points where operational systems collapse silently under growth.",
  },
  {
    id: "002",
    text: "Our methodology is not advisory. It is architecture. We define structure before strategy, systems before slides, blueprint before budget.",
  },
  {
    id: "003",
    text: "EIDEN was founded to fill a gap most businesses suffer from but few can name: the absence of business architecture at the operational level.",
  },
  {
    id: "004",
    text: "We work with teams who are scaling but feel something structural is off. Decisions slow. Priorities multiply. Clarity disappears. That is a fracture signal.",
  },
  {
    id: "005",
    text: "Every engagement begins with a Hydra Analysis™. Two focused hours to map the fracture network before recommending anything. No proposal before the map.",
  },
];

export const logoCompositionVideoPoster = `${CDN}/6960f195bfacd541ac6df62f_form_bg.webp`;

export type Story = {
  quote: string;
  author: string;
  role: string;
  initials: string;
  metrics: { value: string; label: string }[];
  featured?: boolean;
  image?: string;
};

export const successStories: Story[] = [];
