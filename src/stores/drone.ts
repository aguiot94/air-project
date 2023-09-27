import { defineStore } from 'pinia';

import dronesRepository from '@/repositories/drones.repository';
import Drone from '@/types/drone.type';

type DronesState = {
  drones: Drone[];
}

export const useDroneStore = defineStore('drone', {
    state: (): DronesState => ({
        drones: [],
    }),
    getters: {
      getDrones(state){
          return state.drones;
        }
    },
    actions: {
      async fetchDrones() {
        const data = await dronesRepository.getDrones()
          .catch((error) => {
            console.log(error);
          })

        this.drones = data as Drone[];
      }
    },
})