import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: 'https://nikolovlazar.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !/https:\/\/frugalthinker\.com\/blog\/[0-9]+/.test(page),
      customPages: [
        'https://nikolovlazar.com/discord',
        'https://nikolovlazar.com/twitch',
        'https://nikolovlazar.com/twitter',
      ],
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.85,
      serialize: (item) => {
        // Remove trailing slashes
        if (item.url.at(-1) === '/') {
          item.url = item.url.slice(0, -1);
        }
        return item;
      },
      i18n: {
        defaultLocale: 'en',
        // Just an example, we're not actually implementing i18n
        locales: {
          en: 'en-US',
          es: 'es-ES',
          fr: 'fr-CA',
        },
      },
    }),
    pagefind()
  ],
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});