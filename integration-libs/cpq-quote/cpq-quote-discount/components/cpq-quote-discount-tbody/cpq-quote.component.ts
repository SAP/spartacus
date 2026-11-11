/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';

import { DecimalPipe, NgClass } from '@angular/common';
import { CpqDiscounts } from '@spartacus/cpq-quote/root';
import { Observable, Subscription } from 'rxjs';
import { CpqQuoteService } from '../../cpq-qute.service';
interface ExtendedOrderEntry extends OrderEntry {
  cpqDiscounts?: CpqDiscounts[];
}

@Component({
  selector: 'cx-cpq-quote',
  templateUrl: './cpq-quote.component.html',
  imports: [NgClass, DecimalPipe],
})
export class CpqQuoteDiscountComponent implements OnInit, OnDestroy {
  protected cartItemContext = inject(CartItemContext, {
    optional: true,
  }) as CartItemContext;
  private cpqQuoteService = inject(CpqQuoteService);

  quoteDiscountData: ExtendedOrderEntry | null;
  private subscription: Subscription;
  readonly orderEntry$: Observable<ExtendedOrderEntry> =
    this.cartItemContext?.item$;
  isFlagQuote = true;
  protected cd = inject(ChangeDetectorRef);
  constructor() {
    this.subscription = this.cpqQuoteService.isFlag$.subscribe((isFlag) => {
      this.isFlagQuote = isFlag;
      this.cd.markForCheck();
    });
  }

  ngOnInit(): void {
    if (this.cartItemContext) {
      this.subscription = this.orderEntry$.subscribe((data) => {
        this.quoteDiscountData = data;
        // OnPush (v22 default): quoteDiscountData is read by the template and
        // set from an async subscribe, so mark for check.
        this.cd.markForCheck();
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
      const discountedPrice = totalBasePrice - appliedDiscount;
      return discountedPrice / quantity;
    }
    return undefined;
  }
}
