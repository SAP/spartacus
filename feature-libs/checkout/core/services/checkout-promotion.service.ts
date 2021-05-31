import { Injectable } from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order, OrderEntry, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPromotionService {
  constructor(protected checkoutFacade: CheckoutFacade) {}

  getOrderPromotions(): Observable<PromotionResult[]> {
    return this.checkoutFacade
      .getOrderDetails()
      .pipe(map((order) => this.getOrderPromotionsFromOrderHelper(order)));
  }

  private getOrderPromotionsFromOrderHelper(order: Order): PromotionResult[] {
    const appliedOrderPromotions = [];
    appliedOrderPromotions.push(...(order.appliedOrderPromotions || []));

    return appliedOrderPromotions;
  }

  getProductPromotionForEnties(
    order: Order
  ): { [key: string]: PromotionResult[] } {
    const allEntryPromotions: { [key: string]: PromotionResult[] } = {};
    order.entries?.forEach((entry) => {
      if (entry.entryNumber !== undefined)
        allEntryPromotions[entry.entryNumber] = this.getProductPromotion(
          entry,
          order.appliedProductPromotions || []
        );
    });
    return allEntryPromotions;
  }

  getProductPromotionForEntry(item: OrderEntry): Observable<PromotionResult[]> {
    return this.checkoutFacade
      .getOrderDetails()
      .pipe(
        map((order) =>
          this.getProductPromotion(item, order.appliedProductPromotions || [])
        )
      );
  }

  private getProductPromotion(
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

  private isConsumedByEntry(consumedEntry: any, entry: any): boolean {
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
