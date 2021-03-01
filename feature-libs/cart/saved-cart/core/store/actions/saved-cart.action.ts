import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import {
  SAVED_CART_LIST_PROCESS_ID,
  SAVED_CART_RESTORE_CART_PROCESS_ID,
} from '../saved-cart-state';

export const LOAD_SAVED_CARTS = '[Saved Cart] Load Saved Carts';
export const LOAD_SAVED_CARTS_SUCCESS = '[Saved Cart] Load Saved Carts Success';
export const LOAD_SAVED_CARTS_FAIL = '[Saved Cart] Load Saved Carts Fail';
export const CLEAR_SAVED_CARTS = '[Saved Cart] Clear Saved Carts';

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
    super(PROCESS_FEATURE, SAVED_CART_LIST_PROCESS_ID);
  }
}

export class LoadSavedCartsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_SAVED_CARTS_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, SAVED_CART_LIST_PROCESS_ID);
  }
}

export class LoadSavedCartsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_SAVED_CARTS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SAVED_CART_LIST_PROCESS_ID, payload);
  }
}

export class ClearSavedCarts extends StateUtils.EntityLoaderResetAction {
  readonly type = CLEAR_SAVED_CARTS;
  constructor() {
    super(PROCESS_FEATURE, SAVED_CART_LIST_PROCESS_ID);
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
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID);
  }
}

export class RestoreSavedCartSuccess extends StateUtils.EntitySuccessAction {
  readonly type = RESTORE_SAVED_CART_SUCCESS;
  constructor(public payload?: any) {
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID);
  }
}

export class RestoreSavedCartFail extends StateUtils.EntityFailAction {
  readonly type = RESTORE_SAVED_CART_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID, payload);
  }
}

export type SavedCartActions =
  | LoadSavedCarts
  | LoadSavedCartsSuccess
  | LoadSavedCartsFail
  | ClearSavedCarts
  | RestoreSavedCart
  | RestoreSavedCartSuccess
  | RestoreSavedCartFail;
