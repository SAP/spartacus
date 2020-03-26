import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { MULTI_CART_DATA } from '../multi-cart-state';

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

export const CLEAR_EXPIRED_COUPONS = '[Cart] Clear Expired Coupon';

export const CLEAR_CART = '[Cart] Clear Cart';

export const DELETE_CART = '[Cart] Delete Cart';
export const DELETE_CART_FAIL = '[Cart] Delete Cart Fail';

interface CreateCartPayload {
  userId: string;
  /** Used as a unique key in ngrx carts store (we don't know cartId at that time) */
  tempCartId: string;
  extraData?: {
    active?: boolean;
  };
  /** Anonymous cart which should be merged to new cart */
  oldCartId?: string;
  /** Cart to which should we merge (not passing this will create new cart) */
  toMergeCartGuid?: string;
}

export class CreateCart extends EntityLoadAction {
  readonly type = CREATE_CART;
  constructor(public payload: CreateCartPayload) {
    super(MULTI_CART_DATA, payload.tempCartId);
  }
}

interface CreateCartFailPayload extends CreateCartPayload {
  error: any;
}

export class CreateCartFail extends EntityFailAction {
  readonly type = CREATE_CART_FAIL;
  constructor(public payload: CreateCartFailPayload) {
    super(MULTI_CART_DATA, payload.tempCartId);
  }
}

interface CreateCartSuccessPayload extends CreateCartPayload {
  cart: Cart;
  cartId: string;
}

export class CreateCartSuccess extends EntitySuccessAction {
  readonly type = CREATE_CART_SUCCESS;
  constructor(public payload: CreateCartSuccessPayload) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class AddEmailToCart {
  readonly type = ADD_EMAIL_TO_CART;
  constructor(
    public payload: { userId: string; cartId: string; email: string }
  ) {}
}

export class AddEmailToCartFail {
  readonly type = ADD_EMAIL_TO_CART_FAIL;
  constructor(public payload: any) {}
}

export class AddEmailToCartSuccess {
  readonly type = ADD_EMAIL_TO_CART_SUCCESS;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class LoadCart {
  readonly type = LOAD_CART;
  constructor(
    public payload: { userId: string; cartId: string; extraData?: any }
  ) {}
}

export class LoadCartFail {
  readonly type = LOAD_CART_FAIL;
  constructor(public payload: any) {}
}

export class LoadCartSuccess {
  readonly type = LOAD_CART_SUCCESS;
  constructor(public payload: any) {}
}

export class MergeCart implements Action {
  readonly type = MERGE_CART;
  constructor(public payload: any) {}
}

export class MergeCartSuccess implements Action {
  readonly type = MERGE_CART_SUCCESS;
  constructor(public payload: { cartId: string; userId: string }) {}
}

export class ResetCartDetails implements Action {
  readonly type = RESET_CART_DETAILS;
  constructor() {}
}

export class ClearExpiredCoupons implements Action {
  readonly type = CLEAR_EXPIRED_COUPONS;
  constructor(public payload: any) {}
}

export class ClearCart {
  readonly type = CLEAR_CART;
  constructor() {}
}

export class DeleteCart {
  readonly type = DELETE_CART;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class DeleteCartFail {
  readonly type = DELETE_CART_FAIL;
  constructor(public payload: any) {}
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
  | AddEmailToCart
  | AddEmailToCartFail
  | AddEmailToCartSuccess
  | DeleteCart
  | DeleteCartFail
  | ClearExpiredCoupons
  | ClearCart;
