/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export abstract class CartEntryGroupAdapter {
  /**
   * Abstract method used to remove entry group from cart
   *
   * @param userId
   * @param cartId
   * @param entryGroupNumber
   */
  abstract remove(
    userId: string,
    cartId: string,
    entryGroupNumber: string
  ): Observable<any>;
}
