import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Site de usuário (pedrorgc.github.io): o endereço raiz é "/".
// Se um dia publicar em um repositório de projeto (ex.: /portfolio/), troque base.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
