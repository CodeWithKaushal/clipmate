import { useCallback, useEffect, useState } from "react";
import { Search, Trash2, X, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ClipItem } from "@/desktop/clipmate-types";

function formatTime(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (sameDay) {
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function preview(text: string, max = 120): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length <= max ? oneLine : `${oneLine.slice(0, max)}…`;
}

export function DesktopApp() {
  const [items, setItems] = useState<ClipItem[]>([]);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const refresh = useCallback(async () => {
    const history = await window.clipmate.getHistory();
    setItems(history);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    void refresh();
    return window.clipmate.onHistoryUpdated(() => {
      void refresh();
    });
  }, [refresh]);

  const filtered = items.filter((item) =>
    item.text.toLowerCase().includes(query.toLowerCase().trim()),
  );

  const selectAt = async (index: number) => {
    const item = filtered[index];
    if (!item) return;
    await window.clipmate.selectClip(item.id);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.clipmate.hideWindow();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        void selectAt(selectedIndex);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, selectedIndex]);

  return (
    <div className="flex h-[520px] flex-col border border-border rounded-xl overflow-hidden shadow-2xl bg-background">
      <header className="flex items-center gap-2 border-b border-border px-3 py-2.5 bg-surface/80">
        <ClipboardList className="h-4 w-4 text-primary shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold leading-none">ClipMate</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Win+V · Ctrl+Shift+V · ↑↓ Enter · Esc
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={() => window.clipmate.hideWindow()}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </header>

      <div className="px-3 py-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-8 pl-8 text-sm bg-muted/50"
            placeholder="Search clipboard history…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            {items.length === 0
              ? "Copy something — it will appear here."
              : "No clips match your search."}
          </p>
        ) : (
          <ul className="p-1.5 space-y-0.5">
            {filtered.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                    index === selectedIndex
                      ? "bg-primary/15 border border-primary/30"
                      : "hover:bg-muted/60 border border-transparent"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => void selectAt(index)}
                >
                  <p className="text-sm leading-snug break-words">{preview(item.text)}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground font-mono">
                    {formatTime(item.createdAt)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>

      <footer className="flex items-center justify-between border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
        <span>{filtered.length} clip{filtered.length === 1 ? "" : "s"}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground hover:text-destructive"
          onClick={() => void window.clipmate.clearHistory().then(refresh)}
          disabled={items.length === 0}
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Clear all
        </Button>
      </footer>
    </div>
  );
}
