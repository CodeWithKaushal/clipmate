# ClipMate

Marketing site and **desktop app** for local clipboard history (like Windows **Win+V**).

---

## Installation & use (desktop app)

### 1. Download

| Platform | File | Link on site |
| -------- | ---- | ------------- |
| **Windows** | Installer | `ClipMate-Setup-1.0.0.exe` |
| **Windows** | Portable (no install) | `ClipMate-1.0.0-portable.exe` |
| **Linux** | AppImage (most distros) | `ClipMate-1.0.0.AppImage` |
| **Linux** | Debian/Ubuntu | `clipmate_1.0.0_amd64.deb` |

Build the installers yourself (see [Build installers](#build-installers)), then copy them for the website:

```bash
npm run copy:downloads
```

Files go to `public/downloads/` so the landing page download buttons work.

### 2. Install

**Windows**

1. Download `ClipMate-Setup-1.0.0.exe` (or the portable `.exe`).
2. Run the installer and finish the wizard (or run the portable exe directly).
3. ClipMate appears in the **system tray** (near the clock).

**Linux (AppImage)**

```bash
chmod +x ClipMate-1.0.0.AppImage
./ClipMate-1.0.0.AppImage
```

If you see a `chrome-sandbox` / `setuid_sandbox` error, use the latest build (includes `--no-sandbox` on Linux) or run:

```bash
./ClipMate-1.0.0.AppImage --no-sandbox
```

**Linux (.deb)**

```bash
sudo dpkg -i clipmate_1.0.0_amd64.deb
```

If `dpkg` says **not a Debian format archive**, the file is corrupted or not a real `.deb` (e.g. an HTML error page from a failed download). Re-download from `release/` or run `npm run copy:downloads` after building.

Then open **ClipMate** from your applications menu.

### 3. Use

1. **Copy text** as you normally would — ClipMate saves it in the background.
2. Press **Win+V** (Linux: **Super+V**) or **Ctrl+Shift+V** to open history.  
   You can also click the **tray icon**.
3. **Search**, move with **↑ / ↓**, press **Enter** to copy a clip back to the clipboard, then paste anywhere.
4. Press **Esc** to close the popup.

**Windows 11 note:** If **Win+V** does nothing or opens Microsoft’s clipboard, turn off **Settings → System → Clipboard → Clipboard history**, or use **Ctrl+Shift+V**.

---

## Web (landing page)

| Command | Description |
| -------- | ------------- |
| `npm run dev` | Local dev server |
| `npm run build` | Production static site |
| `npm test` | Vitest |

The site includes a **Download** section (`#download`) with install steps and keyboard shortcuts.

---

## Build installers (developers)

```bash
npm install
```

**Linux** (AppImage + `.deb`):

```bash
npm run electron:build:linux
npm run copy:downloads
```

**Windows** (on a Windows machine):

```bash
npm run electron:build:win
npm run copy:downloads
```

Output: `release/` → copied to `public/downloads/` for the website.

**Develop without installing:**

```bash
npm run electron:dev
```

---

## License

Add a `LICENSE` file when you publish source or binaries.
