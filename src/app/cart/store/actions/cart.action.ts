import { Action } from '@ngrx/store';
import { Cart } from '../../models/cart-types.model';

export const CREATE_CART = '[Cart] Create Cart';
export const CREATE_CART_FAIL = '[Cart] Create Cart Fail';
export const CREATE_CART_SUCCESSS = '[Cart] Create Cart Success';

export const LOAD_CART = '[Cart] Load Cart';
export const LOAD_CART_FAIL = '[Cart] Load Cart Fail';
export const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';

export class CreateCart implements Action {
  readonly type = CREATE_CART;
  constructor(public payload: string) {}
}

export class CreateCartFail implements Action {
  readonly type = CREATE_CART_FAIL;
  constructor(public payload: any) {}
}

export class CreateCartSuccess implements Action {
  readonly type = CREATE_CART_SUCCESSS;
  constructor(public payload: Cart) {}
}

// TODO [SPA-294] - change types for load cart actions
export class LoadCart implements Action {
  readonly type = LOAD_CART;
  constructor(public payload: string) {}
}

export class LoadCartFail implements Action {
  readonly type = LOAD_CART_FAIL;
  constructor(public payload: any) {}
}

export class LoadCartSuccess implements Action {
  readonly type = LOAD_CART_SUCCESS;
  constructor(public payload: Cart) {}
}

export type CartAction =
  | CreateCart
  | CreateCartFail
  | CreateCartSuccess
  | LoadCart
  | LoadCartFail
  | LoadCartSuccess;
