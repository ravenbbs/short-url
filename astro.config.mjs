import { defineConfig } from 'astro/config';
import auth from "auth-astro";
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [auth(), db(), tailwind(), react()],
  site: 'https://shortlly.vercel.app/',
});