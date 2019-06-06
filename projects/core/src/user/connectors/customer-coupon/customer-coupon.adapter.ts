import { Observable } from 'rxjs';
import {CustomerCoupon, CustomerCouponSearchResult} from '../../../model/customer-coupon.model';

export abstract class CustomerCouponAdapter {
  abstract getMyCoupons(userId: string, pageSize: number, currentPage: number, sort: string): Observable<CustomerCouponSearchResult>;

  abstract turnOnNotification(userId: string, couponCode: string): Observable<CustomerCoupon>;

  abstract turnOffNotification(userId: string, couponCode: string): Observable<{}>;
}
