import { Cart } from '../../model/cart.model';
import { EntityProcessesLoaderState } from '../../state/utils/entity-processes-loader/entity-processes-loader-state';

export const MULTI_CART_FEATURE = 'cart';
export const MULTI_CART_DATA = '[Multi Cart] Multi Cart Data';

// TODO(#7241): Drop after event system implementation for cart vouchers
/**
 * Add voucher process const
 * @deprecated since 2.0
 */
export const ADD_VOUCHER_PROCESS_ID = 'addVoucher';

export interface StateWithMultiCart {
  [MULTI_CART_FEATURE]: MultiCartState;
}

export interface MultiCartState {
  carts: EntityProcessesLoaderState<Cart>;
  active: string;
  wishList: string;
}
