import { useState } from "react";
import {
  Download,
  Monitor,
  Terminal,
  Keyboard,
  Copy,
  Search,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOWNLOADS, downloadUrl } from "@/lib/downloads";
import { cn } from "@/lib/utils";

type Platform = "windows" | "linux";

const SHORTCUTS = [
  { keys: "Win + V", alt: "Super + V on Linux", action: "Open or close clipboard history" },
  { keys: "Ctrl + Shift + V", alt: "Fallback if Win+V is busy", action: "Open or close history" },
  { keys: "↑ / ↓", action: "Move through clips" },
  { keys: "Enter", action: "Copy selected clip to clipboard" },
  { keys: "Esc", action: "Close the popup" },
];

export const DownloadSection = () => {
  const [platform, setPlatform] = useState<Platform>("windows");

  return (
    <section id="download" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            Download
          </span>
          <h2 className="mt-3 font-display font-bold h2-fluid tracking-tight">
            Install ClipMate on your computer
          </h2>
          <p className="mt-4 body-fluid text-muted-foreground">
            Free desktop app for Windows and Linux. Local storage only — like Windows clipboard
            history, but yours to keep and search.
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-2 reveal">
          <PlatformTab
            active={platform === "windows"}
            onClick={() => setPlatform("windows")}
            icon={Monitor}
            label="Windows"
          />
          <PlatformTab
            active={platform === "linux"}
            onClick={() => setPlatform("linux")}
            icon={Terminal}
            label="Linux"
          />
        </div>

        <div className="mt-8 max-w-3xl mx-auto reveal">
          {platform === "windows" ? <WindowsDownloads /> : <LinuxDownloads />}
        </div>

        <div className="mt-16 max-w-3xl mx-auto grid md:grid-cols-2 gap-8 reveal">
          <InstallSteps platform={platform} />
          <UsageGuide />
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground max-w-xl mx-auto reveal">
          Chrome extension coming soon. The desktop app is available now — build from source with{" "}
          <code className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded">npm run electron:build</code>{" "}
          if download files are missing.
        </p>
      </div>
    </section>
  );
};

function PlatformTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Monitor;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:text-foreground hover:border-border/80",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function DownloadCard({
  title,
  description,
  href,
  filename,
  primary,
}: {
  title: string;
  description: string;
  href: string;
  filename: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      download={filename}
      className={cn(
        "flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-0.5",
        primary
          ? "border-primary/40 bg-primary/5 hover:border-primary/60 hover:shadow-glow"
          : "border-border bg-surface hover:border-primary/30",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-lg">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <div
          className={cn(
            "grid place-items-center h-10 w-10 rounded-lg shrink-0",
            primary ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
          )}
        >
          <Download className="h-5 w-5" />
        </div>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Download {filename}
        <ChevronRight className="h-4 w-4" />
      </span>
    </a>
  );
}

function WindowsDownloads() {
  const { installer, portable } = DOWNLOADS.windows;
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <DownloadCard
          primary
          title="Installer (.exe)"
          description="Recommended. Installs ClipMate and adds a Start Menu shortcut."
          href={downloadUrl(installer)}
          filename={installer}
        />
        <DownloadCard
          title="Portable (.exe)"
          description="No install — run from any folder. Good for USB or restricted PCs."
          href={downloadUrl(portable)}
          filename={portable}
        />
      </div>
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 flex gap-3 text-sm">
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <strong className="text-foreground">Win+V on Windows 11:</strong> Microsoft uses the same
          shortcut for its clipboard. Turn off{" "}
          <span className="text-foreground">Settings → System → Clipboard → Clipboard history</span>,
          or use <kbd className="font-mono text-xs bg-muted px-1 rounded">Ctrl+Shift+V</kbd> instead.
        </p>
      </div>
    </div>
  );
}

function LinuxDownloads() {
  const { appImage, deb } = DOWNLOADS.linux;
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <DownloadCard
        primary
        title="AppImage"
        description="Works on most distros. Make executable, then double-click or run from terminal."
        href={downloadUrl(appImage)}
        filename={appImage}
      />
      <DownloadCard
        title="Debian package (.deb)"
        description="For Ubuntu, Debian, Mint, Pop!_OS, and other apt-based systems."
        href={downloadUrl(deb)}
        filename={deb}
      />
    </div>
  );
}

function InstallSteps({ platform }: { platform: Platform }) {
  const windowsSteps = [
    "Download the Installer (.exe) or Portable (.exe) above.",
    "Run the installer and follow the prompts (or run the portable exe directly).",
    "ClipMate starts in the system tray (near the clock). No account required.",
    "Copy any text as usual — ClipMate saves it locally in the background.",
  ];

  const linuxSteps = [
    "Download the AppImage or .deb package above (use a fresh download — a broken .deb often means an incomplete file).",
    "AppImage: chmod +x ClipMate-1.0.0.AppImage && ./ClipMate-1.0.0.AppImage",
    "Deb: sudo dpkg -i clipmate_1.0.0_amd64.deb — then launch ClipMate from your app menu.",
    "If the app will not start, run: ./ClipMate-1.0.0.AppImage --no-sandbox",
    "Look for the ClipMate icon in the system tray. Copy text normally to build history.",
  ];

  const steps = platform === "windows" ? windowsSteps : linuxSteps;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-7">
      <h3 className="font-display font-semibold text-xl flex items-center gap-2">
        <Download className="h-5 w-5 text-primary" />
        Installation
      </h3>
      <ol className="mt-5 space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="font-mono text-xs font-semibold text-primary shrink-0 mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={step.startsWith("chmod") ? "font-mono text-xs bg-muted/80 px-2 py-1 rounded block w-full text-foreground/90" : ""}>
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function UsageGuide() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-7">
      <h3 className="font-display font-semibold text-xl flex items-center gap-2">
        <Keyboard className="h-5 w-5 text-primary" />
        How to use
      </h3>
      <ul className="mt-5 space-y-4">
        <li className="flex gap-3 text-sm">
          <Copy className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span className="text-muted-foreground">
            <strong className="text-foreground">Copy anything</strong> — text is saved automatically
            while ClipMate runs in the tray.
          </span>
        </li>
        <li className="flex gap-3 text-sm">
          <Keyboard className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span className="text-muted-foreground">
            Press <strong className="text-foreground">Win+V</strong> (or click the tray icon) to open
            your history — same idea as Windows clipboard history.
          </span>
        </li>
        <li className="flex gap-3 text-sm">
          <Search className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span className="text-muted-foreground">
            <strong className="text-foreground">Search</strong> in the popup, pick a clip with the
            mouse or keyboard, press Enter to paste it back to the clipboard.
          </span>
        </li>
      </ul>
      <div className="mt-6 rounded-xl border border-border/80 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-3 py-2 font-mono text-muted-foreground">Shortcut</th>
              <th className="text-left px-3 py-2 font-mono text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {SHORTCUTS.map((row) => (
              <tr key={row.keys} className="border-b border-border/60 last:border-0">
                <td className="px-3 py-2 font-mono text-foreground whitespace-nowrap">{row.keys}</td>
                <td className="px-3 py-2 text-muted-foreground">
                  {row.action}
                  {row.alt && (
                    <span className="block text-[10px] mt-0.5 opacity-80">{row.alt}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
        <a href="#how-it-works">See the 3-step overview</a>
      </Button>
    </div>
  );
}
