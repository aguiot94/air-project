import { defineStore } from 'pinia';

import orderRepository from '@/repositories/orders.repository';
import type Order from '@/types/order.type';

import { useUiStore } from './ui';

export type OrderState = {
  orders: Order[];
}

export const useOrderStore = defineStore('order', {
    state: (): OrderState => ({
        orders: [],
    }),
    actions: {
      async fetchOrders(): Promise<void> {
        useUiStore().setLoadingState(true);

        const data = await orderRepository.getOrders()
          .catch(() => {
            useUiStore().setErrorState(true);
          })
          .finally(() => {
            useUiStore().setLoadingState(false);
          })

        this.orders = data as Order[];
      }
    },
})