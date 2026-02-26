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
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    }
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
  robots: {
    disallow: ['/api/admin/*', '/admin/*'],
  },
  mdc: {
    components: {
      map: {
        Aufklappen: 'collapsible',
        Spalten: 'cols',
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
  hooks: {
    'pages:extend'(pages) {
      const updateDateRoutePath = (routes: Array<{ file?: string, path: string, children?: Array<{ file?: string, path: string, children?: any[] }> }>) => {
        for (const route of routes) {
          if (route.file?.endsWith('/app/pages/[year]/[month]/[day]/[...slug].vue')) {
            route.path = '/:year(\\d{4})/:month(0[1-9]|1[0-2])/:day(0[1-9]|[12]\\d|3[01])/:slug(.+)'
          }
          if (route.children?.length) {
            updateDateRoutePath(route.children as any)
          }
        }
      }

      updateDateRoutePath(pages as any)
    },
  },
})