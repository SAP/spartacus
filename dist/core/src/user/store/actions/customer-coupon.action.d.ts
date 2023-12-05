import { CustomerCoupon2Customer, CustomerCouponNotification, CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { EntityFailAction, EntityLoadAction, EntityLoaderResetAction, EntitySuccessAction } from '../../../state/utils/entity-loader/entity-loader.action';
import { LoaderFailAction, LoaderLoadAction, LoaderResetAction, LoaderSuccessAction } from '../../../state/utils/loader/loader.action';
export declare const LOAD_CUSTOMER_COUPONS = "[User] Load Customer Coupons";
export declare const LOAD_CUSTOMER_COUPONS_FAIL = "[User] Load Customer Coupons Fail";
export declare const LOAD_CUSTOMER_COUPONS_SUCCESS = "[User] Load Customer Coupons Success";
export declare const RESET_LOAD_CUSTOMER_COUPONS = "[User] Reset Load Customer Coupons";
export declare const SUBSCRIBE_CUSTOMER_COUPON = "[User] Subscribe Customer Notification Coupon";
export declare const SUBSCRIBE_CUSTOMER_COUPON_FAIL = "[User] Subscribe Customer Coupon Notification Fail";
export declare const SUBSCRIBE_CUSTOMER_COUPON_SUCCESS = "[User] Subscribe Customer Coupon Notification Success";
export declare const RESET_SUBSCRIBE_CUSTOMER_COUPON_PROCESS = "[User] Reset Subscribe Customer Coupon Process";
export declare const UNSUBSCRIBE_CUSTOMER_COUPON = "[User] Unsubscribe Customer Notification Coupon";
export declare const UNSUBSCRIBE_CUSTOMER_COUPON_FAIL = "[User] Unsubscribe Customer Coupon Notification Fail";
export declare const UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS = "[User] Unsubscribe Customer Coupon Notification Success";
export declare const RESET_UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS = "[User] Reset Unsubscribe Customer Coupon Process";
export declare const CLAIM_CUSTOMER_COUPON = "[User] Claim Customer";
export declare const CLAIM_CUSTOMER_COUPON_FAIL = "[User] Claim Customer Fail";
export declare const CLAIM_CUSTOMER_COUPON_SUCCESS = "[User] Claim Customer Success";
export declare const DISCLAIM_CUSTOMER_COUPON = "[User] Disclaim Customer";
export declare const DISCLAIM_CUSTOMER_COUPON_FAIL = "[User] Disclaim Customer Fail";
export declare const DISCLAIM_CUSTOMER_COUPON_SUCCESS = "[User] Disclaim Customer Success";
export declare const RESET_DISCLAIM_CUSTOMER_COUPON = "[User] Reset Disclaim Customer";
export declare class LoadCustomerCoupons extends LoaderLoadAction {
    payload: {
        userId: string;
        pageSize: number;
        currentPage?: number;
        sort?: string;
    };
    readonly type = "[User] Load Customer Coupons";
    constructor(payload: {
        userId: string;
        pageSize: number;
        currentPage?: number;
        sort?: string;
    });
}
export declare class LoadCustomerCouponsFail extends LoaderFailAction {
    payload: any;
    readonly type = "[User] Load Customer Coupons Fail";
    constructor(payload: any);
}
export declare class LoadCustomerCouponsSuccess extends LoaderSuccessAction {
    payload: CustomerCouponSearchResult;
    readonly type = "[User] Load Customer Coupons Success";
    constructor(payload: CustomerCouponSearchResult);
}
export declare class ResetLoadCustomerCoupons extends LoaderResetAction {
    readonly type = "[User] Reset Load Customer Coupons";
    constructor();
}
export declare class SubscribeCustomerCoupon extends EntityLoadAction {
    payload: {
        userId: string;
        couponCode: string;
    };
    readonly type = "[User] Subscribe Customer Notification Coupon";
    constructor(payload: {
        userId: string;
        couponCode: string;
    });
}
export declare class SubscribeCustomerCouponFail extends EntityFailAction {
    payload: any;
    readonly type = "[User] Subscribe Customer Coupon Notification Fail";
    constructor(payload: any);
}
export declare class SubscribeCustomerCouponSuccess extends EntitySuccessAction {
    payload: CustomerCouponNotification;
    readonly type = "[User] Subscribe Customer Coupon Notification Success";
    constructor(payload: CustomerCouponNotification);
}
export declare class ResetSubscribeCustomerCouponProcess extends EntityLoaderResetAction {
    readonly type = "[User] Reset Subscribe Customer Coupon Process";
    constructor();
}
export declare class UnsubscribeCustomerCoupon extends EntityLoadAction {
    payload: {
        userId: string;
        couponCode: string;
    };
    readonly type = "[User] Unsubscribe Customer Notification Coupon";
    constructor(payload: {
        userId: string;
        couponCode: string;
    });
}
export declare class UnsubscribeCustomerCouponFail extends EntityFailAction {
    payload: any;
    readonly type = "[User] Unsubscribe Customer Coupon Notification Fail";
    constructor(payload: any);
}
export declare class UnsubscribeCustomerCouponSuccess extends EntitySuccessAction {
    payload: any;
    readonly type = "[User] Unsubscribe Customer Coupon Notification Success";
    constructor(payload: any);
}
export declare class ResetUnsubscribeCustomerCouponProcess extends EntityLoaderResetAction {
    readonly type = "[User] Reset Unsubscribe Customer Coupon Process";
    constructor();
}
export declare class ClaimCustomerCoupon extends EntityLoadAction {
    payload: {
        userId: string;
        couponCode: string;
    };
    readonly type = "[User] Claim Customer";
    constructor(payload: {
        userId: string;
        couponCode: string;
    });
}
export declare class DisclaimCustomerCoupon extends EntityLoadAction {
    payload: {
        userId: string;
        couponCode: string;
    };
    readonly type = "[User] Disclaim Customer";
    constructor(payload: {
        userId: string;
        couponCode: string;
    });
}
export declare class ResetDisclaimCustomerCoupon extends EntityLoaderResetAction {
    readonly type = "[User] Reset Disclaim Customer";
    constructor();
}
export declare class DisclaimCustomerCouponFail extends EntityFailAction {
    payload: any;
    readonly type = "[User] Disclaim Customer Fail";
    constructor(payload: any);
}
export declare class DisclaimCustomerCouponSuccess extends EntitySuccessAction {
    payload: CustomerCoupon2Customer;
    readonly type = "[User] Disclaim Customer Success";
    constructor(payload: CustomerCoupon2Customer);
}
export declare class ClaimCustomerCouponFail extends EntityFailAction {
    payload: any;
    readonly type = "[User] Claim Customer Fail";
    constructor(payload: any);
}
export declare class ClaimCustomerCouponSuccess extends EntitySuccessAction {
    payload: CustomerCoupon2Customer;
    readonly type = "[User] Claim Customer Success";
    constructor(payload: CustomerCoupon2Customer);
}
export type CustomerCouponAction = LoadCustomerCoupons | LoadCustomerCouponsFail | LoadCustomerCouponsSuccess | ResetLoadCustomerCoupons | SubscribeCustomerCoupon | SubscribeCustomerCouponFail | SubscribeCustomerCouponSuccess | ResetSubscribeCustomerCouponProcess | UnsubscribeCustomerCoupon | UnsubscribeCustomerCouponFail | UnsubscribeCustomerCouponSuccess | ResetUnsubscribeCustomerCouponProcess | ClaimCustomerCoupon | ClaimCustomerCouponFail | ClaimCustomerCouponSuccess | DisclaimCustomerCoupon | DisclaimCustomerCouponFail | DisclaimCustomerCouponSuccess | ResetDisclaimCustomerCoupon;
