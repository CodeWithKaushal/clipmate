import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="top" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-radial pointer-events-none" aria-hidden />

      <div className="container relative">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 xl:gap-16 2xl:gap-20 items-center">
          {/* Copy */}
          <div className="reveal w-full max-w-[700px] xl:max-w-[38rem] 2xl:max-w-[44rem] 3xl:max-w-[48rem]">
            <span className="inline-flex items-center rounded-full border border-primary/50 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              Coming Soon to Chrome Web Store
            </span>

            <h1 className="mt-6 font-display font-bold tracking-tight h1-fluid">
              Your clipboard,<br />
              finally <span className="text-gradient">organized.</span>
            </h1>

            <p className="mt-6 body-fluid text-muted-foreground leading-relaxed">
              You copy something useful. Three minutes later it's gone. ClipMate runs silently in
              your browser, catches every copy, tags it automatically — code, links, JSON, OTPs,
              emails — and keeps everything one click away. No cloud. No account. Just your
              clipboard, finally under control.
            </p>

            <div className="mt-8">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:bg-primary-glow hover:-translate-y-0.5"
              >
                Join the Waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-mono">
              <span>100% Private</span>
              <span aria-hidden>·</span>
              <span>No Account Needed</span>
              <span aria-hidden>·</span>
              <span>Chrome Extension</span>
            </div>
          </div>

          {/* Popup mockup — desktop only */}
          <div className="hidden md:block reveal min-w-0 justify-self-end w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            <PopupMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const PopupMockup = () => {
  const [secondsLeft, setSecondsLeft] = useState(107);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 107 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full md:rotate-1">
      <div
        className="absolute -inset-10 bg-primary/25 blur-3xl rounded-full opacity-70"
        aria-hidden
      />
      <div className="relative rounded-2xl border border-primary/30 bg-surface/90 backdrop-blur-sm shadow-glow overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background/40">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs font-display font-semibold tracking-wide">ClipMate</span>
          <span className="text-[10px] font-mono text-muted-foreground">v1.0.0</span>
        </div>

        <div className="px-3 pt-3">
          <div className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2 text-xs">
            <span className="text-muted-foreground/70">🔍 Search clips...</span>
            <span className="font-mono text-[10px] text-muted-foreground/60 border border-border rounded px-1.5 py-0.5">
              ⌘K
            </span>
          </div>
        </div>

        <div className="px-3 py-3 space-y-2">
          <ClipRow tag="CODE" tagColor="blue" time="just now" content="const apiKey = process.env..." />
          <ClipRow
            tag="SENSITIVE"
            tagColor="red"
            time={`⏱ ${formatTime(secondsLeft)}`}
            timeAccent
            content="OTP: 847291"
          />
          <ClipRow tag="LINK" tagColor="violet" time="2m" content="https://figma.com/file/abc12..." />
          <ClipRow tag="JSON" tagColor="green" time="5m" content={'{"status": "ok", "v": "1.0.0"}'} />
          <ClipRow tag="EMAIL" tagColor="amber" time="8m" content="user@mail.example" />
        </div>

        <div className="px-4 py-2 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>5 clips</span>
          <span className="text-primary">●</span>
        </div>
      </div>
    </div>
  );
};

const TAG_COLORS = {
  blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  red: "bg-red-500/15 text-red-400 border-red-500/30",
  violet: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  green: "bg-green-500/15 text-green-400 border-green-500/30",
  amber: "bg-amber-500/15 text-amber-400 border-amber-500/30",
} as const;

const ClipRow = ({
  tag,
  tagColor,
  time,
  content,
  timeAccent,
}: {
  tag: string;
  tagColor: keyof typeof TAG_COLORS;
  time: string;
  content: string;
  timeAccent?: boolean;
}) => (
  <div className="rounded-lg border border-border/70 bg-background/40 px-2.5 py-2">
    <div className="flex items-center justify-between mb-1">
      <span
        className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider border ${TAG_COLORS[tagColor]}`}
      >
        {tag}
      </span>
      <span
        className={`text-[10px] tabular-nums font-mono ${
          timeAccent ? "text-red-400" : "text-muted-foreground"
        }`}
      >
        {time}
      </span>
    </div>
    <p className="font-mono text-[11px] text-foreground/85 truncate">{content}</p>
  </div>
);
