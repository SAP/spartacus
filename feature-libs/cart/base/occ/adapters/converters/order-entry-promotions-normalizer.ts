/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  PromotionOrderEntryConsumed,
  PromotionResult,
} from '@spartacus/cart/base/root';
import { Converter, Occ } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OrderEntryPromotionsNormalizer
  implements
    Converter<
      { item?: Occ.OrderEntry; promotions?: PromotionResult[] },
      PromotionResult[]
    >
{
  convert(
    source: { item?: Occ.OrderEntry; promotions?: PromotionResult[] },
    target?: PromotionResult[]
  ) {
    target = this.getProductPromotion(source.item, source.promotions);
    return target;
  }

  /**
   * Get consumed promotions for the given order entry
   *
   * @param item
   * @param promotions
   * @returns consumed promotions for this entry
   */
  getProductPromotion(
    item?: Occ.OrderEntry,
    promotions?: PromotionResult[]
  ): PromotionResult[] {
    const entryPromotions: PromotionResult[] = [];
    promotions?.forEach((promotion) => {
      if (promotion.description && promotion.consumedEntries) {
        for (const consumedEntry of promotion.consumedEntries) {
          if (this.isConsumedByEntry(consumedEntry, item)) {
            entryPromotions.push(promotion);
          }
        }
      }
    });

    return entryPromotions;
  }

  protected isConsumedByEntry(
    consumedEntry: PromotionOrderEntryConsumed,
    entry: any
  ): boolean {
    const consumedEntryNumber = consumedEntry.orderEntryNumber;
    if (entry && entry.entries && entry.entries.length > 0) {
      for (const subEntry of entry.entries) {
        if (subEntry.entryNumber === consumedEntryNumber) {
          return true;
        }
      }
      return false;
    } else {
      return consumedEntryNumber === entry?.entryNumber;
    }
  }
}

// CHECK SONAR
