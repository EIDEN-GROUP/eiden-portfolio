import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | EIDEN Group" },
      {
        name: "description",
        content: "Privacy policy for EIDEN Group services.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-label text-3xl uppercase tracking-[0.2em] text-white">
          Privacy Policy
        </h1>
        <div className="mt-10 space-y-6 font-body text-sm leading-relaxed text-white/60">
          <p>Last updated: May 2026</p>
          <p>
            EIDEN Group is committed to protecting your privacy. This policy explains how we
            collect, use, and safeguard your information.
          </p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as name, email, and message content
            when you use our contact form.
          </p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">
            How We Use Information
          </h2>
          <p>
            Information is used solely to respond to inquiries, provide services, and improve our
            website experience.
          </p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">
            Data Sharing
          </h2>
          <p>We do not sell, trade, or transfer your personal information to third parties.</p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">Cookies</h2>
          <p>
            Our site may use essential cookies for functionality. No tracking or analytics cookies
            are used.
          </p>
          <h2 className="font-label text-lg uppercase tracking-[0.15em] text-white/80">Contact</h2>
          <p>For privacy inquiries, contact us through our website.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
