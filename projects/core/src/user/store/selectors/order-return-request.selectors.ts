import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReturnRequest, ReturnRequestList } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrderReturnRequestState: MemoizedSelector<
  StateWithUser,
  LoaderState<ReturnRequest>
> = createSelector(getUserState, (state: UserState) => state.orderReturn);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrderReturnRequest: MemoizedSelector<
  StateWithUser,
  ReturnRequest
> = createSelector(
  getOrderReturnRequestState,
  (state: LoaderState<ReturnRequest>) => StateUtils.loaderValueSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrderReturnRequestLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getOrderReturnRequestState,
  (state: LoaderState<ReturnRequest>) => StateUtils.loaderLoadingSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrderReturnRequestSuccess: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getOrderReturnRequestState,
  (state: LoaderState<ReturnRequest>) =>
    StateUtils.loaderSuccessSelector(state) &&
    !StateUtils.loaderLoadingSelector(state)
);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrderReturnRequestListState: MemoizedSelector<
  StateWithUser,
  LoaderState<ReturnRequestList>
> = createSelector(getUserState, (state: UserState) => state.orderReturnList);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrderReturnRequestList: MemoizedSelector<
  StateWithUser,
  ReturnRequestList
> = createSelector(
  getOrderReturnRequestListState,
  (state: LoaderState<ReturnRequestList>) =>
    StateUtils.loaderValueSelector(state)
);
