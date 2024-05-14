/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-cpq-quote-heading',
  templateUrl: './cpq-quote-heading.component.html',
})
export class CpqQuoteHeadingComponent implements OnInit, OnDestroy {
  @Input()
  quoteDiscountData: OrderEntry;
  protected subscription = new Subscription();

  constructor(@Optional() protected outlet?: OutletContextData<any>) {}
  dataAvailable: boolean = false;
  ngOnInit(): void {
    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe((context) => {
          if (context && context.length > 0) {
            this.dataAvailable = context.some(
              (item: { cpqDiscounts: string | any[] }) =>
                item.cpqDiscounts && item.cpqDiscounts.length > 0
            );
          } else {
            this.dataAvailable = false;
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
