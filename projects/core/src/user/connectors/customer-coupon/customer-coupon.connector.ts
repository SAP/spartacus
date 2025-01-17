/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CustomerCoupon2Customer,
  CustomerCouponNotification,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';
import { CustomerCouponAdapter } from './customer-coupon.adapter';
import { FeatureConfigService } from '../../../features-config/services/feature-config.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerCouponConnector {
  private featureConfigService = inject(FeatureConfigService);
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
    if (
      this.featureConfigService.isEnabled(
        'enableClaimCustomerCouponWithCodeInRequestBody'
      )
    ) {
      return this.adapter.claimCustomerCouponWithCodeInBody(userId, couponCode);
    } else {
      return this.adapter.claimCustomerCoupon(userId, couponCode);
    }
  }

  disclaimCustomerCoupon(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon2Customer> {
    return this.adapter.disclaimCustomerCoupon(userId, couponCode);
  }
}
