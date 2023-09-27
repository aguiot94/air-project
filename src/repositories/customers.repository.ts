import type LocatedItem from '@/types/located-item.type';

const getCustomers = async (): Promise<LocatedItem[]> => {
  return new Promise((resolve, _reject) => {
    resolve(
      [
        {
          id: 'Jean Dupont',
          x: 5,
          y: 8
        },
        {
          id: 'Michelle Smith',
          x: 20,
          y: 20
        },
        {
          id: 'Robert Martin',
          x: 12,
          y: 3
        }
       ]
      )
  });
};

export default {
  getCustomers,
}
