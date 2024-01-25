/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { MULTI_CART_DATA } from '@spartacus/cart/base/core';
import { Cart } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';

export const CREATE_WISH_LIST = '[Wish List] Create Wish List';
export const CREATE_WISH_LIST_FAIL = '[Wish List] Create Wish List Fail';
export const CREATE_WISH_LIST_SUCCESS = '[Wish List] Create Wish List Success';

export const LOAD_WISH_LIST = '[Wish List] Load Wish List';
export const LOAD_WISH_LIST_SUCCESS = '[Wish List] Load Wish List Success';
export const LOAD_WISH_LIST_FAIL = '[Wish List] Load Wish List Fail';

export class CreateWishList implements Action {
  readonly type = CREATE_WISH_LIST;
  constructor(
    public payload: {
      userId: string;
      name?: string;
      description?: string;
    }
  ) {}
}

export class CreateWishListSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_WISH_LIST_SUCCESS;
  constructor(public payload: { cart: Cart; cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class CreateWishListFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_WISH_LIST_FAIL;
  constructor(public payload: { cartId: string; error?: any }) {
    super(MULTI_CART_DATA, payload.cartId, payload.error);
  }
}

interface LoadWishListPayload {
  userId: string;
  /**
   * This is tempCartId which is exact the wishlist name computed from customerId
   */
  cartId: string;
}

/**
 * When we try load wishlist for the first time we don't know cart id.
 * Instead we create temporary cartId from wishlist name to keep track of loading/error state.
 */
export class LoadWishList extends StateUtils.EntityLoadAction {
  readonly type = LOAD_WISH_LIST;
  constructor(public payload: LoadWishListPayload) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}
export class LoadWishListSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_WISH_LIST_SUCCESS;
  constructor(public payload: { cart: Cart; cartId: string }) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

interface LoadWishListFailPayload {
  /**
   * Cart id used as a store entity key. This could point either to some
   * temporary cart used to track loading/error state or to normal wish list entity.
   */
  cartId: string;
  error: any;
}

export class LoadWishListFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_WISH_LIST_FAIL;
  constructor(public payload: LoadWishListFailPayload) {
    super(MULTI_CART_DATA, payload.cartId, payload.error);
  }
}

export type WishListActions =
  | CreateWishList
  | CreateWishListSuccess
  | CreateWishListFail
  | LoadWishList
  | LoadWishListSuccess
  | LoadWishListFail;
