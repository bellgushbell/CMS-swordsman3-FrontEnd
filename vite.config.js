import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // Optional alias for easier import paths
    },
  },
  json: {
    namedExports: true, // Optional: enable named exports for JSON files
  },
});
