import { USER_COUPONS } from '../user-state';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import {CustomerCoupon, CustomerCouponSearchResult} from '../../../model/customer-coupon.model';

export const LOAD_CUSTOMER_COUPONS = '[User] Load Customer Coupons';
export const LOAD_CUSTOMER_COUPONS_FAIL = '[User] Load Customer Coupons Fail';
export const LOAD_CUSTOMER_COUPONS_SUCCESS =
  '[User] Load Customer Coupons Success';

export const SUBSCRIBE_CUSTOMER_COUPON = '[User] Subscribe Customer Coupon';
export const SUBSCRIBE_CUSTOMER_COUPON_FAIL =
  '[User] Subscribe Customer Coupon Fail';
export const SUBSCRIBE_CUSTOMER_COUPON_SUCCESS =
  '[User] Subscribe Customer Coupon Success';

export const UNSUBSCRIBE_CUSTOMER_COUPON = '[User] Unsubscribe Customer Coupon';
export const UNSUBSCRIBE_CUSTOMER_COUPON_FAIL =
  '[User] Unsubscribe Customer Coupon Fail';
export const UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS =
  '[User] Unsubscribe Customer Coupon Success';

export class LoadCustomerCoupons extends LoaderLoadAction {
  readonly type = LOAD_CUSTOMER_COUPONS;
  constructor(public payload: {
    userId: string;
    pageSize: number;
    currentPage?: number;
    sort?: string;
  }) {
    super(USER_COUPONS);
  }
}

export class LoadCustomerCouponsFail extends LoaderFailAction {
  readonly type = LOAD_CUSTOMER_COUPONS_FAIL;
  constructor(public payload: any) {
    super(USER_COUPONS, payload);
  }
}

export class LoadCustomerCouponsSuccess extends LoaderSuccessAction {
  readonly type = LOAD_CUSTOMER_COUPONS_SUCCESS;
  constructor(public payload: CustomerCouponSearchResult) {
    super(USER_COUPONS);
  }
}

// Subscribe coupon notification actions
export class SubscribeCustomerCoupon extends LoaderLoadAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON;
  constructor(public payload: { userId: string; couponCode: string }) {
    super(USER_COUPONS);
  }
}

export class SubscribeCustomerCouponFail extends LoaderFailAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON_FAIL;
  constructor(public payload: any) {
    super(USER_COUPONS, payload);
  }
}

export class SubscribeCustomerCouponSuccess extends LoaderSuccessAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON_SUCCESS;
  constructor(public payload: CustomerCoupon) {
    super(USER_COUPONS);
  }
}

// Unsubscribe address actions
export class UnsubscribeCustomerCoupon extends LoaderLoadAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON;
  constructor(
    public payload: { userId: string; couponCode: string }
  ) {
    super(USER_COUPONS);
  }
}

export class UnsubscribeCustomerCouponFail extends LoaderFailAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON_FAIL;
  constructor(public payload: any) {
    super(USER_COUPONS, payload);
  }
}

export class UnsubscribeCustomerCouponSuccess extends LoaderSuccessAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS;
  constructor(public payload: any) {
    super(USER_COUPONS);
  }
}

// action types
export type CustomerCouponAction =
  | LoadCustomerCoupons
  | LoadCustomerCouponsFail
  | LoadCustomerCouponsSuccess
  | SubscribeCustomerCoupon
  | SubscribeCustomerCouponFail
  | SubscribeCustomerCouponSuccess
  | UnsubscribeCustomerCoupon
  | UnsubscribeCustomerCouponFail
  | UnsubscribeCustomerCouponSuccess;
