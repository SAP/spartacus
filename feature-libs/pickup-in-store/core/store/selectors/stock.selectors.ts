import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { StateWithStock, StockLevelState, StockState } from '../stock-state';
import { getStoreFinderState } from './feature.selector';

export const getStockState: MemoizedSelector<
  StateWithStock,
  StateUtils.LoaderState<StockLevelState>
> = createSelector(
  getStoreFinderState,
  (stockState: StockState) => stockState.stock
);

export const getFindStoresEntities: MemoizedSelector<
  StateWithStock,
  StockLevelState
> = createSelector(getStockState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getStoresLoading: MemoizedSelector<StateWithStock, boolean> =
  createSelector(getStockState, (state) =>
    StateUtils.loaderLoadingSelector(state)
  );

export const getStoresSuccess: MemoizedSelector<StateWithStock, boolean> =
  createSelector(getStockState, (state) =>
    StateUtils.loaderSuccessSelector(state)
  );
