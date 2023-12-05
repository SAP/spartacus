import { User } from './misc.model';
import { Pagination, Sort } from './unused.model';
export interface CustomerCoupon {
    couponId?: string;
    name?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    description?: string;
    notificationOn?: boolean;
    allProductsApplicable?: boolean;
}
export interface CustomerCouponNotification {
    coupon?: CustomerCoupon;
    customer?: User;
    status?: string;
}
export interface CustomerCouponSearchResult {
    coupons?: CustomerCoupon[];
    sorts?: Sort[];
    pagination?: Pagination;
}
export interface CustomerCoupon2Customer {
    coupon?: CustomerCoupon;
    customer?: User;
}
