import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/mdc',
    '@nuxtjs/leaflet',
    '@nuxtjs/robots',
    'mktcms',
  ],
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'de',
      },
      title: 'Neue Website',
      meta: [
        {
          name: 'description',
          content: 'Meine neue mktCMS Website',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
      ],
    },
  },
  mdc: {
    components: {
      map: {
        Aufklappen: 'collapsible',
        Spalten2: 'cols2',
        Karte: 'directions',
        Inhalt: 'md',
        Galerie: 'slideshow',
      }
    },
    headings: {
      anchorLinks: false,
    },
  },
  fonts: {
    defaults: {
      weights: [300, 400, 700, 800],
    },
  },
})