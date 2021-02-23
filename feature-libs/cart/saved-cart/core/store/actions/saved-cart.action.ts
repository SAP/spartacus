import { Cart, ListModel, StateUtils } from '@spartacus/core';
import { SAVED_CART_ENTITIES, SAVED_CART_LIST } from '../saved-cart-state';

export const LOAD_SAVED_CART_SUCCESS =
  '[Saved Cart] Load SavedCarts Data Success';

export const LOAD_SAVED_CARTS = '[Saved Cart] Load SavedCarts';
export const LOAD_SAVED_CARTS_SUCCESS = '[Saved Cart] Load SavedCarts Success';
export const LOAD_SAVED_CARTS_FAIL = '[Saved Cart] Load SavedCarts Fail';

export class LoadSavedCartSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_SAVED_CART_SUCCESS;
  constructor(public payload: Cart | Cart[]) {
    super(
      SAVED_CART_ENTITIES,
      Array.isArray(payload) ? payload.map((cart) => cart?.code) : payload?.code
    );
  }
}

export class LoadSavedCarts extends StateUtils.EntityLoadAction {
  readonly type = LOAD_SAVED_CARTS;
  constructor(
    public payload: {
      userId: string;
    }
  ) {
    //TODO: will change to a better feature slice later
    super(SAVED_CART_LIST, 'holdForNow');
  }
}

export class LoadSavedCartsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_SAVED_CARTS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
    }
  ) {
    super(SAVED_CART_LIST, 'holdForNow');
  }
}

export class LoadSavedCartsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_SAVED_CARTS_FAIL;
  constructor(public payload: any) {
    super(SAVED_CART_LIST, payload);
  }
}

export type SavedCartActions =
  | LoadSavedCarts
  | LoadSavedCartsSuccess
  | LoadSavedCartsFail;
