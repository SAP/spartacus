import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { StateUtils } from '../../../state/utils/index';
import { StateWithUser, UserState } from '../user-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { getUserState } from './feature.selector';

export const getReplenishmentOrdersState: MemoizedSelector<
  StateWithUser,
  LoaderState<ReplenishmentOrderList>
> = createSelector(
  getUserState,
  (state: UserState) => state.replenishmetOrders
);

export const getReplenishmentOrdersLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderSuccessSelector(state)
);

export const getReplenishmentOrders: MemoizedSelector<
  StateWithUser,
  ReplenishmentOrderList
> = createSelector(
  getReplenishmentOrdersState,
  (state: LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderValueSelector(state)
);
