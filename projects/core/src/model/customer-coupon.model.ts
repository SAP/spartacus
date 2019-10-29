import { User } from './misc.model';
import { Pagination, Sort } from './unused.model';

export interface CustomerCoupon {
  couponId?: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  description?: string;
  notificationOn?: boolean;
  solrFacets?: string;
}

export interface CustomerCouponNotification {
  coupon?: CustomerCoupon;
  customer?: User;
  status?: String;
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
