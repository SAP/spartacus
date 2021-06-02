import { Injectable } from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order, OrderEntry, PromotionResult } from '@spartacus/core';
import { AbstractPromotionService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPromotionService extends AbstractPromotionService {
  constructor(protected checkoutFacade: CheckoutFacade) {
    super();
  }

  getOrderPromotions(): Observable<PromotionResult[]> {
    return this.checkoutFacade
      .getOrderDetails()
      .pipe(map((order) => this.getOrderPromotionsFromOrderHelper(order)));
  }

  getProductPromotionForAllEntries(
    order: Order
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

  getProductPromotionForEntry(item: OrderEntry): Observable<PromotionResult[]> {
    return this.checkoutFacade
      .getOrderDetails()
      .pipe(
        map((order) =>
          this.getProductPromotion(item, order.appliedProductPromotions || [])
        )
      );
  }
}
