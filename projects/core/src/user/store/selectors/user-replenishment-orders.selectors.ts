import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrdersState: MemoizedSelector<
  StateWithUser,
  LoaderState<ReplenishmentOrderList>
> = createSelector(
  getUserState,
  (state: UserState) => state.replenishmentOrders
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrders: MemoizedSelector<
  StateWithUser,
  ReplenishmentOrderList
> = createSelector(
  getReplenishmentOrdersState,
  (state: LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderValueSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrdersLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderLoadingSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrdersError: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderErrorSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrdersSuccess: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderSuccessSelector(state)
);
