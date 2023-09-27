import { defineStore } from 'pinia';

import storeRepository from '@/repositories/stores.repository';
import type { Store, Product, ProductStock } from '@/types/store.type';

import { useUiStore } from './ui';

type StoreState = {
  stores: Store[];
}

export const useStoreStore = defineStore('store', {
    state: (): StoreState => ({
        stores: [],
    }),
    getters: {
      stocks(state): ProductStock[] {
        const stores: Record<string, { id: string; quantity: number}[]> = {};

        state.stores.forEach((store) => {
          const { id, stock } = store;

          stock.forEach(({ productId, quantity }: Product) => {
            if (!stores[productId]) {
              stores[productId] = [];
            }

            stores[productId].push({ id, quantity });
          });
        });

        const result = Object.keys(stores).map((productId) => {
          return {
            productId,
            stock: stores[productId],
          };
        });

        return result;
      },
    },
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
      },
      updateStocks(productId: string, storeId: string): void {
        const storeIndex = this.stores.findIndex((store: Store) => store.id === storeId);
        const productIndex = this.stores[storeIndex].stock
          .findIndex((product: Product) => product.productId === productId);

        this.stores[storeIndex].stock[productIndex].quantity --;

        // this.stores[storeIndex].stock.splice(productIndex, 1, {
        //   ...this.stores[storeIndex].stock[productIndex],
        //   quantity: this.stores[storeIndex].stock[productIndex].quantity - 1,
        // })
      }
    },
})