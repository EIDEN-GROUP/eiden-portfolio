import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Form schema ───────────────────────────────────────────── */
const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
});

const step2Schema = z.object({
  headcount: z.enum(["0-10", "10-50", "50-200", "200+"], {
    required_error: "Please select a company headcount range",
  }),
  idea: z.string().min(15, "Please tell us a bit more (min 15 characters)"),
});

const fullSchema = step1Schema.merge(step2Schema);
type FormValues = z.infer<typeof fullSchema>;
type FormStep = "step1" | "step2" | "success";

const HEADCOUNT_OPTIONS = [
  { value: "0-10", label: "0-10" },
  { value: "10-50", label: "10-50" },
  { value: "50-200", label: "50-200" },
  { value: "200+", label: "+200" },
] as const;

/* ── Input styles ──────────────────────────────────────────── */
function inputCls(hasError: boolean) {
  return cn(
    "w-full border bg-white px-4 py-3.5 font-body text-sm text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-gold/55 focus:ring-1 focus:ring-gold/25",
    hasError ? "border-red-400/70" : "border-stone-200",
  );
}

/* ── Field wrapper ─────────────────────────────────────────── */
function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-label text-[9px] uppercase tracking-[0.4em] text-stone-500">
        {label}
        {required && <span className="ml-1 text-gold-dark">*</span>}
      </label>
      {children}
      {error && <p className="font-body text-[11px] text-red-400/80">{error}</p>}
    </div>
  );
}

/* ── Multi-step form (inline section   no modal) ───────────── */
export function ContactForm({ onClose }: { onClose?: () => void }) {
  const [formStep, setFormStep] = useState<FormStep>("step1");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    defaultValues: { name: "", email: "", company: "", idea: "" },
    mode: "onTouched",
  });

  async function handleStep1() {
    const ok = await trigger(["name", "email"]);
    if (ok) setFormStep("step2");
  }

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
    } catch {
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company ?? "N/A"}\nHeadcount: ${data.headcount}\n\n${data.idea}`,
      );
      window.open(
        `mailto:contact@eiden-group.com?subject=Hydra Scan™ Inquiry   ${data.name}&body=${body}`,
        "_blank",
      );
    } finally {
      setSubmitting(false);
      setFormStep("success");
    }
  }

  function restart() {
    reset();
    setFormStep("step1");
  }

  const selectedHeadcount = watch("headcount");

  return (
    <div className="flex flex-col gap-8 px-5 py-7 sm:px-9 sm:py-9">
      <AnimatePresence mode="wait">
        {formStep === "step1" && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.38, ease }}
            className="flex flex-col gap-7"
          >
            <div>
              <div className="mb-1.5 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
                <p className="font-label text-[9px] uppercase tracking-[0.46em] text-gold-dark/90">
                  Step 1 / 2
                </p>
              </div>
              <p className="font-editorial text-base italic leading-snug text-stone-600">
                A few details to get started
              </p>
            </div>

            <FormField label="Your name" error={errors.name?.message} required>
              <input
                {...register("name")}
                placeholder="Your name"
                className={inputCls(!!errors.name)}
              />
            </FormField>

            <FormField label="Email address" error={errors.email?.message} required>
              <input
                {...register("email")}
                type="email"
                placeholder="you@company.com"
                className={inputCls(!!errors.email)}
              />
            </FormField>

            <FormField label="Company / Organisation">
              <input {...register("company")} placeholder="Optional" className={inputCls(false)} />
            </FormField>

            <button
              type="button"
              onClick={handleStep1}
              className="mt-1 w-full rounded-full bg-gold py-4 font-label text-[11px] uppercase tracking-[0.4em] text-forest-deep transition-opacity hover:opacity-85 active:scale-[0.98]"
            >
              Continue →
            </button>
          </motion.div>
        )}

        {formStep === "step2" && (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.38, ease }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setFormStep("step1")}
                className="flex items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.34em] text-stone-500 transition-colors hover:text-stone-800"
              >
                <ChevronLeft className="h-3 w-3" />
                Back
              </button>
              <div className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold/40" />
                <p className="font-label text-[9px] uppercase tracking-[0.46em] text-gold-dark/90">
                  Step 2 / 2
                </p>
              </div>
            </div>

            <div>
              <p className="font-editorial text-base italic leading-snug text-stone-600">
                Almost there a few more details
              </p>
            </div>

            <FormField label="Company headcount" error={errors.headcount?.message} required>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {HEADCOUNT_OPTIONS.map(({ value, label }) => {
                  const selected = selectedHeadcount === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setValue("headcount", value, { shouldValidate: true })}
                      className={cn(
                        "flex h-10 items-center justify-center rounded-sm border-2 px-2 text-xs font-display font-semibold transition-all duration-200 sm:h-11 sm:text-sm",
                        selected
                          ? "border-gold bg-gold text-forest-deep ring-2 ring-gold"
                          : "border-white/15 bg-white/[0.03] text-white/40 hover:border-white/30 hover:bg-white/[0.06] hover:text-white/65",
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </FormField>

            <FormField label="Your project brief" error={errors.idea?.message} required>
              <textarea
                {...register("idea")}
                rows={4}
                placeholder="Tell us about your organisation, the challenge you're facing, and what you want to achieve."
                className={cn(inputCls(!!errors.idea), "resize-none")}
              />
            </FormField>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 w-full rounded-full bg-gold py-4 font-label text-[11px] uppercase tracking-[0.4em] text-forest-deep transition-all hover:opacity-85 active:scale-[0.98] disabled:opacity-40"
            >
              {submitting ? "Sending…" : "Send request →"}
            </button>
          </motion.form>
        )}

        {formStep === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col items-center gap-5 py-12 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <CheckCircle className="h-8 w-8 text-gold-dark" strokeWidth={1.25} />
            </div>
            <h3
              className="font-hero font-bold tracking-[-0.03em] text-forest-deep"
              style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)" }}
            >
              Request received.
            </h3>
            <p className="max-w-[26ch] font-editorial text-sm italic leading-relaxed text-stone-600">
              We&apos;ll review your brief and reach out within one business day to confirm your
              Hydra Analysis™ session.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={restart}
                className="font-label text-[9px] uppercase tracking-[0.4em] text-stone-400 transition-colors hover:text-stone-700"
              >
                Start over
              </button>
              {onClose && (
                <>
                  <span className="text-stone-300">·</span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-label text-[9px] uppercase tracking-[0.4em] text-stone-400 transition-colors hover:text-stone-700"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
