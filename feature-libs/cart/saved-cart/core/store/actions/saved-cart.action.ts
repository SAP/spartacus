import {
  MULTI_CART_DATA,
  OCC_SAVED_CART_ID,
  PROCESS_FEATURE,
  StateUtils,
} from '@spartacus/core';
import { SAVED_CART_RESTORE_CART } from '../saved-cart-state';

export const LOAD_SAVED_CARTS = '[Saved Cart] Load Saved Carts';
export const LOAD_SAVED_CARTS_FAIL = '[Saved Cart] Load Saved Carts Fail';

export const RESTORE_SAVED_CART = '[Saved Cart] Restore Saved Cart';
export const RESTORE_SAVED_CART_SUCCESS =
  '[Saved Cart] Restore Saved Cart Success';
export const RESTORE_SAVED_CART_FAIL = '[Saved Cart] Restore Saved Cart Fail';

export class LoadSavedCarts extends StateUtils.EntityLoadAction {
  readonly type = LOAD_SAVED_CARTS;
  constructor(
    public payload: {
      userId: string;
    }
  ) {
    super(MULTI_CART_DATA, OCC_SAVED_CART_ID);
  }
}

export class LoadSavedCartsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_SAVED_CARTS_FAIL;
  constructor(public payload: any) {
    super(MULTI_CART_DATA, OCC_SAVED_CART_ID, payload);
  }
}

export class RestoreSavedCart extends StateUtils.EntityLoadAction {
  readonly type = RESTORE_SAVED_CART;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
    }
  ) {
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART);
  }
}

export class RestoreSavedCartSuccess extends StateUtils.EntitySuccessAction {
  readonly type = RESTORE_SAVED_CART_SUCCESS;
  constructor(public payload?: any) {
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART);
  }
}

export class RestoreSavedCartFail extends StateUtils.EntityFailAction {
  readonly type = RESTORE_SAVED_CART_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART, payload);
  }
}

export type SavedCartActions =
  | LoadSavedCarts
  | LoadSavedCartsFail
  | RestoreSavedCart
  | RestoreSavedCartSuccess
  | RestoreSavedCartFail;
