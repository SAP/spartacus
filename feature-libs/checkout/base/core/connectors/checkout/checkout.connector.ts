/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import { Observable } from 'rxjs';
import { CheckoutAdapter } from './checkout.adapter';

@Injectable()
export class CheckoutConnector {
  constructor(protected adapter: CheckoutAdapter) {}

  public getCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutState> {
    return this.adapter.getCheckoutDetails(userId, cartId);
  }
}
