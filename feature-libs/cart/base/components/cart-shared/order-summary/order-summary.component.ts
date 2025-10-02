/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { AppliedCouponsComponent } from '../../cart-coupon/applied-coupons/applied-coupons.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-order-summary',
  templateUrl: './order-summary.component.html',
  imports: [NgIf, AppliedCouponsComponent, TranslatePipe, MockTranslatePipe],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  @Input()
  cart: Cart;

  protected subscription = new Subscription();

  constructor(@Optional() protected outlet?: OutletContextData<any>) {}

  ngOnInit(): void {
    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe((context) => (this.cart = context))
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
