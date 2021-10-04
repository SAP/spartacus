import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutQueryFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['getCheckoutDetails', 'getCheckoutDetailsState'],
    }),
})
export abstract class CheckoutQueryFacade {
  abstract getCheckoutDetails(): Observable<any>;

  abstract getCheckoutDetailsState(): Observable<QueryState<any>>;
}
