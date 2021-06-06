import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  OrderEntry,
  PromotionResult,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractPromotionService } from '../../shared/services/promotion/abstract-promotion.service';

@Injectable({
  providedIn: 'root',
})
export class CartPromotionService extends AbstractPromotionService {
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
}
