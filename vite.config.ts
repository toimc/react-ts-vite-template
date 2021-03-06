import legacy from "@vitejs/plugin-legacy";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const isDebug = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: isDebug ? [(legacy(), reactRefresh())] : [],
  esbuild: {
    // automatically import React in jsx files
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      // for TypeScript path alias import like : @/x/y/z
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  preview: {
    port: 3000,
  },
});
