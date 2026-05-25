import { _encatch, type Theme } from "@encatch/web-sdk";

const publishableKey = import.meta.env.VITE_ENCATCH_API_KEY;
export const feedbackFormId = import.meta.env.VITE_ENCATCH_FEEDBACK_FORM_ID;
export const contactFormId = import.meta.env.VITE_ENCATCH_CONTACT_FORM_ID;

const CLIPMATE_THEME_KEY = "clipmate-theme";

export type ClipmateTheme = "dark" | "light";

export function getClipmateTheme(): ClipmateTheme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(CLIPMATE_THEME_KEY);
  return stored === "light" ? "light" : "dark";
}

/** Keep Encatch forms in sync with the site theme (Encatch docs: setTheme). */
export function syncEncatchTheme(theme: ClipmateTheme = getClipmateTheme()) {
  if (!publishableKey) return;
  _encatch.setTheme(theme as Theme);
}

/** Call once, as early as possible in the page lifecycle (Encatch docs). */
export function initEncatch() {
  if (!publishableKey) return;
  const theme = getClipmateTheme();
  _encatch.init(publishableKey, { theme });
  _encatch.startSession();
  syncEncatchTheme(theme);
}
