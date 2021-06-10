import { Injectable } from '@angular/core';
import { Cart, PromotionResult } from '../../../../model/cart.model';
import {
  Order,
  OrderEntry,
  PromotionOrderEntryConsumed,
} from '../../../../model/order.model';
import { ReplenishmentOrder } from '../../../../model/replenishment-order.model';
import { Converter } from '../../../../util/converter.service';

@Injectable({ providedIn: 'root' })
export class OrderEntryPromotionsNormalizer
  implements Converter<Order | Cart | ReplenishmentOrder, OrderEntry[]> {
  convert(
    source: Order | Cart | ReplenishmentOrder,
    target?: OrderEntry[]
  ): OrderEntry[] {
    if (target === undefined) {
      target = source.entries ?? [];
    }

    target = target.map((entry) => ({
      ...entry,
      promotions: this.getProductPromotion(
        entry,
        source.appliedProductPromotions
      ),
    }));

    return target;
  }

  protected getProductPromotion(
    item: OrderEntry,
    promotions?: PromotionResult[]
  ): PromotionResult[] {
    const entryPromotions: PromotionResult[] = [];
    if (promotions && promotions.length > 0) {
      for (const promotion of promotions) {
        if (
          promotion.description &&
          promotion.consumedEntries &&
          promotion.consumedEntries.length > 0
        ) {
          for (const consumedEntry of promotion.consumedEntries) {
            if (this.isConsumedByEntry(consumedEntry, item)) {
              entryPromotions.push(promotion);
            }
          }
        }
      }
    }
    return entryPromotions;
  }

  protected isConsumedByEntry(
    consumedEntry: PromotionOrderEntryConsumed,
    entry: any
  ): boolean {
    const consumedEntryNumber = consumedEntry.orderEntryNumber;
    if (entry.entries && entry.entries.length > 0) {
      for (const subEntry of entry.entries) {
        if (subEntry.entryNumber === consumedEntryNumber) {
          return true;
        }
      }
      return false;
    } else {
      return consumedEntryNumber === entry.entryNumber;
    }
  }
}
