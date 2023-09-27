<template>
  <v-card class="lm-card">
    <template v-slot:title>
      <h2 class="pa-3 mb-3 bg-lm-green text-white">
        {{ props.title }}
      </h2>
    </template>

    <template v-slot:text>
      <slot name="default" />
    </template>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<style lang="scss">
.lm-card {
  .v-card-item {
    padding: 0;
  }
}
</style>