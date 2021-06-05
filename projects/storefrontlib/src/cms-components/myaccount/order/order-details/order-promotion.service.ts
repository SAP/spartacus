import { Injectable } from '@angular/core';
import { OrderEntry, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractPromotionService } from '../../../../shared/services/promotion/abstract-promotion.service';
import { OrderDetailsService } from './order-details.service';

@Injectable({
  providedIn: 'root',
})
export class OrderPromotionService extends AbstractPromotionService {
  constructor(protected orderDetailsService: OrderDetailsService) {
    super();
  }

  getOrderPromotions(): Observable<PromotionResult[]> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(map((order) => this.getOrderPromotionsFromOrderHelper(order)));
  }

  getProductPromotionForEntry(item: OrderEntry): Observable<PromotionResult[]> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(
        map((order) =>
          this.getProductPromotion(item, order.appliedProductPromotions || [])
        )
      );
  }
}
