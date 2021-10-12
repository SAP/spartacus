import { Injectable } from '@angular/core';
import {
  facadeFactory,
  Order,
  ORDER_TYPE,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'placeOrder',
        'getOrder',
        'clearOrder',
        'scheduleReplenishmentOrder',
        'isLoading',
        'setOrderType',
        'getOrderType',
      ],
      async: true,
    }),
})
export abstract class CheckoutFacade {
  /**
   * Places an order
   */
  abstract placeOrder(termsChecked: boolean): Observable<Order>;

  abstract getOrder(): Observable<Order | undefined>;

  abstract clearOrder(): void;

  /**
   * Schedule a replenishment order
   */
  abstract scheduleReplenishmentOrder(
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean
  ): Observable<ReplenishmentOrder>;

  /**
   * Check if checkout details are stable (no longer loading)
   */
  abstract isLoading(): Observable<boolean>;

  /**
   * Set checkout order type
   * @param orderType : an enum of types of order we are placing
   */
  abstract setOrderType(orderType: ORDER_TYPE): void;

  /**
   * Get current checkout order type
   */
  abstract getOrderType(): Observable<ORDER_TYPE>;
}
