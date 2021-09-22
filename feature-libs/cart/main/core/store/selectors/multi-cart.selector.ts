import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Cart, OrderEntry, StateUtils } from '@spartacus/core';
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
  StateUtils.EntityProcessesLoaderState<Cart>
> = createSelector(getMultiCartState, (state: MultiCartState) => state.carts);

export const getCartEntitySelectorFactory = (
  cartId: string
): MemoizedSelector<
  StateWithMultiCart,
  StateUtils.ProcessesLoaderState<Cart>
> => {
  return createSelector(
    getMultiCartEntities,
    (state: StateUtils.EntityProcessesLoaderState<Cart>) =>
      StateUtils.entityProcessesLoaderStateSelector(state, cartId)
  );
};

export const getCartSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, Cart> => {
  return createSelector(
    getMultiCartEntities,
    (state: StateUtils.EntityProcessesLoaderState<Cart>) =>
      StateUtils.entityValueSelector(state, cartId)
  );
};

export const getCartIsStableSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, boolean> => {
  return createSelector(
    getMultiCartEntities,
    (state: StateUtils.EntityProcessesLoaderState<Cart>) =>
      StateUtils.entityIsStableSelector(state, cartId)
  );
};

export const getCartHasPendingProcessesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, boolean> => {
  return createSelector(
    getMultiCartEntities,
    (state: StateUtils.EntityProcessesLoaderState<Cart>) =>
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
): MemoizedSelector<StateWithMultiCart, OrderEntry> => {
  return createSelector(
    getCartEntriesSelectorFactory(cartId),
    (state: OrderEntry[]) => {
      return state
        ? state.find((entry) => entry.product.code === productCode)
        : undefined;
    }
  );
};

export const getActiveCartId: MemoizedSelector<
  StateWithMultiCart,
  string
> = createSelector(getMultiCartState, (state: MultiCartState) => state.active);

export const getWishListId: MemoizedSelector<
  StateWithMultiCart,
  string
> = createSelector(
  getMultiCartState,
  (state: MultiCartState) => state?.wishList
);

export const getCartsSelectorFactory: MemoizedSelector<
  StateWithMultiCart,
  Cart[]
> = createSelector(
  getMultiCartEntities,
  (state: StateUtils.EntityProcessesLoaderState<Cart>) =>
    Object.keys(state.entities).map((key) =>
      StateUtils.entityValueSelector(state, key)
    )
);
