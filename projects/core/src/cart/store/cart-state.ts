import { OrderEntry } from '../../occ-models/index';
export const CART_FEATURE = 'cart';

export interface CartsState {
  active: CartState;
}
export interface CartState {
  content: any;
  entries: { [code: string]: OrderEntry };
  refresh: boolean;
  loaded: boolean;
  cartMergeComplete: boolean;
}
