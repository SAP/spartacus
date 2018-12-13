import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { Cart, OrderEntry } from '../../../occ/occ-models/index';
import { CartState, CartsState } from '../cart-state';

export const getCartContentSelector = (state: CartState) => state.content;
export const getRefreshSelector = (state: CartState) => state.refresh;
export const getEntriesSelector = (state: CartState) => state.entries;
export const getLoadedSelector = (state: CartState) => state.loaded;
export const getCartMergeCompleteSelector = (state: CartState) =>
  state.cartMergeComplete;

export const getCartState: MemoizedSelector<
  any,
  CartsState
> = createFeatureSelector<CartsState>('cart');

export const getActiveCartState: MemoizedSelector<
  any,
  CartState
> = createSelector(
  getCartState,
  (cartState: CartsState) => cartState.active
);

export const getActiveCart: MemoizedSelector<any, Cart> = createSelector(
  getActiveCartState,
  getCartContentSelector
);

export const getRefresh: MemoizedSelector<any, boolean> = createSelector(
  getActiveCartState,
  getRefreshSelector
);

export const getLoaded: MemoizedSelector<any, boolean> = createSelector(
  getActiveCartState,
  getLoadedSelector
);

export const getCartMergeComplete: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getActiveCartState,
  getCartMergeCompleteSelector
);

export const getEntriesMap: MemoizedSelector<
  any,
  { [code: string]: OrderEntry }
> = createSelector(
  getActiveCartState,
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
