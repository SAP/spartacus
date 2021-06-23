import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { CheckoutDetails } from 'feature-libs/checkout/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

export function checkFacadeFactory() {
  return facadeFactory({
    facade: CheckFacade,
    feature: CHECKOUT_CORE_FEATURE,
    methods: ['getCheckoutDetails'],
    async: true,
  });
}
@Injectable({
  providedIn: 'root',
  useFactory: checkFacadeFactory,
})
export abstract class CheckFacade {
  /**
   * Get cost center id from cart
   */
  abstract getCheckoutDetails(): Observable<
    QueryState<CheckoutDetails | undefined>
  >;
}
