import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro(),
    tailwindcss(),
    tsconfigPaths(),
    viteReact(),
  ],
});
