/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_BASE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfOtpFacade,
      feature: OPF_BASE_FEATURE,
      methods: ['generateOtpKey'],
    }),
})
export abstract class OpfOtpFacade {
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
  ): Observable<string | undefined | any>;
}
