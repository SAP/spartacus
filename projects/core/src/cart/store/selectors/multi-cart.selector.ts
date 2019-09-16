import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import {
  StateWithMultiCart,
  NewCartState,
  MultiCartState,
  MULTI_CART_FEATURE,
} from '../cart-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  entityStateSelector,
  entityValueSelector,
} from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from 'projects/core/src/state';
import { OrderEntry } from '../../../model/order.model';

export const getMultiCartsState: MemoizedSelector<
  StateWithMultiCart,
  MultiCartState
> = createFeatureSelector<MultiCartState>(MULTI_CART_FEATURE);

export const getMultiCartsEntities: MemoizedSelector<
  StateWithMultiCart,
  EntityLoaderState<NewCartState>
> = createSelector(
  getMultiCartsState,
  (state: MultiCartState) => state.carts
);

export const getCartEntitySelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, LoaderState<NewCartState>> => {
  return createSelector(
    getMultiCartsEntities,
    (state: EntityLoaderState<NewCartState>) =>
      entityStateSelector(state, cartId)
  );
};

export const getCartSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, NewCartState> => {
  return createSelector(
    getMultiCartsEntities,
    (state: EntityLoaderState<NewCartState>) =>
      entityValueSelector(state, cartId)
  );
};

// TODO: check for nulls
export const getCartEntriesSelectorFactory = (
  cartId: string
): MemoizedSelector<StateWithMultiCart, OrderEntry[]> => {
  return createSelector(
    getMultiCartsEntities,
    (state: EntityLoaderState<NewCartState>) =>
      entityValueSelector(state, cartId) && entityValueSelector(state, cartId).content ? entityValueSelector(state, cartId).content.entries : []
  );
};

// TODO: checks for nulls
export const getCartEntrySelectorFactory = (
  cartId: string,
  productCode: string
): MemoizedSelector<StateWithMultiCart, OrderEntry> => {
  return createSelector(
    getMultiCartsEntities,
    (state: EntityLoaderState<NewCartState>) =>
      entityValueSelector(state, cartId) && entityValueSelector(state, cartId).content && entityValueSelector(state, cartId).content.entries ? entityValueSelector(state, cartId).content.entries.find(
        entry => '' + entry.product.code ===  '' + productCode
      ) : null
  );
};

export const getActiveCartId: MemoizedSelector<
  StateWithMultiCart,
  string
> = createSelector(
  getMultiCartsState,
  (state: MultiCartState) => state.active
);
