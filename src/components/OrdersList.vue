<template>
  <LmCard title="Orders">
    <LmSimpleList
      :items="orders"
      :headers="headers"
    >
      <template #products="item">
        {{ getProductsText(item) }}
      </template>
    </LmSimpleList>
  </LmCard>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';


import { useOrderStore } from '@/stores/order';
import Order from '@/types/order.type';
import SimpleListHeader from '@/types/simple-list-header.type';
import { Product } from '@/types/store.type';

import LmCard from './LmCard.vue';
import LmSimpleList from './LmSimpleList.vue';

const store = useOrderStore();

onMounted(() => {
  store.fetchOrders();
});

const headers: SimpleListHeader[] = [
  {
    text: '#',
    value: 'id'
  },
  {
    text: 'Customers',
    value: 'customerId'
  },
  {
    text: 'Products',
    name: 'products',
  }
];

const orders = computed<Order[]>(() => store.orders);

function getProductsText(order: Order): string {
  return order.basket
    .map((product: Product) => `${product.quantity}x ${product.productId}`)
    .join(', ');
}
</script>