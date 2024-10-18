/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export abstract class CartAccessCodeAdapter {
  /**
   * Abstract method used to generate access code for a specific cart id.
   *
   * @param {string} userId
   * @param {string} cartId
   *
   */
  abstract getCartAccessCode(
    userId: string,
    cartId: string
  ): Observable<string | undefined>;
}
