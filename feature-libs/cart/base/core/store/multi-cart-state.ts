import { Cart } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';

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
  carts: StateUtils.EntityProcessesLoaderState<Cart | undefined>;
  index: {
    [cartType: string]: string;
  };
}
