/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfGiftCardSummary,
  OpfGiftCards,
} from '@spartacus/opf/gift-card/root';

import { Cart } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';
import { Injectable } from '@angular/core';

/**
 * Normalizer for Cart that maps backend gift card data:
 * - sapGiftCards -> opfGiftCards
 * - sapGiftCardSummary -> opfGiftCardSummary
 */
@Injectable({
  providedIn: 'root',
})
export class OpfGiftCardCartOccNormalizer implements Converter<any, Cart> {
  convert(source: any, target?: Cart): Cart {
    if (target === undefined) {
      target = { ...(source as any) } as Cart;
    }

    // Map sapGiftCards to opfGiftCards
    if (source.sapGiftCards && Array.isArray(source.sapGiftCards)) {
      target.opfGiftCards = source.sapGiftCards.map((card: any) =>
        this.convertGiftCard(card)
      );
    }

    // Map sapGiftCardSummary to opfGiftCardSummary
    if (source.sapGiftCardSummary) {
      target.opfGiftCardSummary = this.convertGiftCardSummary(
        source.sapGiftCardSummary
      );
    }

    return target;
  }

  private convertGiftCard(source: any): OpfGiftCards {
    return {
      id: source.id,
      maskedNumber: source.maskedNumber,
      balance: source.balance,
      appliedAmount: source.appliedAmount,
      remainingBalance: source.remainingBalance,
    };
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
