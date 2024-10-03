/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutDeliveryAddressAdapter {
  /**
   * Abstract method used to create address in cart
   *
   * @param userId
   * @param cartId
   * @param address
   */
  abstract createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address>;

  /**
   * Abstract method used to set address for delivery
   *
   * @param userId
   * @param cartId
   * @param addressId
   */
  abstract setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<unknown>;

  /**
   * Abstract method used to clear checkout delivery address
   *
   * @param userId
   * @param cartId
   */
  abstract clearCheckoutDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<unknown>;
}
