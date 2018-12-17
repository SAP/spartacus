import { Action } from '@ngrx/store';

export const CREATE_CART = '[Cart] Create Cart';
export const CREATE_CART_FAIL = '[Cart] Create Cart Fail';
export const CREATE_CART_SUCCESS = '[Cart] Create Cart Success';

export const LOAD_CART = '[Cart] Load Cart';
export const LOAD_CART_FAIL = '[Cart] Load Cart Fail';
export const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';

export const MERGE_CART = '[Cart] Merge Cart';
export const MERGE_CART_SUCCESS = '[Cart] Merge Cart Success';

export class CreateCart implements Action {
  readonly type = CREATE_CART;
  constructor(public payload: any) {}
}

export class CreateCartFail implements Action {
  readonly type = CREATE_CART_FAIL;
  constructor(public payload: any) {}
}

export class CreateCartSuccess implements Action {
  readonly type = CREATE_CART_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCart implements Action {
  readonly type = LOAD_CART;
  constructor(
    public payload: { userId: string; cartId: string; details?: boolean }
  ) {}
}

export class LoadCartFail implements Action {
  readonly type = LOAD_CART_FAIL;
  constructor(public payload: any) {}
}

export class LoadCartSuccess implements Action {
  readonly type = LOAD_CART_SUCCESS;
  constructor(public payload: any) {}
}

export class MergeCart implements Action {
  readonly type = MERGE_CART;
  constructor(public payload: any) {}
}

export class MergeCartSuccess implements Action {
  readonly type = MERGE_CART_SUCCESS;
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
  | MergeCartSuccess;
