import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react/", // ⚠️ GitHub 리포 이름으로 바꾸기
});
