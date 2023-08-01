/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CustomerCoupon2Customer,
  CustomerCouponNotification,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';
import { PROCESS_FEATURE } from '../../../process/store';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityLoaderResetAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderResetAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import {
  CLAIM_CUSTOMER_COUPON_PROCESS_ID,
  CUSTOMER_COUPONS,
  DISCLAIM_CUSTOMER_COUPON_PROCESS_ID,
  SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
  UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
} from '../user-state';

export const LOAD_CUSTOMER_COUPONS = '[User] Load Customer Coupons';
export const LOAD_CUSTOMER_COUPONS_FAIL = '[User] Load Customer Coupons Fail';
export const LOAD_CUSTOMER_COUPONS_SUCCESS =
  '[User] Load Customer Coupons Success';
export const RESET_LOAD_CUSTOMER_COUPONS = '[User] Reset Load Customer Coupons';

export const SUBSCRIBE_CUSTOMER_COUPON =
  '[User] Subscribe Customer Notification Coupon';
export const SUBSCRIBE_CUSTOMER_COUPON_FAIL =
  '[User] Subscribe Customer Coupon Notification Fail';
export const SUBSCRIBE_CUSTOMER_COUPON_SUCCESS =
  '[User] Subscribe Customer Coupon Notification Success';
export const RESET_SUBSCRIBE_CUSTOMER_COUPON_PROCESS =
  '[User] Reset Subscribe Customer Coupon Process';

export const UNSUBSCRIBE_CUSTOMER_COUPON =
  '[User] Unsubscribe Customer Notification Coupon';
export const UNSUBSCRIBE_CUSTOMER_COUPON_FAIL =
  '[User] Unsubscribe Customer Coupon Notification Fail';
export const UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS =
  '[User] Unsubscribe Customer Coupon Notification Success';
export const RESET_UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS =
  '[User] Reset Unsubscribe Customer Coupon Process';

export const CLAIM_CUSTOMER_COUPON = '[User] Claim Customer';
export const CLAIM_CUSTOMER_COUPON_FAIL = '[User] Claim Customer Fail';
export const CLAIM_CUSTOMER_COUPON_SUCCESS = '[User] Claim Customer Success';
export const DISCLAIM_CUSTOMER_COUPON = '[User] Disclaim Customer';
export const DISCLAIM_CUSTOMER_COUPON_FAIL = '[User] Disclaim Customer Fail';
export const DISCLAIM_CUSTOMER_COUPON_SUCCESS =
  '[User] Disclaim Customer Success';

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

export class ResetLoadCustomerCoupons extends LoaderResetAction {
  readonly type = RESET_LOAD_CUSTOMER_COUPONS;
  constructor() {
    super(CUSTOMER_COUPONS);
  }
}

// Subscribe coupon notification actions
export class SubscribeCustomerCoupon extends EntityLoadAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON;
  constructor(
    public payload: {
      userId: string;
      couponCode: string;
    }
  ) {
    super(PROCESS_FEATURE, SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID);
  }
}

export class SubscribeCustomerCouponFail extends EntityFailAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID, payload);
  }
}

export class SubscribeCustomerCouponSuccess extends EntitySuccessAction {
  readonly type = SUBSCRIBE_CUSTOMER_COUPON_SUCCESS;
  constructor(public payload: CustomerCouponNotification) {
    super(PROCESS_FEATURE, SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID, payload);
  }
}

export class ResetSubscribeCustomerCouponProcess extends EntityLoaderResetAction {
  readonly type = RESET_SUBSCRIBE_CUSTOMER_COUPON_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID);
  }
}

export class UnsubscribeCustomerCoupon extends EntityLoadAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON;
  constructor(
    public payload: {
      userId: string;
      couponCode: string;
    }
  ) {
    super(PROCESS_FEATURE, UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID);
  }
}

export class UnsubscribeCustomerCouponFail extends EntityFailAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID, payload);
  }
}

export class UnsubscribeCustomerCouponSuccess extends EntitySuccessAction {
  readonly type = UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID, payload);
  }
}

export class ResetUnsubscribeCustomerCouponProcess extends EntityLoaderResetAction {
  readonly type = RESET_UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID);
  }
}

export class ClaimCustomerCoupon extends EntityLoadAction {
  readonly type = CLAIM_CUSTOMER_COUPON;
  constructor(
    public payload: {
      userId: string;
      couponCode: string;
    }
  ) {
    super(PROCESS_FEATURE, CLAIM_CUSTOMER_COUPON_PROCESS_ID);
  }
}

export class DisclaimCustomerCoupon extends EntityLoadAction {
  readonly type = DISCLAIM_CUSTOMER_COUPON;
  constructor(
    public payload: {
      userId: string;
      couponCode: string;
    }
  ) {
    super(PROCESS_FEATURE, DISCLAIM_CUSTOMER_COUPON_PROCESS_ID);
  }
}

export class DisclaimCustomerCouponFail extends EntityFailAction {
  readonly type = DISCLAIM_CUSTOMER_COUPON_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, DISCLAIM_CUSTOMER_COUPON_PROCESS_ID, payload);
  }
}

export class DisclaimCustomerCouponSuccess extends EntitySuccessAction {
  readonly type = DISCLAIM_CUSTOMER_COUPON_SUCCESS;
  constructor(public payload: CustomerCoupon2Customer) {
    super(PROCESS_FEATURE, DISCLAIM_CUSTOMER_COUPON_PROCESS_ID, payload);
  }
}

export class ClaimCustomerCouponFail extends EntityFailAction {
  readonly type = CLAIM_CUSTOMER_COUPON_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, CLAIM_CUSTOMER_COUPON_PROCESS_ID, payload);
  }
}

export class ClaimCustomerCouponSuccess extends EntitySuccessAction {
  readonly type = CLAIM_CUSTOMER_COUPON_SUCCESS;
  constructor(public payload: CustomerCoupon2Customer) {
    super(PROCESS_FEATURE, CLAIM_CUSTOMER_COUPON_PROCESS_ID, payload);
  }
}

// action types
export type CustomerCouponAction =
  | LoadCustomerCoupons
  | LoadCustomerCouponsFail
  | LoadCustomerCouponsSuccess
  | ResetLoadCustomerCoupons
  | SubscribeCustomerCoupon
  | SubscribeCustomerCouponFail
  | SubscribeCustomerCouponSuccess
  | ResetSubscribeCustomerCouponProcess
  | UnsubscribeCustomerCoupon
  | UnsubscribeCustomerCouponFail
  | UnsubscribeCustomerCouponSuccess
  | ResetUnsubscribeCustomerCouponProcess
  | ClaimCustomerCoupon
  | ClaimCustomerCouponFail
  | ClaimCustomerCouponSuccess
  | DisclaimCustomerCoupon
  | DisclaimCustomerCouponFail
  | DisclaimCustomerCouponSuccess;
