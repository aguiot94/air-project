import type LocatedItem from './located-item.type';

type Drone = LocatedItem & {
  autonomy: number;
}

export default Drone;
