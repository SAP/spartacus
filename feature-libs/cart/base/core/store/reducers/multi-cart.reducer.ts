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
 * Module-level holder for the `enableCartSlowNetworkResilience` toggle.
 * Reducers cannot use Angular DI, so the value is captured at app bootstrap
 * by `getMultiCartReducers()` (see `./index.ts`) and read here at action
 * dispatch time. When false, the reducer skips the optimistic
 * `CART_ADD_ENTRY_SUCCESS` merge and behaves identically to pre-CXSPA-10582.
 */
let cartSlowNetworkResilienceEnabled = false;

export function setCartSlowNetworkResilienceEnabled(enabled: boolean): void {
  cartSlowNetworkResilienceEnabled = enabled;
}

export const cartEntitiesInitialState = undefined;

/**
 * Merges the entry returned by POST .../entries into the cart entity so the
 * UI surfaces it before the trailing LoadCart reconcile arrives. Without this,
 * on slow networks rapid multi-product adds appear to "lose" entries until
 * processesCount falls to 0 and a refresh runs (CXSPA-10582).
 * Returns `state` unchanged when the toggle is OFF or required data is absent.
 */
function mergeAddedEntry(
  state: Cart | undefined,
  entry: OrderEntry | undefined
): Cart | undefined {
  if (!cartSlowNetworkResilienceEnabled || !state || !entry) {
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

    case CartActions.CART_ADD_ENTRY_SUCCESS:
      return mergeAddedEntry(state, action.payload?.entry);
  }
  return state;
}
