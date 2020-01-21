import { CartEntryEffects } from './cart-entry.effect';
import { CartVoucherEffects } from './cart-voucher.effect';
import { CartEffects } from './cart.effect';
import { WishListEffects } from './wish-list.effect';

/**
 * @deprecated since version 1.5
 *
 * spartacus ngrx effects will no longer be a part of public API
 *
 * TODO(issue:#4507)
 */
export const effects: any[] = [
  CartEffects,
  CartEntryEffects,
  CartVoucherEffects,
  WishListEffects,
];

export * from './cart-entry.effect';
export * from './cart-voucher.effect';
export * from './cart.effect';
export * from './wish-list.effect';
