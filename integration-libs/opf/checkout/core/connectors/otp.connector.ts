/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OtpAdapter } from './otp.adapter';

@Injectable()
export class OtpConnector {
  constructor(protected adapter: OtpAdapter) {}

  public generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.adapter.generateOtpKey(userId, cartId);
  }
}
