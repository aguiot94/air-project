import type LocatedItem from './located-item.type';

export type Product = {
  productId: string;
  quantity: number;
};

export type Store = LocatedItem & {
  stock: Product[];
};
