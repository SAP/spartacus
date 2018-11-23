import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromCart from './../reducers/cart.reducer';

export const getActiveCartState: MemoizedSelector<
  any,
  fromCart.CartState
> = createSelector(
  fromFeature.getCartState,
  (cartState: fromFeature.CartState) => cartState.active
);

export const getActiveCart: MemoizedSelector<any, any> = createSelector(
  getActiveCartState,
  fromCart.getCartContent
);

export const getRefresh: MemoizedSelector<any, boolean> = createSelector(
  getActiveCartState,
  fromCart.getRefresh
);

export const getLoaded: MemoizedSelector<any, boolean> = createSelector(
  getActiveCartState,
  fromCart.getLoaded
);

export const getCartMergeComplete: MemoizedSelector<
  any,
  boolean
> = createSelector(getActiveCartState, fromCart.getCartMergeComplete);

export const getEntriesMap: MemoizedSelector<any, any> = createSelector(
  getActiveCartState,
  fromCart.getEntries
);

export const getEntrySelectorFactory = (
  productCode
): MemoizedSelector<any, any> => {
  return createSelector(getEntriesMap, entries => {
    if (entries) {
      return entries[productCode];
    }
  });
};

export const getEntries: MemoizedSelector<any, any> = createSelector(
  getEntriesMap,
  entities => {
    return Object.keys(entities).map(code => entities[code]);
  }
);
