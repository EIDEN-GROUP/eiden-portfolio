import { Link } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import { eidenClients } from "@/data/clients";
import { siteNavLinks } from "@/data/site-nav";
import { useLenis } from "lenis/react";

/* ── Custom SVG icons ──────────────────────────────────────── */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z" />
    </svg>
  );
}

/* ── scroll helper ─────────────────────────────────────────── */
function useScrollTo() {
  const lenis = useLenis();
  return (hash: string) => {
    const el = document.getElementById(hash);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 0.85 });
    else el.scrollIntoView({ behavior: "smooth" });
  };
}

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/eiden-group/posts/?feedView=all",
    Icon: LinkedInIcon,
  },
  { label: "Instagram", href: "https://www.instagram.com/eiden.group/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/eiden.group/", Icon: FacebookIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@eiden.group", Icon: TikTokIcon },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ClientSwiperLogo({ name, logo }: { name: string; logo: string }) {
  if (name === "Eiden Academy") {
    return (
      <div
        role="img"
        aria-label={name}
        className="h-14 w-[4.25rem] shrink-0 bg-white"
        style={{
          maskImage: `url(${logo})`,
          WebkitMaskImage: `url(${logo})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      className="h-12 w-auto object-contain transition-opacity duration-300"
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}

export function Footer() {
  const scrollTo = useScrollTo();

  return (
    <footer
      id="footer"
      className="relative overflow-x-clip"
      style={{ background: "oklch(0.07 0.012 165)" }}
    >
      <div className="h-px w-full bg-white/[0.07]" />

      {/* ── Wordmark + columns ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="flex flex-col gap-12 border-b border-white/[0.07] px-[max(1rem,env(safe-area-inset-left))] py-12 pr-[max(1rem,env(safe-area-inset-right))] sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-20 lg:py-16"
      >
        {/* Logo + gold dot */}
        <Link
          to="/"
          aria-label="EIDEN Group   home"
          className="inline-flex shrink-0 items-end gap-1 self-start sm:gap-1.5"
        >
          <img
            src="/logo-1.png"
            alt=""
            className="h-[clamp(4rem,min(18vw,15rem),11rem)] w-auto max-w-[min(96vw,34rem)] object-contain object-left-bottom"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="font-hero translate-y-[0.06em] text-[clamp(2.75rem,min(12vw,9rem),9rem)] font-bold leading-none text-gold">
            .
          </span>
        </Link>

        {/* Columns */}
        <div className="grid w-full grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:max-w-xl lg:grid-cols-3 lg:gap-x-16">
          {/* Navigation */}
          <div>
            <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.5em] text-white/28">
              Navigation
            </p>
            <ul className="space-y-4">
              {siteNavLinks.map((link) => (
                <li key={link.hash}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.hash)}
                    className="font-body text-[0.92rem] text-white/45 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <div>
              <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.5em] text-white/28">
                Contact
              </p>
              <a
                href="mailto:contact@eiden-group.com"
                className="block font-body text-[0.92rem] text-white/45 transition-colors hover:text-white"
              >
                contact@eiden-group.com
              </a>
              <p className="mt-3 font-body text-[0.92rem] leading-relaxed text-white/28">
                Agadir Bay, Morocco
                <br />
                Operating globally
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.5em] text-white/28">
              Social
            </p>
            <ul className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-white/40 transition-all hover:border-gold/40 hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ── Clients logo swiper ── */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={80}
        loop={true}
        speed={4000}
        freeMode={true}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        className="clients-swiper select-none"
      >
        {[...eidenClients, ...eidenClients, ...eidenClients].map((client, i) => {
          return (
            <SwiperSlide key={i} className="!w-auto">
              <div className="flex h-18 items-center px-4">
                <ClientSwiperLogo name={client.name} logo={client.logo} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col gap-4 px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-12 lg:px-20">
        <p className="font-mono text-[9px] uppercase tracking-[0.38em] text-white/22 sm:tracking-[0.5em]">
          © {new Date().getFullYear()} EIDEN Group · All rights reserved
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            to="/terms-conditions"
            className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/22 transition-colors hover:text-white/50"
          >
            Terms
          </Link>
          <span className="text-white/15">·</span>
          <Link
            to="/privacy-policy"
            className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/22 transition-colors hover:text-white/50"
          >
            Privacy
          </Link>
          <span className="text-white/15">·</span>
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/22">
            Architected with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
