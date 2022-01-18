import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReplenishmentOrderList, StateUtils } from '@spartacus/core';
import { OrderState, StateWithOrder } from '../order-state';
import { getOrderState } from './feature.selector';

export const getReplenishmentOrdersState: MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<ReplenishmentOrderList>
> = createSelector(
  getOrderState,
  (state: OrderState) => state.replenishmentOrders
);

export const getReplenishmentOrders: MemoizedSelector<
  StateWithOrder,
  ReplenishmentOrderList
> = createSelector(
  getReplenishmentOrdersState,
  (state: StateUtils.LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderValueSelector(state)
);

export const getReplenishmentOrdersLoading: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: StateUtils.LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderLoadingSelector(state)
);

export const getReplenishmentOrdersError: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: StateUtils.LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderErrorSelector(state)
);

export const getReplenishmentOrdersSuccess: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: StateUtils.LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderSuccessSelector(state)
);
