import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ContactUsButton } from "./ContactUsButton";
import { GiveFeedbackButton } from "./GiveFeedbackButton";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#download", label: "Download" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#categories", label: "Categories" },
  { href: "#waitlist", label: "Waitlist" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group shrink-0">
          <Logo className="h-7 w-7" />
          <span className="font-display font-bold text-lg tracking-tight">ClipMate</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ContactUsButton className="hidden sm:inline-flex" />
          <GiveFeedbackButton className="hidden sm:inline-flex" />
          <a
            href="#download"
            className="hidden sm:inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:-translate-y-0.5"
          >
            Download
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-slide-up-fade">
          <nav className="container flex flex-col py-4 gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-2 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <ContactUsButton
              className="mt-2 w-full justify-center py-2.5"
              onClick={() => setOpen(false)}
            />
            <GiveFeedbackButton
              className="w-full justify-center py-2.5"
              onClick={() => setOpen(false)}
            />
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Download
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
