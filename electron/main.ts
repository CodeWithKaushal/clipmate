import {
  app,
  BrowserWindow,
  clipboard,
  globalShortcut,
  ipcMain,
  Menu,
  nativeImage,
  screen,
  Tray,
} from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  addClip,
  clearHistory,
  getHistory,
  removeClip,
} from "./clipboard-store.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.ELECTRON_DEV === "1";

// Required on many Linux setups (AppImage/deb) when chrome-sandbox cannot use setuid.
if (process.platform === "linux") {
  app.commandLine.appendSwitch("no-sandbox");
}

let tray: Tray | null = null;
let popup: BrowserWindow | null = null;
let lastClipboardText = "";
let pollTimer: ReturnType<typeof setInterval> | null = null;

const HOTKEY_PRIMARY = "Super+V";
const HOTKEY_FALLBACK = "Control+Shift+V";

function getPreloadPath(): string {
  return path.join(__dirname, "preload.js");
}

function getRendererUrl(): string {
  if (isDev) {
    return "http://localhost:3000/desktop.html";
  }
  return path.join(__dirname, "../dist/desktop.html");
}

function notifyHistoryUpdated(): void {
  popup?.webContents.send("history:updated");
}

function startClipboardWatcher(): void {
  lastClipboardText = clipboard.readText();
  pollTimer = setInterval(() => {
    const text = clipboard.readText();
    if (text && text !== lastClipboardText) {
      lastClipboardText = text;
      const added = addClip(text);
      if (added) notifyHistoryUpdated();
    }
  }, 400);
}

function registerHotkeys(): void {
  globalShortcut.unregisterAll();

  const openPopup = () => togglePopup();
  const primaryOk = globalShortcut.register(HOTKEY_PRIMARY, openPopup);
  if (!primaryOk) {
    console.warn(
      `Could not register ${HOTKEY_PRIMARY}. On Windows 11, disable Settings → System → Clipboard → Clipboard history, or use ${HOTKEY_FALLBACK}.`,
    );
    globalShortcut.register(HOTKEY_FALLBACK, openPopup);
  } else {
    globalShortcut.register(HOTKEY_FALLBACK, openPopup);
  }
}

function createPopup(): BrowserWindow {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: 420,
    height: 520,
    x: Math.round((width - 420) / 2),
    y: Math.round((height - 520) / 3),
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    transparent: false,
    backgroundColor: "#0A0A0F",
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.on("blur", () => {
    if (!isDev) win.hide();
  });

  if (isDev) {
    win.loadURL(getRendererUrl());
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(getRendererUrl());
  }

  return win;
}

function showPopup(): void {
  if (!popup || popup.isDestroyed()) {
    popup = createPopup();
  }
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const [w, h] = popup.getSize();
  popup.setPosition(
    Math.round((width - w) / 2),
    Math.round((height - h) / 3),
  );
  popup.show();
  popup.focus();
  popup.webContents.send("history:updated");
}

function hidePopup(): void {
  popup?.hide();
}

function togglePopup(): void {
  if (popup?.isVisible()) {
    hidePopup();
  } else {
    showPopup();
  }
}

function createTray(): void {
  const iconPath = path.join(
    app.getAppPath(),
    isDev ? "public/favicon.svg" : "dist/favicon.svg",
  );
  let icon = nativeImage.createFromPath(iconPath);
  if (icon.isEmpty()) {
    icon = nativeImage.createEmpty();
  }
  tray = new Tray(icon.isEmpty() ? nativeImage.createEmpty() : icon);
  tray.setToolTip("ClipMate — press Win+V for history");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Open clipboard history (Win+V)",
        click: () => showPopup(),
      },
      { type: "separator" },
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ]),
  );
  tray.on("click", () => togglePopup());
}

function setupIpc(): void {
  ipcMain.handle("history:get", () => getHistory());
  ipcMain.handle("history:remove", (_e, id: string) => {
    removeClip(id);
    notifyHistoryUpdated();
  });
  ipcMain.handle("history:clear", () => {
    clearHistory();
    notifyHistoryUpdated();
  });
  ipcMain.handle("history:select", (_e, id: string) => {
    const item = getHistory().find((i) => i.id === id);
    if (!item) return;
    clipboard.writeText(item.text);
    lastClipboardText = item.text;
    hidePopup();
  });
  ipcMain.on("window:hide", () => hidePopup());
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    showPopup();
  });

  app.whenReady().then(() => {
    setupIpc();
    startClipboardWatcher();
    registerHotkeys();
    createTray();
    popup = createPopup();

    app.on("will-quit", () => {
      globalShortcut.unregisterAll();
      if (pollTimer) clearInterval(pollTimer);
    });
  });

  app.on("window-all-closed", () => {
    // Keep running in the system tray.
  });
}
