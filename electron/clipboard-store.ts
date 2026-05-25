import fs from "node:fs";
import path from "node:path";
import { app } from "electron";
export type ClipItem = {
  id: string;
  text: string;
  createdAt: number;
};

const MAX_ITEMS = 200;

function storePath(): string {
  return path.join(app.getPath("userData"), "clipboard-history.json");
}

function readAll(): ClipItem[] {
  try {
    const raw = fs.readFileSync(storePath(), "utf8");
    const parsed = JSON.parse(raw) as ClipItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(items: ClipItem[]): void {
  fs.mkdirSync(path.dirname(storePath()), { recursive: true });
  fs.writeFileSync(storePath(), JSON.stringify(items, null, 2), "utf8");
}

export function getHistory(): ClipItem[] {
  return readAll();
}

export function addClip(text: string): ClipItem | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const items = readAll();
  if (items[0]?.text === trimmed) return null;

  const item: ClipItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text: trimmed,
    createdAt: Date.now(),
  };

  const withoutDup = items.filter((i) => i.text !== trimmed);
  writeAll([item, ...withoutDup].slice(0, MAX_ITEMS));
  return item;
}

export function removeClip(id: string): void {
  writeAll(readAll().filter((i) => i.id !== id));
}

export function clearHistory(): void {
  writeAll([]);
}
