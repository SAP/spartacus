/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Converter, Occ } from '@spartacus/core';
import {
  OpfGiftCardSummary,
  OpfGiftCards,
} from '@spartacus/opf/gift-card/root';

import { Cart } from '@spartacus/cart/base/root';
import { Injectable } from '@angular/core';

/**
 * Normalizer for Cart that maps backend gift card data:
 * - sapGiftCards -> opfGiftCards
 * - sapGiftCardSummary -> opfGiftCardSummary
 */
@Injectable({
  providedIn: 'root',
})
export class OpfGiftCardCartOccNormalizer
  implements Converter<Occ.Cart, Cart>
{
  convert(source: Occ.Cart, target?: Cart): Cart {
    target ??= { ...(source as any) } as Cart;

    // Map sapGiftCards to opfGiftCards
    const sapGiftCards = (source as any).sapGiftCards;
    if (sapGiftCards && Array.isArray(sapGiftCards)) {
      target.opfGiftCards = sapGiftCards.map((card: any) =>
        this.convertGiftCard(card)
      );
    }

    // Map sapGiftCardSummary to opfGiftCardSummary
    const sapGiftCardSummary = (source as any).sapGiftCardSummary;
    if (sapGiftCardSummary) {
      target.opfGiftCardSummary = this.convertGiftCardSummary(
        sapGiftCardSummary
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
