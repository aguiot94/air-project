import { defineStore } from 'pinia';

type UiState = {
  isLoading: boolean;
  hasError: boolean;
}

export const useUiStore = defineStore('ui', {
    state: (): UiState => ({
        isLoading: false,
        hasError: false,
    }),
    actions: {
      setLoadingState(isLoading: boolean): void {
        this.isLoading = isLoading;
      },
      setErrorState(hasError: boolean): void {
        this.hasError = hasError;
      }
    },
})