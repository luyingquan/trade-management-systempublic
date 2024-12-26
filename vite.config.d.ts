/// <reference types="vite/client" />

declare module 'vite' {
  interface UserConfig {
    base?: string;
    plugins?: any[];
    resolve?: {
      alias?: Record<string, string>;
    };
    build?: {
      outDir?: string;
      assetsDir?: string;
      sourcemap?: boolean;
      rollupOptions?: {
        output?: {
          manualChunks?: Record<string, string[]>;
        };
      };
    };
  }
}
