import { Download, Clipboard, MousePointer, ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Download,
    title: "Install ClipMate",
    desc: "Add ClipMate from the Chrome Web Store in one click. No account, no setup, no permissions beyond what's needed.",
  },
  {
    num: "02",
    icon: Clipboard,
    title: "Copy Like Normal",
    desc: "That's it. Every copy you make is silently captured and categorized. You don't change anything about how you work.",
  },
  {
    num: "03",
    icon: MousePointer,
    title: "Open the Popup When You Need It",
    desc: "Click the ClipMate icon in your Chrome toolbar. Your clips are there, categorized and searchable. Find what you need in seconds.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-surface/40 border-y border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            How it works
          </span>
          <h2 className="mt-3 font-display font-bold h2-fluid tracking-tight">
            Three steps. Then forget about it.
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-6 lg:gap-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="contents">
                <div
                  className="reveal rounded-2xl border border-border bg-surface p-6 md:p-7"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-3xl text-primary/40">
                      {s.num}
                    </span>
                    <div className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 text-primary border border-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:flex items-center justify-center text-muted-foreground/40"
                    aria-hidden
                  >
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
