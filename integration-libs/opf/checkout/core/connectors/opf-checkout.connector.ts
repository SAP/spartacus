/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveConfiguration,
  PaymentInitiationConfig,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';

import { Observable } from 'rxjs';
import { OpfAdapter } from './opf.adapter';

@Injectable()
export class OpfCheckoutConnector {
  constructor(protected adapter: OpfAdapter) {}

  public getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    return this.adapter.getActiveConfigurations();
  }

  public initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData> {
    return this.adapter.initiatePayment(paymentConfig);
  }
}
