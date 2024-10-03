/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { CHECKOUT_CORE_FEATURE } from '@spartacus/checkout/base/root';
import { CostCenter, facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutCostCenterFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['setCostCenter', 'getCostCenterState'],
    }),
})
export abstract class CheckoutCostCenterFacade {
  /**
   * Set cost center to cart
   * @param costCenterId : cost center id
   */
  abstract setCostCenter(costCenterId: string): Observable<Cart>;

  /**
   * Get cost center id from cart
   */
  abstract getCostCenterState(): Observable<QueryState<CostCenter | undefined>>;
}
