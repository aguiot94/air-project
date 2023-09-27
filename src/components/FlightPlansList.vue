<template>
  <LmCard title="Plans">
    <v-btn
    color="lm-green"
    variant="outlined"
    prepend-icon="mdi-plus"
    :disabled="showForm"
    @click="showForm = true"
    >
      ADD PLAN
    </v-btn>

    <v-form v-model="isFormValid">
      <LmSimpleList
        :headers="headers"
        :items="flightPlans"
      >
        <template
          v-if="showForm"
          #prepend
        >
          <tr class="flight-plan-form">
            <td class="py-2">
              <v-select
                v-model="newFlightPlan.drone"
                single-line
                hide-details
                return-object
                label="Drone"
                item-title="id"
                variant="outlined"
                :items="drones"
                :rules="[validationRules.required]"
              />
            </td>

            <td class="py-2">
              <v-select
                v-model="newFlightPlan.store"
                single-line
                hide-details
                return-object
                label="Store"
                item-title="id"
                variant="outlined"
                :items="stores"
                :rules="[validationRules.required]"
              />
            </td>

            <td class="py-2">
              <v-select
                v-model="newFlightPlan.product"
                single-line
                hide-details
                label="Product"
                variant="outlined"
                :items="availableProducts"
                :disabled="!newFlightPlan.store"
                :rules="[validationRules.required]"
              />
            </td>

            <td class="py-2">
              <v-select
                v-model="newFlightPlan.customer"
                single-line
                hide-details
                return-object
                label="Customer"
                variant="outlined"
                item-title="id"
                :items="customers"
                :rules="[validationRules.required]"
              />
            </td>

            <td class="text-right">
              <div class="d-flex-align-center">
                <v-btn
                  class="mr-4"
                  size="x-small"
                  color="lm-green"
                  icon="mdi-check"
                  variant="outlined"
                  :disabled="!isFormValid || isTooFar"
                  @click="addNewFlightPlan"
                />

                <v-btn
                  size="x-small"
                  color="red"
                  icon="mdi-cancel"
                  variant="outlined"
                  @click="closeForm"
                />
              </div>
            </td>
          </tr>
        </template>
      </LmSimpleList>
    </v-form>
  </LmCard>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, Ref, watch } from 'vue';

import LmCard from '@/components/LmCard.vue';
import LmSimpleList from '@/components/LmSimpleList.vue';
import { useCustomerStore } from '@/stores/customer';
import { useDroneStore } from '@/stores/drone';
import { useStoreStore } from '@/stores/store';
import Drone from '@/types/drone.type';
import FlightPlan from '@/types/flight-plan.type';
import LocatedItem from '@/types/located-item.type';
import SimpleListHeader from '@/types/simple-list-header.type';
import { ProductStock, Store } from '@/types/store.type';


import getShortesFlight from '../utils/get-shortest-flight.util';

onMounted(() => {
  customerStore.fetchCustomers();
});

const flightPlans: Ref<Record<string, string>[]> = ref([]);

const isTooFar = ref(true);
const showForm = ref(false);
const isFormValid = ref(true);
const currentFlightDistance = ref(0);
const newFlightPlan = ref({}) as Ref<FlightPlan>;

function closeForm(): void {
  showForm.value = false;

  clearFlightPlan();
}

watch(
  () => newFlightPlan.value,
  (plan: FlightPlan) => {
  const { drone, store, customer } = plan;

  if (drone && store && customer) {
    const distance: number = getShortesFlight(drone, store)
      + getShortesFlight(store, customer);

    isTooFar.value = distance > drone.autonomy;
    currentFlightDistance.value = distance;

    if (isTooFar.value) {
      alert('The drone you selected doesn\'t have enough autonomy for this flight plan');
    }
  }
},
{
  deep: true,
});

const validationRules = {
  required: (value: string) => !!value || 'Required',
};

function clearFlightPlan(): void {
  newFlightPlan.value = {} as FlightPlan;

  currentFlightDistance.value = 0;
}

function addNewFlightPlan(): void {
  const { drone, store, product, customer } = newFlightPlan.value;

  flightPlans.value.push({
    droneId: drone?.id,
    storeId: store?.id,
    productId: product,
    customerId: customer?.id,
  } as Record<string, string>);

  droneStore.updateDroneState(
    {
      ...drone,
      x: customer?.x,
      y: customer?.y,
    } as Drone,
    currentFlightDistance.value,
  );

  storeStore.updateStocks(product as string, store?.id as string);
  clearFlightPlan();
}

const headers = computed<SimpleListHeader[]>(() => [
  {
    text: 'Drones',
    value: 'droneId',
  },
  {
    text: 'Stores',
    value: 'storeId',
  },
  {
    text: 'Products',
    value: 'productId'
  },
  {
    text: 'Customers',
    value: 'customerId',
  },
  ...(
    showForm.value
      ? [{
        text: '',
        name: 'formActions'
      }]
      : []
  ),
]);

const customerStore = useCustomerStore();
const customers = computed<LocatedItem[]>(() => customerStore.customers);


const droneStore = useDroneStore();
const drones = computed<Drone[]>(() => droneStore.drones);

const storeStore = useStoreStore();
const stores = computed<Store[]>(() => storeStore.stores);
const stocks = computed<ProductStock[]>(() => storeStore.stocks);
const products = computed<string[]>(() => stocks.value.map((stock: ProductStock) => stock.productId));

const availableProducts = computed<string[]>(() => {
  if (newFlightPlan?.value?.store?.id) {
    return products.value.filter((productId: string) => {
      const productStock = stocks.value.find((productStock: ProductStock) => productStock.productId === productId);

      const storeStock = productStock?.stock
        .find((store: { id: string }) => store.id === newFlightPlan?.value?.store?.id);

      return !!storeStock && storeStock.quantity;
    });
  }

  return products.value;
});

watch(
  () => newFlightPlan.value.store,
  () => {
    newFlightPlan.value.product = null;
  }
);
</script>

<style lang="scss">
.flight-plan-form {
  td {
    width: 20% !important;
  }
}
</style>