import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutCostCenterFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['setCostCenter', 'getCostCenter'],
      async: true,
    }),
})
export abstract class CheckoutCostCenterFacade {
  /**
   * Set cost center to cart
   * @param costCenterId : cost center id
   */
  abstract setCostCenter(costCenterId: string): void;

  /**
   * Get cost center id from cart
   */
  abstract getCostCenter(): Observable<string | undefined>;
}
