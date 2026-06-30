// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://keeb.hackclub.com',
  // Keep the not-yet-launched shop out of the public sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/shop') })],
});
