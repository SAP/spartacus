/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Optional, OnDestroy, OnInit, Inject } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';

import { Observable, Subscription } from 'rxjs';
import { CpqQuoteService } from '../../cpq-qute.service';
import { CpqDiscounts } from '@spartacus/cpq-quote/root';
interface ExtendedOrderEntry extends OrderEntry {
  cpqDiscounts?: CpqDiscounts[];
}

@Component({
  selector: 'cx-cpq-quote',
  templateUrl: './cpq-quote.component.html',
})
export class CpqQuoteDiscountComponent implements OnInit, OnDestroy {
  quoteDiscountData: ExtendedOrderEntry | null;
  private subscription: Subscription;
  readonly orderEntry$: Observable<ExtendedOrderEntry> =
    this.cartItemContext?.item$;
  isFlagQuote = true;
  constructor(
    @Optional()
    @Inject(CartItemContext)
    protected cartItemContext: CartItemContext,
    private cpqQuoteService: CpqQuoteService
  ) {
    this.subscription = this.cpqQuoteService.isFlag$.subscribe((isFlag) => {
      this.isFlagQuote = isFlag;
    });
  }

  ngOnInit(): void {
    if (this.cartItemContext) {
      this.subscription = this.orderEntry$.subscribe((data) => {
        this.quoteDiscountData = data;
      });
    } else {
      this.quoteDiscountData = null;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  getDiscountedPrice(
    basePrice: number | undefined,
    discountPercentage: number | undefined
  ): number | undefined {
    if (basePrice !== undefined && discountPercentage !== undefined) {
      const discountAmount = (basePrice * discountPercentage) / 100;
      return basePrice - discountAmount;
    }
  }
}
