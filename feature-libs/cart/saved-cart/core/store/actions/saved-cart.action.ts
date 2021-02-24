import {
  Cart,
  MULTI_CART_DATA,
  OCC_SAVED_CART_ID,
  StateUtils,
} from '@spartacus/core';

export const LOAD_SAVED_CART_SUCCESS =
  '[Saved Cart] Load SavedCarts Data Success';

export const LOAD_SAVED_CARTS = '[Saved Cart] Load SavedCarts';
export const LOAD_SAVED_CARTS_SUCCESS = '[Saved Cart] Load SavedCarts Success';
export const LOAD_SAVED_CARTS_FAIL = '[Saved Cart] Load SavedCarts Fail';

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

export class LoadSavedCartsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_SAVED_CARTS_SUCCESS;
  constructor(public payload: Cart[]) {
    super(MULTI_CART_DATA, OCC_SAVED_CART_ID, payload);
  }
}

export class LoadSavedCartsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_SAVED_CARTS_FAIL;
  constructor(public payload: any) {
    super(MULTI_CART_DATA, OCC_SAVED_CART_ID, payload);
  }
}

export type SavedCartActions =
  | LoadSavedCarts
  | LoadSavedCartsSuccess
  | LoadSavedCartsFail;
