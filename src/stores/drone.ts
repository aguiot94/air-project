import { defineStore } from 'pinia';

import dronesRepository from '@/repositories/drones.repository';
import type Drone from '@/types/drone.type';

import { useUiStore } from './ui';

type DronesState = {
  drones: Drone[];
}

export const useDroneStore = defineStore('drone', {
    state: (): DronesState => ({
        drones: [],
    }),
    actions: {
      async fetchDrones(): Promise<void> {
        useUiStore().setLoadingState(true);

        const data = await dronesRepository.getDrones()
          .catch(() => {
            useUiStore().setErrorState(true);
          })
          .finally(() => {
            useUiStore().setLoadingState(false);
          })

        this.drones = data as Drone[];
      }
    },
})