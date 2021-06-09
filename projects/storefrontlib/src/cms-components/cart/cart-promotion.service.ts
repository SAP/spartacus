import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  PromotionResult,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromotionService } from '../../shared/services/promotion/promotion.service';

@Injectable({
  providedIn: 'root',
})
export class CartPromotionService extends PromotionService {
  constructor(protected activeCartService: ActiveCartService) {
    super();
  }

  getOrderPromotions(): Observable<PromotionResult[]> {
    return this.activeCartService
      .getActive()
      .pipe(map((cart) => this.getOrderPromotionsFromCartHelper(cart)));
  }

  getProductPromotionForEntry(item: OrderEntry): Observable<PromotionResult[]> {
    return this.activeCartService
      .getActive()
      .pipe(
        map((cart) =>
          this.getProductPromotion(item, cart.appliedProductPromotions || [])
        )
      );
  }

  protected getOrderPromotionsFromCartHelper(cart: Cart): PromotionResult[] {
    const potentialPromotions = [];
    potentialPromotions.push(...(cart.potentialOrderPromotions || []));

    const appliedPromotions = [];
    appliedPromotions.push(...(cart.appliedOrderPromotions || []));

    return [...potentialPromotions, ...appliedPromotions];
  }
}
