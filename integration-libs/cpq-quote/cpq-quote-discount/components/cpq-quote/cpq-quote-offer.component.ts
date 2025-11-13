/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CpqDiscounts } from '@spartacus/cpq-quote/root';
import { EMPTY, Observable, Subscription } from 'rxjs';

// Extend the OrderEntry interface to include cpqDiscounts property
interface ExtendedOrderEntry extends OrderEntry {
  cpqDiscounts?: CpqDiscounts[];
}

@Component({
  selector: 'cx-cpq-quote-offer',
  templateUrl: './cpq-quote-offer.component.html',
  standalone: false,
})
export class CpqQuoteOfferComponent implements OnInit, OnDestroy {
  protected cartItemContext = inject<CartItemContext>(CartItemContext, {
    optional: true,
  });

  quoteDiscountData: ExtendedOrderEntry | null;
  private subscription: Subscription;
  readonly orderEntry$: Observable<ExtendedOrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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

  getDiscountPercentage(
    basePrice: number,
    appliedDiscount: number | undefined,
    quantity: number | undefined
  ): number | undefined {
    if (
      basePrice > 0 &&
      appliedDiscount !== undefined &&
      quantity !== undefined &&
      quantity > 0
    ) {
      const totalBasePrice = basePrice * quantity;
      return (appliedDiscount / totalBasePrice) * 100;
    }
    return undefined;
  }

  formatDiscount(value: number | undefined): string {
    if (value === undefined) {
      return '';
    }
    return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2);
  }
}
