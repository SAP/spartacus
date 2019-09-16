import { Action } from '@ngrx/store';
import { MULTI_CART_FEATURE } from '../cart-state';
import { EntityLoadAction, EntitySuccessAction, EntityFailAction, EntityResetAction } from '../../../state/utils/entity-loader/entity-loader.action';
import { EntityRemoveAction } from '../../../state/utils/entity/entity.action';
import { getCartIdByUserId } from '../../utils/utils';

export const RESET_FRESH_CART = '[New Cart] Reset Fresh Cart';

export const CREATE_MULTI_CART = '[New Cart] Create Cart';
export const CREATE_MULTI_CART_FAIL = '[New Cart] Create Cart Fail';
export const CREATE_MULTI_CART_SUCCESS = '[New Cart] Create Cart Success';

export const LOAD_MULTI_CART = '[New Cart] Load Cart';
export const LOAD_MULTI_CART_FAIL = '[New Cart] Load Cart Fail';
export const LOAD_MULTI_CART_SUCCESS = '[New Cart] Load Cart Success';

export const MERGE_MULTI_CART = '[New Cart] Merge Cart';
export const MERGE_MULTI_CART_SUCCESS = '[New Cart] Merge Cart Success';

export const RESET_MULTI_CART_DETAILS = '[New Cart] Reset Cart Details';

export const CLEAR_MULTI_CART = '[New Cart] Clear Cart';

export const SET_FRESH_CART_ID = '[New Cart] Set Fresh Cart Id';

export const SET_FAKE_LOADING_CART = '[New Cart] Set Fake Loading Cart';

export const REMOVE_CART = '[New Cart] Remove Cart';

// TODO: validate need for all actions, some could be merged

export class ResetFreshCart extends EntityResetAction {
  readonly type = RESET_FRESH_CART;
  constructor() {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class CreateMultiCart extends EntityLoadAction {
  readonly type = CREATE_MULTI_CART;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class CreateMultiCartFail extends EntityRemoveAction {
  readonly type = CREATE_MULTI_CART_FAIL;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, 'fresh');
  }
}

export class CreateMultiCartSuccess extends EntitySuccessAction {
  readonly type = CREATE_MULTI_CART_SUCCESS;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class SetFreshCartId extends EntitySuccessAction {
  readonly type = SET_FRESH_CART_ID;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, 'fresh', payload);
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
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, payload.cartId, payload.error);
  }
}

export class LoadMultiCartSuccess extends EntitySuccessAction {
  readonly type = LOAD_MULTI_CART_SUCCESS;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class MergeMultiCart implements Action {
  readonly type = MERGE_MULTI_CART;
  constructor(public payload: any) {}
}

export class MergeMultiCartSuccess extends EntityRemoveAction {
  readonly type = MERGE_MULTI_CART_SUCCESS;
  constructor(public payload: any) {
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
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class SetFakeLoadingCart extends EntityLoadAction {
  readonly type = SET_FAKE_LOADING_CART;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, payload.cartId)
  };
}

export class RemoveCart extends EntityRemoveAction {
  readonly type = REMOVE_CART;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, payload);
  }
}

// TODO: export everything needed
export type MultiCartActions =
  | CreateMultiCart
  | CreateMultiCartFail
  | CreateMultiCartSuccess
  | LoadMultiCart
  | LoadMultiCartFail
  | LoadMultiCartSuccess
  | MergeMultiCart
  | MergeMultiCartSuccess
  | ResetMultiCartDetails
  | ClearMultiCart
  | SetFreshCartId
  | SetFakeLoadingCart
  | RemoveCart;
