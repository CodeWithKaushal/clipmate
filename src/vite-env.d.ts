/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENCATCH_API_KEY?: string;
  readonly VITE_ENCATCH_FEEDBACK_FORM_ID?: string;
  readonly VITE_ENCATCH_CONTACT_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
