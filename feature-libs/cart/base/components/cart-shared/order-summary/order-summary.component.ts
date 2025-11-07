/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-order-summary',
  templateUrl: './order-summary.component.html',
  standalone: false,
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  protected outlet? = inject<OutletContextData<any>>(OutletContextData, { optional: true });

  @Input()
  cart: Cart;

  protected subscription = new Subscription();

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
