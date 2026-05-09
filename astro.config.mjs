// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import image from '@astrojs/image';

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), react(), image()],

  vite: {
    plugins: [tailwindcss()],
  },
});
