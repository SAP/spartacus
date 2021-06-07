import { Cart, Order, OrderEntry, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class PromotionService {
  abstract getOrderPromotions(): Observable<PromotionResult[]>;

  abstract getProductPromotionForEntry(
    item: OrderEntry
  ): Observable<PromotionResult[]>;

  getProductPromotionForAllEntries(
    order: Order | Cart
  ): { [key: number]: Observable<PromotionResult[]> } {
    const allEntryPromotions: {
      [key: number]: Observable<PromotionResult[]>;
    } = {};
    order.entries?.forEach((entry) => {
      if (entry.entryNumber !== undefined)
        allEntryPromotions[
          entry.entryNumber
        ] = this.getProductPromotionForEntry(entry);
    });
    return allEntryPromotions;
  }

  protected getProductPromotion(
    item: OrderEntry,
    promotions: PromotionResult[]
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

  protected isConsumedByEntry(consumedEntry: any, entry: any): boolean {
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
