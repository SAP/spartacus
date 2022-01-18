import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrderState: MemoizedSelector<
  StateWithUser,
  LoaderState<ReplenishmentOrder>
> = createSelector(
  getUserState,
  (state: UserState) => state.replenishmentOrder
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrderDetailsValue: MemoizedSelector<
  StateWithUser,
  ReplenishmentOrder
> = createSelector(
  getReplenishmentOrderState,
  (state: LoaderState<ReplenishmentOrder>) =>
    StateUtils.loaderValueSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrderDetailsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getReplenishmentOrderState,
  (state: LoaderState<ReplenishmentOrder>) =>
    StateUtils.loaderLoadingSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrderDetailsSuccess: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getReplenishmentOrderState,
  (state: LoaderState<ReplenishmentOrder>) =>
    StateUtils.loaderSuccessSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getReplenishmentOrderDetailsError: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getReplenishmentOrderState,
  (state: LoaderState<ReplenishmentOrder>) =>
    StateUtils.loaderErrorSelector(state)
);
