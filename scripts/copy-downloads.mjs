import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const releaseDir = path.join(root, "release");
const outDir = path.join(root, "public", "downloads");

const map = [
  { src: "ClipMate-1.0.0.AppImage", dest: "ClipMate-1.0.0.AppImage" },
  { src: "clipmate_1.0.0_amd64.deb", dest: "clipmate_1.0.0_amd64.deb" },
  { src: "ClipMate Setup 1.0.0.exe", dest: "ClipMate-Setup-1.0.0.exe" },
  { src: "ClipMate 1.0.0.exe", dest: "ClipMate-1.0.0-portable.exe" },
  { src: "ClipMate-Setup-1.0.0.exe", dest: "ClipMate-Setup-1.0.0.exe" },
  { src: "ClipMate-1.0.0-portable.exe", dest: "ClipMate-1.0.0-portable.exe" },
];

fs.mkdirSync(outDir, { recursive: true });

let copied = 0;
for (const { src, dest } of map) {
  const from = path.join(releaseDir, src);
  if (!fs.existsSync(from)) continue;
  const to = path.join(outDir, dest);
  fs.copyFileSync(from, to);
  console.log(`Copied ${src} → public/downloads/${dest}`);
  copied++;
}

if (copied === 0) {
  console.warn(
    "No release files found. Run npm run electron:build:linux (or :win) first, then npm run copy:downloads",
  );
  process.exit(1);
}

console.log(`Done. ${copied} file(s) ready for the website.`);
