import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CustomerCoupon, CustomerCouponSearchResult} from '../../../model/customer-coupon.model';
import {CustomerCouponAdapter} from './customer-coupon.adapter';

@Injectable({
  providedIn: 'root',
})

export class CustomerCouponConnector {
  constructor(protected adapter: CustomerCouponAdapter) {}

  getMyCoupons(userId: string): Observable<CustomerCouponSearchResult> {
    return this.adapter.getMyCoupons(userId);
  }

  turnOnNotification(userId: string, couponCode: string): Observable<CustomerCoupon> {
    return this.adapter.turnOnNotification(userId, couponCode);
  }

  turnOffNotification(userId: string, couponCode: string): Observable<{}> {
    return this.adapter.turnOffNotification(userId, couponCode);
  }
}
