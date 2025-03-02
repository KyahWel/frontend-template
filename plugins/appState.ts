import { defineNuxtPlugin } from 'nuxt/app';
import { reactive } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  const appState = reactive({ theme: 'Aura', darkTheme: false });

  // Provide appState globally using Nuxt's provide/inject mechanism
  nuxtApp.provide('appState', appState);
});
