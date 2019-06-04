import { PaginationModel, SortModel } from './misc.model';
import { Principal } from './cart.model';
export interface CustomerCoupon {
  couponId?: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  description?: string;
  notificationOn?: string;
  solrFacets?: string;
}

export interface CustomerCouponNotification {
  coupon?: CustomerCoupon;
  customer?: Principal;
  status?: String;
}

export interface CustomerCouponSearchResult {
  coupons?: CustomerCoupon;
  sorts?: SortModel;
  pagination?: PaginationModel;
}
