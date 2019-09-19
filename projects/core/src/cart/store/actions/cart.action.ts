import { Action } from '@ngrx/store';
import { StateLoaderActions } from '../../../state/utils/index';
import { CART_DATA } from '../cart-state';

export const CREATE_CART = '[Cart] Create Cart';
export const CREATE_CART_FAIL = '[Cart] Create Cart Fail';
export const CREATE_CART_SUCCESS = '[Cart] Create Cart Success';

export const LOAD_CART = '[Cart] Load Cart';
export const LOAD_CART_FAIL = '[Cart] Load Cart Fail';
export const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';

export const ADD_EMAIL_TO_CART = '[Cart] Add Email to Cart';
export const ADD_EMAIL_TO_CART_FAIL = '[Cart] Add Email to Cart Fail';
export const ADD_EMAIL_TO_CART_SUCCESS = '[Cart] Add Email to Cart Success';

export const MERGE_CART = '[Cart] Merge Cart';
export const MERGE_CART_SUCCESS = '[Cart] Merge Cart Success';

export const RESET_CART_DETAILS = '[Cart] Reset Cart Details';

export const CLEAR_CART = '[Cart] Clear Cart';

export const DELETE_CART = '[Cart] Delete Cart';
export const DELETE_CART_FAIL = '[Cart] Delete Cart Fail';

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

export class AddEmailToCart extends StateLoaderActions.LoaderLoadAction {
  readonly type = ADD_EMAIL_TO_CART;
  constructor(
    public payload: { userId: string; cartId: string; email: string }
  ) {
    super(CART_DATA);
  }
}

export class AddEmailToCartFail extends StateLoaderActions.LoaderFailAction {
  readonly type = ADD_EMAIL_TO_CART_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class AddEmailToCartSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = ADD_EMAIL_TO_CART_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class LoadCart extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_CART;
  constructor(
    public payload: { userId: string; cartId: string; extraData?: any }
  ) {
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

export class ClearCart extends StateLoaderActions.LoaderResetAction {
  readonly type = CLEAR_CART;
  constructor() {
    super(CART_DATA);
  }
}

export class DeleteCart extends StateLoaderActions.LoaderLoadAction {
  readonly type = DELETE_CART;
  constructor(public payload: { userId: string; cartId: string }) {
    super(CART_DATA);
  }
}

export class DeleteCartFail extends StateLoaderActions.LoaderFailAction {
  readonly type = DELETE_CART_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
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
  | ResetCartDetails
  | ClearCart
  | AddEmailToCart
  | AddEmailToCartFail
  | AddEmailToCartSuccess
  | DeleteCart
  | DeleteCartFail;
