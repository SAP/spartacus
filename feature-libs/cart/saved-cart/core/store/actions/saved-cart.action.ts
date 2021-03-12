import { MULTI_CART_DATA, PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import {
  SAVED_CART_LIST_PROCESS_ID,
  SAVED_CART_RESTORE_CART_PROCESS_ID,
  SAVED_CART_SAVE_CART_PROCESS_ID,
} from '../saved-cart-state';

export const LOAD_SAVED_CART = '[Saved Cart] Load Saved Cart';
export const LOAD_SAVED_CART_SUCCESS = '[Saved Cart] Load Saved Cart Success';
export const LOAD_SAVED_CART_FAIL = '[Saved Cart] Load Saved Cart Fail';

export const LOAD_SAVED_CARTS = '[Saved Cart] Load Saved Carts';
export const LOAD_SAVED_CARTS_SUCCESS = '[Saved Cart] Load Saved Carts Success';
export const LOAD_SAVED_CARTS_FAIL = '[Saved Cart] Load Saved Carts Fail';
export const CLEAR_SAVED_CARTS = '[Saved Cart] Clear Saved Carts';

export const RESTORE_SAVED_CART = '[Saved Cart] Restore Saved Cart';
export const RESTORE_SAVED_CART_SUCCESS =
  '[Saved Cart] Restore Saved Cart Success';
export const RESTORE_SAVED_CART_FAIL = '[Saved Cart] Restore Saved Cart Fail';
export const CLEAR_RESTORE_SAVED_CART = '[Saved Cart] Clear Restore Saved Cart';

export const SAVE_CART = '[Saved Cart] Save Cart';
export const SAVE_CART_SUCCESS = '[Saved Cart] Save Cart Success';
export const SAVE_CART_FAIL = '[Saved Cart] Save Cart Fail';
export const CLEAR_SAVE_CART = '[Saved Cart] Clear Save Cart';

export class LoadSavedCart extends StateUtils.EntityLoadAction {
  readonly type = LOAD_SAVED_CART;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class LoadSavedCartSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_SAVED_CART_SUCCESS;
  constructor(public payload: { cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class LoadSavedCartFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_SAVED_CART_FAIL;
  constructor(public payload: { cartId: string; error: any }) {
    super(MULTI_CART_DATA, payload.cartId, payload?.error);
  }
}

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
  constructor(
    public payload: {
      userId: string;
      cartId: string;
    }
  ) {
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID);
  }
}

export class RestoreSavedCartFail extends StateUtils.EntityFailAction {
  readonly type = RESTORE_SAVED_CART_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      error: any;
    }
  ) {
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID, payload.error);
  }
}

export class ClearRestoreSavedCart extends StateUtils.EntityLoaderResetAction {
  readonly type = CLEAR_RESTORE_SAVED_CART;
  constructor() {
    super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID);
  }
}

export class SaveCart extends StateUtils.EntityLoadAction {
  readonly type = SAVE_CART;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      saveCartName?: string;
      saveCartDescription?: string;
      extraData?: {
        edit: boolean;
      };
    }
  ) {
    super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
  }
}

export class SaveCartSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SAVE_CART_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      saveCartName?: string;
      saveCartDescription?: string;
    }
  ) {
    super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
  }
}

export class SaveCartFail extends StateUtils.EntityFailAction {
  readonly type = SAVE_CART_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      saveCartName?: string;
      saveCartDescription?: string;
      error: any;
    }
  ) {
    super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID, payload.error);
  }
}

export class ClearSaveCart extends StateUtils.EntityLoaderResetAction {
  readonly type = CLEAR_SAVE_CART;
  constructor() {
    super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
  }
}

export type SavedCartActions =
  | LoadSavedCart
  | LoadSavedCartSuccess
  | LoadSavedCartFail
  | LoadSavedCarts
  | LoadSavedCartsSuccess
  | LoadSavedCartsFail
  | ClearSavedCarts
  | RestoreSavedCart
  | RestoreSavedCartSuccess
  | RestoreSavedCartFail
  | ClearRestoreSavedCart
  | SaveCart
  | SaveCartSuccess
  | SaveCartFail
  | ClearSaveCart;
