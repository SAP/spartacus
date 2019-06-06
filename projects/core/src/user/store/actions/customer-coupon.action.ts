import { CUSTOMER_COUPONS } from '../user-state';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';

export const LOAD_CUSTOMER_COUPONS = '[User] Load Customer Coupons';
export const LOAD_CUSTOMER_COUPONS_FAIL = '[User] Load Customer Coupons Fail';
export const LOAD_CUSTOMER_COUPONS_SUCCESS =
  '[User] Load Customer Coupons Success';

export const SUBSCRIBE_CUSTOMER_COUPON =
  '[User] Subscribe Customer Notification Coupon';
export const SUBSCRIBE_CUSTOMER_COUPON_FAIL =
  '[User] Subscribe Customer Coupon Notification Fail';
export const SUBSCRIBE_CUSTOMER_COUPON_SUCCESS =
  '[User] Subscribe Customer Coupon Notification Success';

export const UNSUBSCRIBE_CUSTOMER_COUPON =
  '[User] Unsubscribe Customer Notification Coupon';
export const UNSUBSCRIBE_CUSTOMER_COUPON_FAIL =
  '[User] Unsubscribe Customer Coupon Notification Fail';
export const UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS =
  '[User] Unsubscribe Customer Coupon Notification Success';

export class LoadCustomerCoupons extends LoaderLoadAction {
  readonly type = LOAD_CUSTOMER_COUPONS;
  constructor(
    public payload: {
      userId: string;
      pageSize: number;
      currentPage?: number;
      sort?: string;
    }
  ) {
    super(CUSTOMER_COUPONS);
  }
}

export class LoadCustomerCouponsFail extends LoaderFailAction {
  readonly type = LOAD_CUSTOMER_COUPONS_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_COUPONS, payload);
  }
}

export class LoadCustomerCouponsSuccess extends LoaderSuccessAction {
  readonly type = LOAD_CUSTOMER_COUPONS_SUCCESS;
  constructor(public payload: CustomerCouponSearchResult) {
    super(CUSTOMER_COUPONS);
  }
}

// Subscribe coupon notification actions
export class SubscribeCustomerCoupon extends LoaderLoadAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON;
  constructor(public payload: { userId: string; couponCode: string }) {
    super(CUSTOMER_COUPONS);
  }
}

export class SubscribeCustomerCouponFail extends LoaderFailAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_COUPONS, payload);
  }
}

export class SubscribeCustomerCouponSuccess extends LoaderSuccessAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON_SUCCESS;
  constructor(public payload: CustomerCoupon) {
    super(CUSTOMER_COUPONS);
  }
}

// Unsubscribe address actions
export class UnsubscribeCustomerCoupon extends LoaderLoadAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON;
  constructor(public payload: { userId: string; couponCode: string }) {
    super(CUSTOMER_COUPONS);
  }
}

export class UnsubscribeCustomerCouponFail extends LoaderFailAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_COUPONS, payload);
  }
}

export class UnsubscribeCustomerCouponSuccess extends LoaderSuccessAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS;
  constructor(public payload: any) {
    super(CUSTOMER_COUPONS);
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
