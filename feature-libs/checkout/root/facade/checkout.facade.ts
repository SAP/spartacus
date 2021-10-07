import { Injectable } from '@angular/core';
import {
  facadeFactory,
  Order,
  ORDER_TYPE,
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
        'getPlaceOrderLoading',
        'getPlaceOrderSuccess',
        'getPlaceOrderError',
        'clearPlaceOrderState',
        'isLoading',
        'setOrderType',
        'getCurrentOrderType',
      ],
      async: true,
    }),
})
export abstract class CheckoutFacade {
  /**
   * Places an order
   */
  abstract placeOrder(termsChecked: boolean): void;

  abstract getOrder(): Observable<Order | undefined>;

  abstract clearOrder(): void;

  /**
   * Schedule a replenishment order
   */
  abstract scheduleReplenishmentOrder(
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean
  ): void;

  /**
   * Returns the place or schedule replenishment order's loading flag
   */
  abstract getPlaceOrderLoading(): Observable<boolean>;

  /**
   * Returns the place or schedule replenishment order's success flag
   */
  abstract getPlaceOrderSuccess(): Observable<boolean>;

  /**
   * Returns the place or schedule replenishment order's error flag
   */
  abstract getPlaceOrderError(): Observable<boolean>;

  /**
   * Resets the place or schedule replenishment order's processing state
   */
  abstract clearPlaceOrderState(): void;

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
  abstract getCurrentOrderType(): Observable<ORDER_TYPE>;
}
