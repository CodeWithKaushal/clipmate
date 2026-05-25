/** Filenames under /downloads/ — run `npm run copy:downloads` after building the desktop app. */
export const DOWNLOADS = {
  version: "1.0.0",
  windows: {
    installer: "ClipMate-Setup-1.0.0.exe",
    portable: "ClipMate-1.0.0-portable.exe",
  },
  linux: {
    appImage: "ClipMate-1.0.0.AppImage",
    deb: "clipmate_1.0.0_amd64.deb",
  },
} as const;

export function downloadUrl(filename: string): string {
  return `/downloads/${filename}`;
}
