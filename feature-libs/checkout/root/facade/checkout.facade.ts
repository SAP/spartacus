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
        'scheduleReplenishmentOrder',
        'getPlaceOrderLoading',
        'getPlaceOrderSuccess',
        'getPlaceOrderError',
        'clearPlaceOrderState',
        'clearCheckoutData',
        'clearCheckoutStep',
        'loadCheckoutDetails',
        'getCheckoutDetailsLoaded',
        'isLoading',
        'getOrderDetails',
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
   * Clear checkout data
   */
  abstract clearCheckoutData(): void;

  /**
   * Clear checkout step
   * @param stepNumber : the step number to be cleared
   */
  abstract clearCheckoutStep(stepNumber: number): void;

  /**
   * Load checkout details data
   * @param cartId : string Cart ID of loaded cart
   */
  abstract loadCheckoutDetails(cartId: string): void;

  /**
   * Get status of checkout details loaded
   */
  abstract getCheckoutDetailsLoaded(): Observable<boolean>;

  /**
   * Check if checkout details are stable (no longer loading)
   */
  abstract isLoading(): Observable<boolean>;

  /**
   * Get order details
   */
  abstract getOrderDetails(): Observable<Order | ReplenishmentOrder>;

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
