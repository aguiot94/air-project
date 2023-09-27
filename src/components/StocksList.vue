<template>
  <LmCard title="Stocks">
    <LmSimpleList
      :items="stocks"
      :headers="headers"
    >
      <template
        v-for="store in storeHeaders"
        :key="store.name"
        #[`${store.name}`]="item"
      >
        {{ getStoreQuantity(item, store.text) }}
      </template>
    </LmSimpleList>
  </LmCard>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';


import { useStoreStore } from '@/stores/store';
import SimpleListHeader from '@/types/simple-list-header.type';
import { ProductStock, Store } from '@/types/store.type';

import LmCard from './LmCard.vue';
import LmSimpleList from './LmSimpleList.vue';

const store = useStoreStore();

onMounted(() => {
  store.fetchStores();
});

const storeHeaders = computed<SimpleListHeader[]>(() => store.stores.map((store: Store) => ({
  text: store.id,
  name: store.id.toLowerCase(),
  textAlign: 'right',
  headerAlign: 'center',
})));

const headers = computed<SimpleListHeader[]>(() => [
  {
    text: 'Products',
    value: 'productId'
  },
  ...storeHeaders.value,
]);

const stocks = computed<ProductStock[]>(() => store.stocks);

function getStoreQuantity(product: ProductStock, storeName: string): number | string {
  const { stock } = product;

  const quantity = stock.find((store: { id: string; quantity: number}) => store.id === storeName)?.quantity;

  return quantity || '-';
}

</script>