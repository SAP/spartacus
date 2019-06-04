import {PaginationModel, SortModel, User} from './misc.model';

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
  customer?: User;
  status?: String;
}

export interface CustomerCouponSearchResult {
  coupons?: CustomerCoupon[];
  sorts?: SortModel;
  pagination?: PaginationModel;
}
