/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Converter } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { OpfGiftCardSummary } from '@spartacus/opf/gift-card/root';
import { Order } from '@spartacus/order/root';

/**
 * Normalizer for Order that maps backend gift card data:
 * - sapGiftCardSummary -> opfGiftCardSummary
 */
@Injectable({
  providedIn: 'root',
})
export class OpfGiftCardOrderOccNormalizer implements Converter<any, Order> {
  convert(source: any, target?: Order): Order {
    if (target === undefined) {
      target = { ...(source as any) } as Order;
    }

    // Map sapGiftCardSummary to opfGiftCardSummary
    if (source.sapGiftCardSummary) {
      target.opfGiftCardSummary =
        this.convertGiftCardSummary(source.sapGiftCardSummary);
    }

    return target;
  }

  private convertGiftCardSummary(source: any): OpfGiftCardSummary {
    return {
      totalBalance: source.totalBalance,
      totalAppliedAmount: source.totalAppliedAmount,
      totalRemainingBalance: source.totalRemainingBalance,
      giftCardsCoverFullAmount: source.giftCardsCoverFullAmount ?? false,
    };
  }
}
