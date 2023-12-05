import { MemoizedSelector } from '@ngrx/store';
import { StateWithUser } from '../user-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
export declare const getCustomerCouponsState: MemoizedSelector<StateWithUser, LoaderState<CustomerCouponSearchResult>>;
export declare const getCustomerCouponsLoaded: MemoizedSelector<StateWithUser, boolean>;
export declare const getCustomerCouponsLoading: MemoizedSelector<StateWithUser, boolean>;
export declare const getCustomerCoupons: MemoizedSelector<StateWithUser, CustomerCouponSearchResult>;
