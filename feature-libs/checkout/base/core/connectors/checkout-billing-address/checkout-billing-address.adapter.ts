/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutBillingAddressAdapter {
  /**
   * Abstract method used to set address for billing
   *
   * @param userId
   * @param cartId
   * @param addressId
   */
  abstract setAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<unknown>;

  /**
   * Abstract method used to get address for billing
   *
   * @param userId
   * @param cartId
   */
  abstract getAddress(
    userId: string,
    cartId: string
  ): Observable<Address | undefined>;
}
