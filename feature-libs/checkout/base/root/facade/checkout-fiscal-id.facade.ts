/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

export interface CheckoutFiscalIdConfiguration {
  enabled: boolean;
  required: boolean;
  sapCountry?: string;
  sapType?: string;
}

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutFiscalIdFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['getConfiguration', 'setFiscalId'],
      async: true,
    }),
})
export abstract class CheckoutFiscalIdFacade {
  abstract getConfiguration(): Observable<CheckoutFiscalIdConfiguration>;

  /** Saves the value and updates the cart before completing. */
  abstract setFiscalId(value: string): Observable<unknown>;
}
