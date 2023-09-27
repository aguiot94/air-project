import Location from './location.type';

type LocatedItem = Location & {
  id: string;
}

export default LocatedItem;
