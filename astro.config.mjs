// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://keeb.hackclub.com',
  // Keep the not-yet-launched shop (unguessable path) out of the public sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/f04a70111456984d9c') })],
});
