/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_API_PK: string;
  readonly VITE_STRIPE_API_SK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
