import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { getCartIdByUserId } from '../../utils/utils';
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

export class CreateCart extends EntityLoadAction {
  readonly type = CREATE_CART;
  constructor(
    public payload: {
      userId: string;
      tempCartId: string;
      extraData?: Object;
      oldCartId?: string;
      toMergeCartGuid?: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.tempCartId);
  }
}

export class CreateCartFail extends EntityFailAction {
  readonly type = CREATE_CART_FAIL;
  constructor(
    public payload: {
      userId: string;
      tempCartId: string;
      error: any;
      extraData?: Object;
      oldCartId?: string;
      toMergeCartGuid?: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.tempCartId);
  }
}

export class CreateCartSuccess extends EntitySuccessAction {
  readonly type = CREATE_CART_SUCCESS;
  constructor(
    public payload: { cart: Cart; userId: string; extraData?: Object }
  ) {
    super(MULTI_CART_DATA, getCartIdByUserId(payload.cart, payload.userId));
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
