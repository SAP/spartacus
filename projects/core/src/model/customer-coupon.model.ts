import { PaginationModel, SortModel } from './misc.model';

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

export interface CustomerCouponSearchResult {
  coupons?: CustomerCoupon[];
  sorts?: SortModel;
  pagination?: PaginationModel;
}
