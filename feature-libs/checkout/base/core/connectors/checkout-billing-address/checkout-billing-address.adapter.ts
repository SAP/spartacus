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
  abstract setBillingAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<unknown>;
}
