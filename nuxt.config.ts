// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL || 'https://dummyjson.com/',
    }
  },
  modules: [
    'nuxt-primevue',
    '@pinia/nuxt',
    '@primevue/nuxt-module'
  ],
  
  primevue: {
    options: {
        ripple: true,
        inputVariant: 'filled',
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: 'system',
                cssLayer: false
            }
        }
    }
},
  css: [
    'primevue/resources/themes/aura-light-blue/theme.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '~/assets/css/tailwind.css'

  ], 
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


  compatibilityDate: '2025-02-28'
})