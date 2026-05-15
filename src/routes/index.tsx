import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { EidenDescription } from "@/components/site/EidenDescription";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EIDEN Group | Business Architecture" },
      {
        name: "description",
        content:
          "EIDEN Group is the MENA region's first Business Architecture firm. Headquartered in Morocco, working globally   architecture before advice, Hydra Analysis™, and transformation that ships.",
      },
      { property: "og:title", content: "EIDEN Group | Business Architecture" },
      {
        property: "og:description",
        content:
          "MENA's first Business Architecture firm. Morocco HQ, global engagements   map the fracture network, build the system, measure the outcome.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo-1.png" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <Hero />
      <EidenDescription />
      <Projects />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}
