<template>
  <LmCard title="Drones">
    <LmSimpleList
      :items="drones"
      :headers="headers"
    />
  </LmCard>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useDroneStore } from '@/stores/drone';
import Drone from '@/types/drone.type';
import SimpleListHeader from '@/types/simple-list-header.type';

import LmCard from './LmCard.vue';
import LmSimpleList from './LmSimpleList.vue';

const store = useDroneStore();

onMounted(() => {
  store.fetchDrones();
});

const headers: SimpleListHeader[] = [
  {
    text: 'Drones',
    value: 'id',
  },
  {
    text: 'Autonomy',
    value: 'autonomy',
  },
  {
    text: 'x',
    value: 'x',
  },
  {
    text: 'y',
    value: 'y',
  },
];

const drones = computed<Drone[]>(() => store.drones);
</script>