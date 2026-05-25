import { Brain, ShieldAlert, Zap, Search, Layers, Lock } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "Smart Auto-Categorization",
    desc: "ClipMate reads what you copy and instantly tags it — code, links, JSON, emails, OTPs, or plain text. No manual sorting. No settings to configure.",
  },
  {
    icon: ShieldAlert,
    title: "Sensitive Data Protection",
    desc: "Copied an OTP or API key? ClipMate flags it immediately and auto-deletes it after 2 minutes. Your sensitive data doesn't hang around.",
  },
  {
    icon: Zap,
    title: "Captures Everything Silently",
    desc: "Works on every tab, every website, every copy. You don't change how you work — ClipMate just catches everything in the background.",
  },
  {
    icon: Search,
    title: "Instant Search",
    desc: "50 clips, searchable in real time. Find that JSON response from 10 minutes ago, that link you grabbed from a Slack message, that code snippet from Stack Overflow.",
  },
  {
    icon: Layers,
    title: "Bundle to Prompt",
    desc: "Select multiple clips and bundle them into a single block. Perfect for feeding context into ChatGPT, Claude, or Gemini without copying things one by one.",
  },
  {
    icon: Lock,
    title: "Stays on Your Device",
    desc: "Nothing is sent anywhere. ClipMate stores everything on your computer. No server, no sync, no account. Your clipboard history is yours alone.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            Features
          </span>
          <h2 className="mt-3 font-display font-bold h2-fluid tracking-tight">
            Everything your clipboard should be
          </h2>
          <p className="mt-4 body-fluid text-muted-foreground">
            Six things ClipMate does that your current clipboard doesn't.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="reveal rounded-xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary/40"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="grid place-items-center h-11 w-11 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
