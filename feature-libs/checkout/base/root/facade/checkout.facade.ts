import { Injectable } from '@angular/core';
import { facadeFactory, Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['getOrder', 'clearOrder', 'setOrder', 'placeOrder'],
      async: true,
    }),
})
export abstract class CheckoutFacade {
  /**
   * Returns the current order
   */
  abstract getOrder(): Observable<Order | undefined>;
  /**
   * Clears the current order
   */
  abstract clearOrder(): void;
  /**
   * Sets the provided order as current
   */
  abstract setOrder(order: Order): void;
  /**
   * Places an order
   */
  abstract placeOrder(termsChecked: boolean): Observable<Order>;
}
