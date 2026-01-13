import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', 'mktcms'],
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
  runtimeConfig: {
    filesPathPrefix: '',
    adminAuthKey: '',
    s3AccessKey: '',
    s3SecretKey: '',
  },
})