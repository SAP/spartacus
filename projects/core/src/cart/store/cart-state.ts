import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';
import { LoaderState } from '../../state/utils/loader/loader-state';

export const CART_FEATURE = 'cart';
export const CART_DATA = '[Cart] Cart Data';
export const ADD_VOUCHER_PROCESS_ID = 'addVoucher';

export interface StateWithCart {
  [CART_FEATURE]: CartsState;
}

export interface CartsState {
  active: LoaderState<CartState>;
}

export interface CartState {
  content: Cart;
  entries: { [entryNumber: number]: OrderEntry };
  refresh: boolean;
  cartMergeComplete: boolean;
}
