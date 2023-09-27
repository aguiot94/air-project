import Drone from '@/types/drone.type';

const getDrones = async (): Promise<Drone[]> => {
  let response: Drone[] = [];

  const drones: Drone[] = [
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
  ];

  // Here we simulate an asynchronous API call
  setTimeout(() => response = drones, 500);

  return response;
};

export default {
  getDrones,
}
