import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { transform } from "esbuild";

export default defineConfig({
  plugins: [
    {
      name: "js-jsx-transform",
      enforce: "pre",
      async transform(code, id) {
        // Only process .js files in src/ that aren't already handled
        if (/src\/.*\.js$/.test(id) && !id.includes("node_modules")) {
          const result = await transform(code, {
            loader: "jsx",
            jsx: "automatic",
          });
          return { code: result.code, map: result.map };
        }
      },
    },
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
});
