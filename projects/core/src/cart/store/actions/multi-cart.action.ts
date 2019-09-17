import { Action } from '@ngrx/store';
import { MULTI_CART_FEATURE } from '../multi-cart-state';
import {
  EntityLoadAction,
  EntitySuccessAction,
  EntityFailAction,
  EntityResetAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { EntityRemoveAction } from '../../../state/utils/entity/entity.action';
import { getCartIdByUserId } from '../../utils/utils';
import { Cart } from '../../../model/cart.model';

export const RESET_FRESH_CART = '[Multi Cart] Reset Fresh Cart';

export const CREATE_MULTI_CART = '[Multi Cart] Create Cart';
export const CREATE_MULTI_CART_FAIL = '[Multi Cart] Create Cart Fail';
export const CREATE_MULTI_CART_SUCCESS = '[Multi Cart] Create Cart Success';

export const LOAD_MULTI_CART = '[Multi Cart] Load Cart';
export const LOAD_MULTI_CART_FAIL = '[Multi Cart] Load Cart Fail';
export const LOAD_MULTI_CART_SUCCESS = '[Multi Cart] Load Cart Success';

export const MERGE_MULTI_CART = '[Multi Cart] Merge Cart';
export const MERGE_MULTI_CART_SUCCESS = '[Multi Cart] Merge Cart Success';

export const RESET_MULTI_CART_DETAILS = '[Multi Cart] Reset Cart Details';

export const CLEAR_MULTI_CART = '[Multi Cart] Clear Cart';

export const SET_FRESH_CART_ID = '[Multi Cart] Set Fresh Cart Id';

export const SET_FAKE_LOADING_CART = '[Multi Cart] Set Fake Loading Cart';

export const REMOVE_CART = '[Multi Cart] Remove Cart';

export class ResetFreshCart extends EntityResetAction {
  readonly type = RESET_FRESH_CART;
  constructor() {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class SetFreshCart extends EntitySuccessAction {
  readonly type = SET_FRESH_CART_ID;
  constructor(public payload: Cart) {
    super(MULTI_CART_FEATURE, 'fresh', payload);
  }
}

export class CreateMultiCart extends EntityLoadAction {
  readonly type = CREATE_MULTI_CART;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class CreateMultiCartFail extends EntityFailAction {
  readonly type = CREATE_MULTI_CART_FAIL;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class CreateMultiCartSuccess extends EntitySuccessAction {
  readonly type = CREATE_MULTI_CART_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string; extraData: any }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class LoadMultiCart extends EntityLoadAction {
  readonly type = LOAD_MULTI_CART;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class LoadMultiCartFail extends EntityFailAction {
  readonly type = LOAD_MULTI_CART_FAIL;
  constructor(public payload: { cartId: string; error?: any }) {
    super(MULTI_CART_FEATURE, payload.cartId, payload.error);
  }
}

export class LoadMultiCartSuccess extends EntitySuccessAction {
  readonly type = LOAD_MULTI_CART_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string; extraData: any }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class MergeWithCurrentCart implements Action {
  readonly type = MERGE_MULTI_CART;
  constructor(public payload: any) {}
}

// I don't know if we should keep it or replace with different action for removal
export class MergeMultiCartSuccess extends EntityRemoveAction {
  readonly type = MERGE_MULTI_CART_SUCCESS;
  constructor(
    public payload: { oldCartId: string; cartId: string; userId: string }
  ) {
    super(MULTI_CART_FEATURE, payload.oldCartId);
  }
}

export class ResetMultiCartDetails extends EntityResetAction {
  readonly type = RESET_MULTI_CART_DETAILS;
  constructor() {
    super(MULTI_CART_FEATURE, undefined);
  }
}

export class ClearMultiCart extends EntityRemoveAction {
  readonly type = CLEAR_MULTI_CART;
  constructor(public payload: { cartId: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class SetFakeLoadingCart extends EntityLoadAction {
  readonly type = SET_FAKE_LOADING_CART;
  constructor(public payload: { cartId: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class RemoveCart extends EntityRemoveAction {
  readonly type = REMOVE_CART;
  constructor(public payload: string) {
    super(MULTI_CART_FEATURE, payload);
  }
}

export type MultiCartActions =
  | ResetFreshCart
  | SetFreshCart
  | CreateMultiCart
  | CreateMultiCartFail
  | CreateMultiCartSuccess
  | LoadMultiCart
  | LoadMultiCartFail
  | LoadMultiCartSuccess
  | MergeWithCurrentCart
  | MergeMultiCartSuccess
  | ResetMultiCartDetails
  | ClearMultiCart
  | SetFakeLoadingCart
  | RemoveCart;
