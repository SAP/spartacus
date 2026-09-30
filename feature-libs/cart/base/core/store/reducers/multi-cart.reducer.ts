/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart, CartType, OrderEntry } from '@spartacus/cart/base/root';
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

/**
 * Merges the entry returned by POST .../entries into the cart entity so the
 * UI surfaces it before the trailing LoadCart reconcile arrives. Without this,
 * on slow networks rapid multi-product adds appear to "lose" entries until
 * processesCount falls to 0 and a refresh runs (CXSPA-10582).
 * Returns `state` unchanged when required data is absent.
 */
function mergeAddedEntry(
  state: Cart | undefined,
  entry: OrderEntry | undefined
): Cart | undefined {
  if (!state || !entry) {
    return state;
  }
  const existing = state.entries ?? [];
  const matchIndex = existing.findIndex(
    (e) => e.entryNumber === entry.entryNumber
  );
  const entries =
    matchIndex >= 0
      ? existing.map((e, i) => (i === matchIndex ? entry : e))
      : [...existing, entry];
  return { ...state, entries };
}

export const cartEntitiesInitialState = undefined;

export function createCartEntitiesReducer(
  slowNetworkResilienceEnabled: boolean
): (
  state: Cart | undefined,
  action: StateUtils.LoaderAction
) => Cart | undefined {
  return function cartEntitiesReducer(
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

      case CartActions.CART_ADD_ENTRY_SUCCESS:
        return slowNetworkResilienceEnabled
          ? mergeAddedEntry(state, action.payload?.entry)
          : state;
    }
    return state;
  };
}
