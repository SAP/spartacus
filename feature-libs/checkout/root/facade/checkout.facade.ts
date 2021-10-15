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
      methods: [
        'placeOrder',
        'getOrder',
        'clearOrder',
        'setOrder',
        'isLoading',
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

  abstract setOrder(order: Order): void;

  /**
   * Check if checkout details are stable (no longer loading)
   */
  abstract isLoading(): Observable<boolean>;
}
