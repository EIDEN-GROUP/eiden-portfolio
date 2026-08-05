import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { siteNavLinks } from "@/data/site-nav";
import { cn } from "@/lib/utils";

/* ── smooth-scroll helper ─────────────────────────────────── */
function useScrollTo() {
  const lenis = useLenis();
  return (hash: string, offset = -80) => {
    const el = document.getElementById(hash);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset, duration: 0.85 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
}

/* ── single nav link ──────────────────────────────────────── */
function NavAnchor({
  hash,
  label,
  className,
  onClick,
}: {
  hash: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const scrollTo = useScrollTo();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onClick?.();
    const isHome = pathname === "/" || pathname === "";
    if (isHome) {
      scrollTo(hash);
      return;
    }
    void navigate({ to: "/", hash });
    window.setTimeout(() => scrollTo(hash), 120);
  }

  return (
    <Link to="/" hash={hash} className={className} onClick={handleClick}>
      {label}
    </Link>
  );
}

/* ── main component ───────────────────────────────────────── */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 90));

  const close = () => setMobileOpen(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onViewportChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onViewportChange);
    onViewportChange();
    return () => mq.removeEventListener("change", onViewportChange);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
      >
        <div
          className={cn(
            "mx-auto flex w-full min-w-0 items-center justify-between px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-4 transition-all duration-500 sm:px-10 md:px-14",
            scrolled &&
              "bg-forest-deep/90 py-3 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.7)] backdrop-blur-xl",
          )}
        >
          {/* Logo */}
          <Link to="/" aria-label="EIDEN Group   home" className="shrink-0">
            <img
              src="/logo-1.png"
              alt="EIDEN Group"
              className="h-auto w-[clamp(5.5rem,22vw,7rem)]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {siteNavLinks.map((link) => (
              <NavAnchor
                key={link.hash}
                hash={link.hash}
                label={link.label}
                className="font-label text-[12px] uppercase tracking-[0.25em] text-white/90 font-bold transition-colors hover:text-white"
              />
            ))}
            <Link
              to="/projects"
              className="font-label text-[12px] font-bold uppercase tracking-[0.25em] text-white/90 transition-colors hover:text-white"
            >
              Projects
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-5">
            <NavAnchor
              hash="contact-form"
              label="Get in touch"
              className="hidden border border-gold/70 bg-gold px-6 py-2.5 font-label text-[11px] font-bold uppercase tracking-[0.22em] text-forest-deep shadow-sm transition-colors hover:border-gold hover:bg-gold-dark hover:text-forest-deep md:inline-flex md:items-center"
            />

            {/* Mobile burger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center text-white/65 transition-colors hover:text-white md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-[22px] w-[22px]" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "oklch(0.09 0.014 165 / 0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Top strip */}
            <div className="flex items-center justify-between px-6 py-5">
              <img
                src="/logo-1.png"
                alt="EIDEN"
                className="h-8 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <button
                type="button"
                onClick={close}
                className="grid h-10 w-10 place-items-center text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            {/* Links */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
                hidden: {},
              }}
              className="flex flex-1 flex-col justify-center px-8"
              aria-label="Mobile navigation"
            >
              {siteNavLinks.map((link) => (
                <motion.div
                  key={link.hash}
                  variants={{
                    hidden: { opacity: 0, x: -28 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="border-b border-white/[0.07] py-5"
                >
                  <NavAnchor
                    hash={link.hash}
                    label={link.label}
                    onClick={close}
                    className="block w-full text-left font-display text-[clamp(1.75rem,8vw,2.2rem)] font-semibold leading-none text-white/85 transition-colors hover:text-gold"
                  />
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -28 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="border-b border-white/[0.07] py-5"
              >
                <Link
                  to="/projects"
                  onClick={close}
                  className="block w-full text-left font-display text-[clamp(1.75rem,8vw,2.2rem)] font-semibold leading-none text-white/85 transition-colors hover:text-gold"
                >
                  Projects
                </Link>
              </motion.div>

              {/* Contact CTA */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -28 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="mt-10"
              >
                <NavAnchor
                  hash="contact-form"
                  label="Get in touch"
                  onClick={close}
                  className="inline-flex items-center gap-3 border border-gold/70 bg-gold px-7 py-3.5 font-label text-[11px] font-bold uppercase tracking-[0.32em] text-forest-deep shadow-sm transition-colors hover:border-gold hover:bg-gold-dark hover:text-forest-deep"
                />
              </motion.div>
            </motion.nav>

            {/* Bottom email */}
            <div className="px-8 py-8">
              <p className="font-label text-[9px] uppercase tracking-[0.42em] text-white/28">
                Inquiries
              </p>
              <a
                href="mailto:contact@eiden-group.com"
                className="mt-1.5 block font-editorial text-sm italic text-white/50 transition-colors hover:text-white"
              >
                contact@eiden-group.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
