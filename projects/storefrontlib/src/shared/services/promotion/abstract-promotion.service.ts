import { Cart, Order, OrderEntry, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class AbstractPromotionService {
  abstract getOrderPromotions(): Observable<PromotionResult[]>;

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

  protected abstract getProductPromotionForEntry(
    item: OrderEntry
  ): Observable<PromotionResult[]>;

  protected getOrderPromotionsFromCartHelper(cart: Cart): PromotionResult[] {
    const potentialPromotions = [];
    potentialPromotions.push(...(cart.potentialOrderPromotions || []));

    const appliedPromotions = [];
    appliedPromotions.push(...(cart.appliedOrderPromotions || []));

    return [...potentialPromotions, ...appliedPromotions];
  }

  protected getOrderPromotionsFromOrderHelper(order: Order): PromotionResult[] {
    const appliedOrderPromotions = [];
    appliedOrderPromotions.push(...(order.appliedOrderPromotions || []));

    return appliedOrderPromotions;
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
