import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | EIDEN Group" },
      {
        name: "description",
        content: "Terms and conditions for EIDEN Group services.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-label text-3xl uppercase tracking-[0.2em] text-white">
          Terms & Conditions
        </h1>
        <div className="mt-10 space-y-6 font-body text-sm leading-relaxed text-white/60">
          <p>Last updated: May 2026</p>
          <p>
            By accessing or using EIDEN Group's services, you agree to be bound by these terms. If
            you disagree with any part, do not use our services.
          </p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">Services</h2>
          <p>
            EIDEN Group provides business architecture, design, and technology consulting services.
            All deliverables are subject to the terms outlined in individual client agreements.
          </p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">
            Intellectual Property
          </h2>
          <p>
            All content, frameworks, and materials on this site are the intellectual property of
            EIDEN Group unless otherwise noted.
          </p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">
            Limitation of Liability
          </h2>
          <p>
            EIDEN Group shall not be liable for any indirect, incidental, or consequential damages
            arising from the use of our services.
          </p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">Contact</h2>
          <p>For questions about these terms, contact us through our website.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
