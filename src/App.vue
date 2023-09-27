<template>
  <AppHeader />

  <main>
    <v-row>
      <v-col
        md="6"
        xs="12"
      >
        <FlightPlansList />
      </v-col>

      <v-col
        md="6"
        xs="12"
      >
        <v-row>
          <v-col xs="12">
            <OrdersList />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="6"
            xs="12"
          >
            <StocksList />
          </v-col>

          <v-col
            md="6"
            xs="12"
          >
            <DronesList />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </main>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import DronesList from '@/components/DronesList.vue';
import FlightPlansList from './components/FlightPlansList.vue';
import OrdersList from '@/components/OrdersList.vue';
import StocksList from '@/components/StocksList.vue';
</script>

<style scoped>
main {
  padding: 20px;
}
</style>