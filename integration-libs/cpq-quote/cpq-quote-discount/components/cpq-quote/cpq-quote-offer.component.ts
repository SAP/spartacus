/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Optional, OnDestroy, OnInit, Inject } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CpqDiscounts } from '../../../root/model';
import { EMPTY, Observable, Subscription } from 'rxjs';

// Extend the OrderEntry interface to include cpqDiscounts property
interface ExtendedOrderEntry extends OrderEntry {
  cpqDiscounts?: CpqDiscounts[];
}

@Component({
  selector: 'cx-cpq-quote-offer',
  templateUrl: './cpq-quote-offer.component.html',
})
export class CpqQuoteOfferComponent implements OnInit, OnDestroy {
  quoteDiscountData: ExtendedOrderEntry | null;
  private subscription: Subscription;
  readonly orderEntry$: Observable<ExtendedOrderEntry> = // Use ExtendedOrderEntry here
    this.cartItemContext?.item$ ?? EMPTY;

  constructor(
    @Optional()
    @Inject(CartItemContext)
    protected cartItemContext: CartItemContext
  ) {}

  ngOnInit(): void {
    if (this.cartItemContext) {
      this.subscription = this.orderEntry$.subscribe((data) => {
        this.quoteDiscountData = data;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
