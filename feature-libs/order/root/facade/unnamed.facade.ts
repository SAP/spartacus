import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UnnamedFacade,
      feature: ORDER_CORE_FEATURE,
      methods: [
        'getCurrentOrderDetails',
        'clearCurrentOrder',
        'setCurrentOrder',
        'placeOrder',
      ],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class UnnamedFacade {
  /**
   * Returns the current order
   */
  abstract getCurrentOrderDetails(): Observable<Order | undefined>;
  /**
   * Clears the current order
   */
  abstract clearCurrentOrder(): void;
  /**
   * Sets the provided order as current
   */
  abstract setCurrentOrder(order: Order): void;
  /**
   * Places an order
   */
  abstract placeOrder(termsChecked: boolean): Observable<Order>;
}
