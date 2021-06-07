import { Injectable } from '@angular/core';
import { OrderEntry, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';
import { OrderDetailsService } from './order-details.service';

@Injectable({
  providedIn: 'root',
})
export class OrderPromotionService extends PromotionService {
  constructor(protected orderDetailsService: OrderDetailsService) {
    super();
  }

  getOrderPromotions(): Observable<PromotionResult[]> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(map((order) => order.appliedOrderPromotions || []));
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
