/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CheckoutCostCenterAdapter } from './checkout-cost-center.adapter';

@Injectable()
export class CheckoutCostCenterConnector {
  protected adapter = inject(CheckoutCostCenterAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  setCostCenter(
    userId: string,
    cartId: string,
    costCenterId: string
  ): Observable<Cart> {
    return this.adapter.setCostCenter(userId, cartId, costCenterId);
  }
}
