/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart, CartType } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { CartActions } from '../actions/index';

export const cartTypeIndexInitialState = { [CartType.ACTIVE]: '' };
export function cartTypeIndexReducer(
  state: {
    [cartType: string]: string;
  } = cartTypeIndexInitialState,
  action: CartActions.MultiCartActions | CartActions.CartAction
): {
  [cartType: string]: string;
} {
  switch (action.type) {
    case CartActions.SET_CART_TYPE_INDEX:
      return {
        ...state,
        [action.payload.cartType]: action.payload.cartId as string,
      };
    case CartActions.REMOVE_CART:
    case CartActions.DELETE_CART_SUCCESS: {
      if (action.payload?.cartId === state[CartType.ACTIVE]) {
        return {
          ...state,
          [CartType.ACTIVE]: '',
        };
      }
      return state;
    }
    case CartActions.CLEAR_CART_STATE:
      return cartTypeIndexInitialState;
  }
  return state;
}

export const cartEntitiesInitialState = undefined;
export function cartEntitiesReducer(
  state: Cart | undefined = cartEntitiesInitialState,
  action: StateUtils.LoaderAction
): Cart | undefined {
  switch (action.type) {
    case CartActions.LOAD_CARTS_SUCCESS:
      return action.payload;

    case CartActions.LOAD_CART_SUCCESS:
    case CartActions.CREATE_CART_SUCCESS:
    case CartActions.SET_CART_DATA:
      return action.payload.cart;
  }
  return state;
}
