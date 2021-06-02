import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../../../cms-components/myaccount/order/order-details/order-details.service';
import { AbstractPromotionService } from './abstract-promotion.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionService extends AbstractPromotionService {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected activeCartService: ActiveCartService
  ) {
    super();
  }

  getOrderPromotions(
    promotionLocation: PromotionLocation
  ): Observable<PromotionResult[]> {
    switch (promotionLocation) {
      case PromotionLocation.ActiveCart:
        return this.getOrderPromotionsFromCart();
      case PromotionLocation.Order:
        return this.getOrderPromotionsFromOrder();
      default:
        return of([]);
    }
  }

  getOrderPromotionsFromCart(): Observable<PromotionResult[]> {
    return this.activeCartService
      .getActive()
      .pipe(map((cart) => this.getOrderPromotionsFromCartHelper(cart)));
  }

  getOrderPromotionsFromOrder(): Observable<PromotionResult[]> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(map((order) => this.getOrderPromotionsFromOrderHelper(order)));
  }

  getProductPromotionForEntry(
    item: OrderEntry,
    promotionLocation: PromotionLocation
  ): Observable<PromotionResult[]> {
    switch (promotionLocation) {
      case PromotionLocation.ActiveCart:
        return this.activeCartService
          .getActive()
          .pipe(
            map((cart) =>
              this.getProductPromotion(
                item,
                cart.appliedProductPromotions || []
              )
            )
          );
      case PromotionLocation.Order:
        return this.orderDetailsService
          .getOrderDetails()
          .pipe(
            map((order) =>
              this.getProductPromotion(
                item,
                order.appliedProductPromotions || []
              )
            )
          );
    }
  }
}
