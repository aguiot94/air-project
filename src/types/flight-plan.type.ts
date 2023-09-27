import Drone from './drone.type';
import LocatedItem from './located-item.type';
import { Store } from './store.type';

type FlightPlan = {
  drone: Drone | null;
  store: Store | null;
  product: string | null;
  customer: LocatedItem | null;
}

export default FlightPlan;