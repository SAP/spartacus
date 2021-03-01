import { Cart, StateUtils } from '@spartacus/core';

export const SAVED_CART_FEATURE = 'saved-cart';
export const SAVED_CART_LIST = 'saved-cart-list';
export const SAVED_CART_ENTITIES = 'saved-cart-entities';

export const SAVED_CART_RESTORE_CART = 'saved-cart-restore-cart';

export interface SavedCartState {
  [SAVED_CART_FEATURE]: SavedCartManagement;
}

export interface SavedCartManagement extends StateUtils.EntityListState<Cart> {}
