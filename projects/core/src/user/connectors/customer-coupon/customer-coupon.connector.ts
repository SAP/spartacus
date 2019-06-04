import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CustomerCoupon, CustomerCouponSearchResult} from '../../../model/customer-coupon.model';
import {CustomerCouponAdapter} from './customer-coupon.adapter';

@Injectable({
  providedIn: 'root',
})

export class CustomerCouponConnector {
  constructor(protected adapter: CustomerCouponAdapter) {}

  getAll(userId: string): Observable<CustomerCouponSearchResult> {
    return this.adapter.loadAll(userId);
  }

  subscribe(userId: string, couponCode: string): Observable<CustomerCoupon> {
    return this.adapter.subscribe(userId, couponCode);
  }

  unsubscribe(userId: string, couponCode: string): Observable<{}> {
    return this.adapter.unsubscribe(userId, couponCode);
  }
}
