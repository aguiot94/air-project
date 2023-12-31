import type Drone from '@/types/drone.type';

const getDrones = async (): Promise<Drone[]> => {
  return new Promise((resolve, _reject) => {
    resolve([
      {
        id: 'Alpha',
        x: 5,
        y: 10,
        autonomy: 100,
      },
      {
        id: 'Beta',
        x: 2,
        y: 7,
        autonomy: 100,
      },
      {
        id: 'Gamma',
        x: 6,
        y: 20,
        autonomy: 100
     },
     {
       id: 'Delta',
       x: 4,
       y: 43,
       autonomy: 100
     },
     {
       id: 'Epsilon',
       x: 9,
       y: 9,
       autonomy: 100
     }
    ])
  });
};

export default {
  getDrones,
}
