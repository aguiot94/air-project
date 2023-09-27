<template>
  <main>
    <v-card>
      <h1
        v-for="drone in drones"
        :key="drone.id"
      >
        {{ drone.id }}
      </h1>
    </v-card>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

import { useDroneStore } from '@/stores/drone';
import Drone from '@/types/drone.type'

const store = useDroneStore();

const drones: Ref<Drone[]> = ref(store.drones);

onMounted(() => {
  store.fetchDrones();
});
</script>
@/types/drone@/stores/drone.type