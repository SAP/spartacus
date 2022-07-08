import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PointOfServiceStock, StateUtils } from '@spartacus/core';
import { StateWithStock, StockLevelState } from '../stock-state';
import { getStockState } from './feature.selectors';
import { getHideOutOfStockState } from './hide-out-of-stock.selectors';

export const getStockLevelState: MemoizedSelector<
  StateWithStock,
  StateUtils.LoaderState<StockLevelState>
> = createSelector(getStockState, (stockState) => stockState.stockLevel);

export const getStockEntities: MemoizedSelector<
  StateWithStock,
  StockLevelState
> = createSelector(getStockLevelState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getStockLoading: MemoizedSelector<StateWithStock, boolean> =
  createSelector(getStockLevelState, (state) =>
    StateUtils.loaderLoadingSelector(state)
  );

export const getStockSuccess: MemoizedSelector<StateWithStock, boolean> =
  createSelector(getStockLevelState, (state) =>
    StateUtils.loaderSuccessSelector(state)
  );

export const getStockError: MemoizedSelector<StateWithStock, boolean> =
  createSelector(getStockLevelState, (state) =>
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
    _getStockLoading || _getStockSuccess || _getStockError
);

export const getStores: MemoizedSelector<
  StateWithStock,
  PointOfServiceStock[]
> = createSelector(
  getStockEntities,
  getHideOutOfStockState,
  (stockEntities, hideOutOfStock) =>
    (stockEntities.findStockLevelByCode.stores ?? []).filter(
      (store) => (store.stockInfo?.stockLevel ?? 0) > 0 || !hideOutOfStock
    )
);
