import { CartEntryEffects } from './cart-entry.effect';
import { CartVoucherEffects } from './cart-voucher.effect';
import { CartEffects } from './cart.effect';

/**
 * @deprecated since version 1.4
 *
 * spartacus ngrx effects will no longer be a part of public API
 *
 * TODO(issue:#5234)
 */
export const effects: any[] = [
  CartEffects,
  CartEntryEffects,
  CartVoucherEffects,
];

export * from './cart-entry.effect';
export * from './cart-voucher.effect';
export * from './cart.effect';
export { WISHLIST_CART_NAME } from './wish-list.effect';
