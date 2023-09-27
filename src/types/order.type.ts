import { Product } from './store.type';

type Order = {
  id: string;
  customerId: string;
  basket: Product[];
}

export default Order;