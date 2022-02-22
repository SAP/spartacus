import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: TestFacade,
      feature: ORDER_CORE_FEATURE,
      methods: ['placeOrder'],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class TestFacade {
  abstract placeOrder(termsChecked: boolean): Observable<Order>;
}
