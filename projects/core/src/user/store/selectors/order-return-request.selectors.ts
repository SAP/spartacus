import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReturnRequest, ReturnRequestList } from '../../../model/order.model';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateUtils } from '../../../state/utils/index';

export const getOrderReturnRequestState: MemoizedSelector<
  StateWithUser,
  LoaderState<ReturnRequest>
> = createSelector(getUserState, (state: UserState) => state.orderReturn);

export const getOrderReturnRequest: MemoizedSelector<
  StateWithUser,
  ReturnRequest
> = createSelector(
  getOrderReturnRequestState,
  (state: LoaderState<ReturnRequest>) => StateUtils.loaderValueSelector(state)
);

export const getOrderReturnRequestLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getOrderReturnRequestState,
  (state: LoaderState<ReturnRequest>) => StateUtils.loaderLoadingSelector(state)
);

export const getOrderReturnRequestSuccess: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getOrderReturnRequestState,
  (state: LoaderState<ReturnRequest>) =>
    StateUtils.loaderSuccessSelector(state) &&
    !StateUtils.loaderLoadingSelector(state)
);

export const getOrderReturnRequestListState: MemoizedSelector<
  StateWithUser,
  LoaderState<ReturnRequestList>
> = createSelector(getUserState, (state: UserState) => state.orderReturnList);

export const getOrderReturnRequestList: MemoizedSelector<
  StateWithUser,
  ReturnRequestList
> = createSelector(
  getOrderReturnRequestListState,
  (state: LoaderState<ReturnRequestList>) =>
    StateUtils.loaderValueSelector(state)
);
