import { Logo } from "./Logo";

const LINKS = [
  { href: "#download", label: "Download" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#waitlist", label: "Waitlist" },
  { href: "#privacy", label: "Privacy Policy" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="font-display font-bold text-lg tracking-tight">ClipMate</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Your clipboard, organized.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm md:justify-center">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground md:text-right">
            Desktop app for Windows & Linux.
            <br />
            Chrome extension coming soon.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center">
          © 2026 ClipMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
