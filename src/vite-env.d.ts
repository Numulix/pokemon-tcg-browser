/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown
  }
  
  interface ImportMetaEnv {
    readonly VITE_POKEMON_TCG_API_KEY: string;
    readonly VITE_SUPABASE_URL_LOCAL: string;
    readonly VITE_SUPABASE_ANON_KEY_LOCAL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }