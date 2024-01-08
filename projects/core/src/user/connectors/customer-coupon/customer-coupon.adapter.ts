/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import {
  CustomerCoupon2Customer,
  CustomerCouponNotification,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';

export abstract class CustomerCouponAdapter {
  abstract getCustomerCoupons(
    userId: string,
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): Observable<CustomerCouponSearchResult>;

  abstract turnOnNotification(
    userId: string,
    couponCode: string
  ): Observable<CustomerCouponNotification>;

  abstract turnOffNotification(
    userId: string,
    couponCode: string
  ): Observable<{}>;

  abstract claimCustomerCoupon(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon2Customer>;

  abstract disclaimCustomerCoupon(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon2Customer>;
}
