import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import {
  StateWithMultiCart,
  MultiCartState,
  MULTI_CART_FEATURE,
} from '../multi-cart-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  entityStateSelector,
  entityValueSelector,
} from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state';
import { OrderEntry } from '../../../model/order.model';
import { Cart } from '../../../model/cart.model';

export const getMultiCartsState: MemoizedSelector<
  StateWithMultiCart,
  MultiCartState
> = createFeatureSelector<MultiCartState>(MULTI_CART_FEATURE);

export const getMultiCartsEntities: MemoizedSelector<
  StateWithMultiCart,
  EntityLoaderState<Cart>
> = createSelector(
  getMultiCartsState,
  (state: MultiCartState) => state.carts
);

export const getCartEntitySelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, LoaderState<Cart>> => {
  return createSelector(
    getMultiCartsEntities,
    (state: EntityLoaderState<Cart>) => entityStateSelector(state, cartId)
  );
};

export const getCartSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, Cart> => {
  return createSelector(
    getMultiCartsEntities,
    (state: EntityLoaderState<Cart>) => entityValueSelector(state, cartId)
  );
};

export const getCartEntriesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, OrderEntry[]> => {
  return createSelector(
    getMultiCartsEntities,
    (state: EntityLoaderState<Cart>) =>
      entityValueSelector(state, cartId) &&
      entityValueSelector(state, cartId).entries
        ? entityValueSelector(state, cartId).entries
        : []
  );
};

export const getCartEntrySelectorFactory = (
  cartId: string,
  productCode: string
): MemoizedSelector<StateWithMultiCart, OrderEntry> => {
  return createSelector(
    getMultiCartsEntities,
    (state: EntityLoaderState<Cart>) =>
      entityValueSelector(state, cartId) &&
      entityValueSelector(state, cartId).entries
        ? entityValueSelector(state, cartId).entries.find(
            entry => entry.product.code === productCode
          )
        : null
  );
};

export const getActiveCartId: MemoizedSelector<
  StateWithMultiCart,
  string
> = createSelector(
  getMultiCartsState,
  (state: MultiCartState) => state.active
);
