/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export abstract class OtpAdapter {
  /**
   * Abstract method used to generate OTP for specified cart id.
   *
   * @param {string} userId
   * @param {string} cartId
   *
   */
  abstract generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined>;
}
