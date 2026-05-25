import { contextBridge, ipcRenderer } from "electron";
import type { ClipItem } from "./clipboard-store.js";

export type ClipMateApi = {
  getHistory: () => Promise<ClipItem[]>;
  selectClip: (id: string) => Promise<void>;
  removeClip: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  hideWindow: () => void;
  onHistoryUpdated: (callback: () => void) => () => void;
};

const api: ClipMateApi = {
  getHistory: () => ipcRenderer.invoke("history:get"),
  selectClip: (id) => ipcRenderer.invoke("history:select", id),
  removeClip: (id) => ipcRenderer.invoke("history:remove", id),
  clearHistory: () => ipcRenderer.invoke("history:clear"),
  hideWindow: () => ipcRenderer.send("window:hide"),
  onHistoryUpdated: (callback) => {
    const listener = () => callback();
    ipcRenderer.on("history:updated", listener);
    return () => ipcRenderer.removeListener("history:updated", listener);
  },
};

contextBridge.exposeInMainWorld("clipmate", api);
