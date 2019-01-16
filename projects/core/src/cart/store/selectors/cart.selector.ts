import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { Cart, OrderEntry } from '../../../occ/occ-models/index';
import {
  CartState,
  CartsState,
  StateWithCart,
  CART_FEATURE
} from '../cart-state';
import {
  loaderSuccessSelector,
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';
import { LoaderState } from 'projects/core/src/state';

export const getCartContentSelector = (state: CartState) => state.content;
export const getRefreshSelector = (state: CartState) => state.refresh;
export const getEntriesSelector = (state: CartState) => state.entries;
export const getCartMergeCompleteSelector = (state: CartState) =>
  state.cartMergeComplete;

export const getCartsState: MemoizedSelector<
  StateWithCart,
  CartsState
> = createFeatureSelector<CartsState>(CART_FEATURE);

export const getActiveCartState: MemoizedSelector<
  StateWithCart,
  LoaderState<CartState>
> = createSelector(
  getCartsState,
  (cartsState: CartsState) => cartsState.active
);

export const getCartState: MemoizedSelector<
  StateWithCart,
  CartState
> = createSelector(
  getActiveCartState,
  state => loaderValueSelector(state)
);

export const getCartContent: MemoizedSelector<
  StateWithCart,
  Cart
> = createSelector(
  getCartState,
  getCartContentSelector
);

export const getRefresh: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(
  getCartState,
  getRefreshSelector
);

export const getLoaded: MemoizedSelector<any, boolean> = createSelector(
  getActiveCartState,
  state =>
    loaderSuccessSelector(state) &&
    !loaderLoadingSelector(state) &&
    !loaderValueSelector(state).refresh
);

export const getCartMergeComplete: MemoizedSelector<
  StateWithCart,
  boolean
> = createSelector(
  getCartState,
  getCartMergeCompleteSelector
);

export const getEntriesMap: MemoizedSelector<
  any,
  { [code: string]: OrderEntry }
> = createSelector(
  getCartState,
  getEntriesSelector
);

export const getEntrySelectorFactory = (
  productCode
): MemoizedSelector<any, OrderEntry> => {
  return createSelector(
    getEntriesMap,
    entries => {
      if (entries) {
        return entries[productCode];
      }
    }
  );
};

export const getEntries: MemoizedSelector<any, OrderEntry[]> = createSelector(
  getEntriesMap,
  entities => {
    return Object.keys(entities).map(code => entities[code]);
  }
);
