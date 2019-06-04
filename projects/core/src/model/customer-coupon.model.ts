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
