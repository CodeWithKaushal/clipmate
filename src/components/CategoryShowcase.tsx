import { useEffect, useState } from "react";

type Category = {
  name: string;
  badge: string;
  dot: string;
  example: string;
  detect: string;
  withTimer?: boolean;
};

const CATEGORIES: Category[] = [
  {
    name: "CODE",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    dot: "bg-blue-500",
    example: "const apiKey = process.env.SECRET_KEY",
    detect: "Detected: functions, imports, variables, syntax patterns",
  },
  {
    name: "SENSITIVE",
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    dot: "bg-red-500",
    example: "OTP: 847291",
    detect: "Detected: OTPs, API keys, tokens, passwords",
    withTimer: true,
  },
  {
    name: "LINK",
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    dot: "bg-violet-500",
    example: "https://figma.com/file/abc123/design",
    detect: "Detected: any URL starting with http/https",
  },
  {
    name: "JSON",
    badge: "bg-green-500/15 text-green-400 border-green-500/30",
    dot: "bg-green-500",
    example: '{"status": "ok", "version": "1.0.0"}',
    detect: "Detected: valid JSON objects and arrays",
  },
  {
    name: "EMAIL",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    dot: "bg-amber-500",
    example: "user@mail.example",
    detect: "Detected: standard email address patterns",
  },
  {
    name: "TEXT",
    badge: "bg-gray-500/15 text-gray-400 border-gray-500/30",
    dot: "bg-gray-500",
    example: "Meeting moved to 4pm, same link",
    detect: "Detected: everything else — plain readable text",
  },
];

const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

export const CategoryShowcase = () => {
  const [seconds, setSeconds] = useState(107);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 107 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="categories" className="py-20 md:py-28 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            Categories
          </span>
          <h2 className="mt-3 font-display font-bold h2-fluid tracking-tight">
            It knows what you copied
          </h2>
          <p className="mt-4 body-fluid text-muted-foreground">
            Every clip is tagged automatically the moment you copy it.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <div
              key={c.name}
              className="reveal rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/40"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${c.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                  {c.name}
                </span>
                {c.withTimer && (
                  <span className="text-[10px] font-mono tabular-nums text-red-400">
                    ⏱ {formatTime(seconds)}
                  </span>
                )}
              </div>

              <div className="mt-4 rounded-lg border border-border/70 bg-background/60 px-3 py-2.5">
                <code className="block font-mono text-xs text-foreground/90 truncate">
                  {c.example}
                </code>
              </div>

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.detect}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
