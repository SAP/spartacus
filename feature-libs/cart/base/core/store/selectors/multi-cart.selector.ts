/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import {
  MultiCartState,
  MULTI_CART_FEATURE,
  StateWithMultiCart,
} from '../multi-cart-state';

export const getMultiCartState: MemoizedSelector<
  StateWithMultiCart,
  MultiCartState
> = createFeatureSelector<MultiCartState>(MULTI_CART_FEATURE);

export const getMultiCartEntities: MemoizedSelector<
  StateWithMultiCart,
  StateUtils.EntityProcessesLoaderState<Cart | undefined>
> = createSelector(getMultiCartState, (state: MultiCartState) => state.carts);

export const getCartEntitySelectorFactory = (
  cartId: string
): MemoizedSelector<
  StateWithMultiCart,
  StateUtils.ProcessesLoaderState<Cart | undefined>
> => {
  return createSelector(
    getMultiCartEntities,
    (state: StateUtils.EntityProcessesLoaderState<Cart | undefined>) =>
      StateUtils.entityProcessesLoaderStateSelector(state, cartId)
  );
};

export const getCartSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, Cart> => {
  return createSelector(
    getMultiCartEntities,
    (state: StateUtils.EntityProcessesLoaderState<Cart | undefined>) =>
      StateUtils.entityValueSelector(state, cartId)
  );
};

export const getCartIsStableSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, boolean> => {
  return createSelector(
    getMultiCartEntities,
    (state: StateUtils.EntityProcessesLoaderState<Cart | undefined>) =>
      StateUtils.entityIsStableSelector(state, cartId)
  );
};

export const getCartHasPendingProcessesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, boolean> => {
  return createSelector(
    getMultiCartEntities,
    (state: StateUtils.EntityProcessesLoaderState<Cart | undefined>) =>
      StateUtils.entityHasPendingProcessesSelector(state, cartId)
  );
};

export const getCartEntriesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, OrderEntry[]> => {
  return createSelector(getCartSelectorFactory(cartId), (state: Cart) => {
    return state && state.entries ? state.entries : [];
  });
};

export const getCartEntrySelectorFactory = (
  cartId: string,
  productCode: string
): MemoizedSelector<StateWithMultiCart, OrderEntry | undefined> => {
  return createSelector(
    getCartEntriesSelectorFactory(cartId),
    (state: OrderEntry[]) => {
      return state.find((entry) => entry.product?.code === productCode);
    }
  );
};

export const getCartsSelectorFactory: MemoizedSelector<
  StateWithMultiCart,
  Cart[]
> = createSelector(
  getMultiCartEntities,
  (state: StateUtils.EntityProcessesLoaderState<Cart | undefined>) =>
    Object.keys(state.entities).map((key) =>
      StateUtils.entityValueSelector(state, key)
    )
);

export const getCartTypeIndex: MemoizedSelector<
  StateWithMultiCart,
  { [cartType: string]: string }
> = createSelector(getMultiCartState, (state: MultiCartState) => state.index);

export const getCartIdByTypeFactory = (
  type: string
): MemoizedSelector<StateWithMultiCart, string> => {
  return createSelector(
    getCartTypeIndex,
    (state: { [cartType: string]: string }) => {
      return state && state[type];
    }
  );
};
