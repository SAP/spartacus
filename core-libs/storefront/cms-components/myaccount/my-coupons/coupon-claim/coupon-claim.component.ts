/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  CustomerCouponService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  template: '',
  selector: 'cx-coupon-claim',
})
export class CouponClaimComponent implements OnInit, OnDestroy {
  protected couponService = inject(CustomerCouponService);
  protected routingService = inject(RoutingService);
  protected messageService = inject(GlobalMessageService);

  subscription: Subscription;

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .subscribe((k) => {
        const couponCode = k.state.params.couponCode;
        if (couponCode) {
          this.couponService.claimCustomerCoupon(couponCode);
          this.subscription = this.couponService
            .getClaimCustomerCouponResultSuccess()
            .subscribe((success) => {
              if (success) {
                this.messageService.add(
                  { key: 'myCoupons.claimCustomerCoupon' },
                  GlobalMessageType.MSG_TYPE_CONFIRMATION
                );
              }
              this.routingService.go({ cxRoute: 'coupons' });
            });
        } else {
          this.routingService.go({ cxRoute: 'notFound' });
        }
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
