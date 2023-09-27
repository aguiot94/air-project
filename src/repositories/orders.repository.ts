import type Order from '@/types/order.type';

const getOrders = async (): Promise<Order[]> => {
  return new Promise((resolve, _reject) => {
    resolve(
      [
        {
          id: 'LMFRORDER-1',
          customerId: 'Jean Dupont',
          basket: [
            {
              productId: 'Axe',
              quantity: 5,
            },
            {
              productId: 'Nail',
              quantity: 1
            },
            {
              productId: 'Hammer',
              quantity: 1
            }
          ]
        },
        {
          id: 'LMFRORDER-2',
          customerId: 'Michelle Smith',
          basket: [
            {
              productId: 'Nail',
              quantity: 1
            },
            {
              productId: 'Hammer',
              quantity: 1
            }
          ]
        },
        {
          id: 'LMFRORDER-3',
          customerId: 'Robert Martin',
          basket: [
            {
              productId: 'Hammer',
              quantity: 1
            },
            {
              productId: 'Axe',
              quantity: 5
            }
          ]
        }
        ]
      )
  });
};

export default {
  getOrders,
}
