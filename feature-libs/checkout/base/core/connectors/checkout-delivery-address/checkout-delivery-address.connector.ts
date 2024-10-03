/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutDeliveryAddressAdapter } from './checkout-delivery-address.adapter';

@Injectable()
export class CheckoutDeliveryAddressConnector {
  constructor(protected adapter: CheckoutDeliveryAddressAdapter) {}

  public createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address> {
    return this.adapter.createAddress(userId, cartId, address);
  }

  public setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<unknown> {
    return this.adapter.setAddress(userId, cartId, addressId);
  }

  public clearCheckoutDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<unknown> {
    return this.adapter.clearCheckoutDeliveryAddress(userId, cartId);
  }
}
