import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loadingStore', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    startLoading(this: { isLoading: boolean }) {
      this.isLoading = true;
    },
    stopLoading(this: { isLoading: boolean }) {
      this.isLoading = false;
    },
  }
});
