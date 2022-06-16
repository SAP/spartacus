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

export const getStockEntities: MemoizedSelector<
  StateWithStock,
  StockLevelState
> = createSelector(getStockState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getStockLoading: MemoizedSelector<StateWithStock, boolean> =
  createSelector(getStockState, (state) =>
    StateUtils.loaderLoadingSelector(state)
  );

export const getStockSuccess: MemoizedSelector<StateWithStock, boolean> =
  createSelector(getStockState, (state) =>
    StateUtils.loaderSuccessSelector(state)
  );

export const getStockError: MemoizedSelector<StateWithStock, boolean> =
  createSelector(getStockState, (state) =>
    StateUtils.loaderErrorSelector(state)
  );

export const getSearchHasBeenPerformed: MemoizedSelector<
  StateWithStock,
  boolean
> = createSelector(
  getStockLoading,
  getStockSuccess,
  getStockError,
  (_getStockLoading, _getStockSuccess, _getStockError) =>
    (_getStockLoading || _getStockSuccess || _getStockError)
);
