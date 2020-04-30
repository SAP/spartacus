import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserState, StateWithUser } from '../user-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderSuccessSelector,
  loaderLoadingSelector,
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';

export const getCustomerCouponsState: MemoizedSelector<
  StateWithUser,
  LoaderState<CustomerCouponSearchResult>
> = createSelector(getUserState, (state: UserState) => state.customerCoupons);

export const getCustomerCouponsLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getCustomerCouponsState,
  (state: LoaderState<CustomerCouponSearchResult>) =>
    loaderSuccessSelector(state)
);

export const getCustomerCouponsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getCustomerCouponsState,
  (state: LoaderState<CustomerCouponSearchResult>) =>
    loaderLoadingSelector(state)
);

export const getCustomerCoupons: MemoizedSelector<
  StateWithUser,
  CustomerCouponSearchResult
> = createSelector(
  getCustomerCouponsState,
  (state: LoaderState<CustomerCouponSearchResult>) => loaderValueSelector(state)
);
