import { Injectable } from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { OrderEntry, PromotionResult } from '@spartacus/core';
import { PromotionService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPromotionService extends PromotionService {
  constructor(protected checkoutFacade: CheckoutFacade) {
    super();
  }

  getOrderPromotions(): Observable<PromotionResult[]> {
    return this.checkoutFacade
      .getOrderDetails()
      .pipe(map((order) => this.getOrderPromotionsFromOrderHelper(order)));
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
