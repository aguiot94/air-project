import { defineStore } from 'pinia';

import customerRepository from '@/repositories/customers.repository';
import type LocatedItem from '@/types/located-item.type';

import { useUiStore } from './ui';

type CustomerState = {
  customers: LocatedItem[];
}

export const useCustomerStore = defineStore('customer', {
    state: (): CustomerState => ({
        customers: [],
    }),
    actions: {
      async fetchCustomers(): Promise<void> {
        useUiStore().setLoadingState(true);

        const data = await customerRepository.getCustomers()
          .catch(() => {
            useUiStore().setErrorState(true);
          })
          .finally(() => {
            useUiStore().setLoadingState(false);
          })

        this.customers = data as LocatedItem[];
      }
    },
})