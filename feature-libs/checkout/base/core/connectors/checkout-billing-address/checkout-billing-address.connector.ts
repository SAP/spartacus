/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutBillingAddressAdapter } from './checkout-billing-address.adapter';

@Injectable()
export class CheckoutBillingAddressConnector {
  constructor(protected adapter: CheckoutBillingAddressAdapter) {}

  public setAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<unknown> {
    return this.adapter.setAddress(userId, cartId, address);
  }

  public getAddress(
    userId: string,
    cartId: string
  ): Observable<Address | undefined> {
    return this.adapter.getAddress(userId, cartId);
  }
}
