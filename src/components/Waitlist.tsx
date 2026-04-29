import { useEffect, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "clipmate-waitlist";
const CONFIRMED_KEY = "clipmate-waitlist-confirmed";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Enter your email" })
  .email({ message: "Enter a valid email" })
  .max(255, { message: "Email is too long" });

export const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONFIRMED_KEY) === "true") {
        setSubmitted(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0].message);
      setShake(true);
      window.setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const normalized = result.data.toLowerCase();
      if (!list.includes(normalized)) {
        list.push(normalized);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
      localStorage.setItem(CONFIRMED_KEY, "true");
    } catch {
      // ignore storage failures
    }

    setError(null);
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative py-24 md:py-32 overflow-hidden">
      {/* Radial violet glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, hsl(var(--primary) / 0.18), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)",
        }}
      />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Launch updates
          </span>
          <h2 className="mt-5 font-display font-bold h2-fluid tracking-tight">
            Get notified at <span className="text-gradient">launch</span>
          </h2>
          <p className="mt-5 body-fluid text-muted-foreground leading-relaxed max-w-xl mx-auto">
            We will email you when ClipMate is available on the Chrome Web Store. No marketing
            drip—one message when the extension ships, unless you opt in to more later.
          </p>

          <div className="mt-10">
            {submitted ? (
              <div
                className="mx-auto inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-medium text-foreground animate-slide-up-fade"
                role="status"
              >
                <span className="grid place-items-center h-6 w-6 rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                You are on the list. We will email you at launch.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mx-auto max-w-md"
              >
                <div
                  className={cn(
                    "flex items-stretch rounded-full border bg-surface/80 backdrop-blur-sm transition-colors",
                    error
                      ? "border-destructive"
                      : "border-border focus-within:border-primary",
                    shake && "animate-shake"
                  )}
                >
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={255}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="name@company.com"
                    aria-label="Email address"
                    aria-invalid={!!error}
                    className="flex-1 min-w-0 bg-transparent px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none rounded-l-full"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-r-full bg-primary px-5 sm:px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-glow"
                  >
                    Notify me
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <p
                  className={cn(
                    "mt-3 text-xs min-h-[2.5rem] text-left sm:text-center",
                    error ? "text-destructive" : "text-muted-foreground"
                  )}
                  aria-live="polite"
                >
                  {error ?? (
                    <>
                      No spam. One launch email by default. Demo builds store the address in this
                      browser only—wire your form to your provider before production.
                    </>
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
