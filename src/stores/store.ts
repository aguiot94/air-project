import { defineStore } from 'pinia';

import storeRepository from '@/repositories/stores.repository';
import type { Store } from '@/types/store.type';

import { useUiStore } from './ui';

type StoreState = {
  stores: Store[];
}

export const useStoreStore = defineStore('store', {
    state: (): StoreState => ({
        stores: [],
    }),
    actions: {
      async fetchStores(): Promise<void> {
        useUiStore().setLoadingState(true);

        const data = await storeRepository.getStores()
          .catch(() => {
            useUiStore().setErrorState(true);
          })
          .finally(() => {
            useUiStore().setLoadingState(false);
          })

        this.stores = data as Store[];
      }
    },
})