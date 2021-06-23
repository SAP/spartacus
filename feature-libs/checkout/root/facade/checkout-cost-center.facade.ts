import { Injectable } from '@angular/core';
import { CostCenter, facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

export function checkoutCostCenterFacadeFactory() {
  return facadeFactory({
    facade: CheckoutCostCenterFacade,
    feature: CHECKOUT_CORE_FEATURE,
    methods: ['setCostCenter', 'getCostCenter'],
    async: true,
  });
}
@Injectable({
  providedIn: 'root',
  useFactory: checkoutCostCenterFacadeFactory,
})
export abstract class CheckoutCostCenterFacade {
  /**
   * Set cost center to cart
   * @param costCenterId : cost center id
   */
  // TODO: Multilevel interface
  abstract setCostCenter(costCenterId: string): Observable<unknown>;

  /**
   * Get cost center id from cart
   */
  abstract getCostCenter(): Observable<CostCenter | undefined>;
}
