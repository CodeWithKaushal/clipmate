import type { ClipMateApi } from "../../electron/preload";

declare global {
  interface Window {
    clipmate: ClipMateApi;
  }
}

export {};
