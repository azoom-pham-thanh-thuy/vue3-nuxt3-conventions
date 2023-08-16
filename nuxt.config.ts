// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    highlight: {
      theme: {
        default: 'material-theme-palenight',
        dark: 'github-dark',
      },
    },
  },
})
