/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CustomerCoupon2Customer,
  CustomerCouponNotification,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';
import { CustomerCouponAdapter } from './customer-coupon.adapter';

@Injectable({
  providedIn: 'root',
})
export class CustomerCouponConnector {
  constructor(protected adapter: CustomerCouponAdapter) {}

  getCustomerCoupons(
    userId: string,
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): Observable<CustomerCouponSearchResult> {
    return this.adapter.getCustomerCoupons(userId, pageSize, currentPage, sort);
  }

  turnOnNotification(
    userId: string,
    couponCode: string
  ): Observable<CustomerCouponNotification> {
    return this.adapter.turnOnNotification(userId, couponCode);
  }

  turnOffNotification(userId: string, couponCode: string): Observable<{}> {
    return this.adapter.turnOffNotification(userId, couponCode);
  }

  claimCustomerCoupon(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon2Customer> {
    return this.adapter.claimCustomerCoupon(userId, couponCode);
  }

  disclaimCustomerCoupon(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon2Customer> {
    return this.adapter.disclaimCustomerCoupon(userId, couponCode);
  }
}
