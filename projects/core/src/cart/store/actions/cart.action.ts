import { Action } from '@ngrx/store';
import { StateLoaderActions } from '../../../state/utils/index';
import { CART_DATA } from '../cart-state';

export const CREATE_CART = '[Cart] Create Cart';
export const CREATE_CART_FAIL = '[Cart] Create Cart Fail';
export const CREATE_CART_SUCCESS = '[Cart] Create Cart Success';

export const LOAD_CART = '[Cart] Load Cart';
export const LOAD_CART_FAIL = '[Cart] Load Cart Fail';
export const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';

export const MERGE_CART = '[Cart] Merge Cart';
export const MERGE_CART_SUCCESS = '[Cart] Merge Cart Success';

export const RESET_CART_DETAILS = '[Cart] Reset Cart Details';

export class CreateCart extends StateLoaderActions.LoaderLoadAction {
  readonly type = CREATE_CART;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CreateCartFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CREATE_CART_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class CreateCartSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CREATE_CART_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class LoadCart extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_CART;
  constructor(public payload: { userId: string; cartId: string }) {
    super(CART_DATA);
  }
}

export class LoadCartFail extends StateLoaderActions.LoaderFailAction {
  readonly type = LOAD_CART_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class LoadCartSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = LOAD_CART_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class MergeCart implements Action {
  readonly type = MERGE_CART;
  constructor(public payload: any) {}
}

export class MergeCartSuccess implements Action {
  readonly type = MERGE_CART_SUCCESS;
  constructor(public payload: any) {}
}

export class ResetCartDetails implements Action {
  readonly type = RESET_CART_DETAILS;
  constructor() {}
}

export type CartAction =
  | CreateCart
  | CreateCartFail
  | CreateCartSuccess
  | LoadCart
  | LoadCartFail
  | LoadCartSuccess
  | MergeCart
  | MergeCartSuccess
  | ResetCartDetails;
