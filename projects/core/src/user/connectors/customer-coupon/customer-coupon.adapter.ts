import { Observable } from 'rxjs';
import {CustomerCoupon, CustomerCouponSearchResult} from '../../../model/customer-coupon.model';

export abstract class CustomerCouponAdapter {
  abstract loadAll(userId: string): Observable<CustomerCouponSearchResult>;

  abstract subscribe(userId: string, couponCode: string): Observable<CustomerCoupon>;

  abstract unsubscribe(userId: string, couponCode: string): Observable<{}>;
}
