/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_FEATURE } from '../feature-name';
import {
  ActiveConfiguration,
  OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
} from '../model/opf-checkout.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfCheckoutFacade,
      feature: OPF_FEATURE,
      methods: ['getActiveConfigurationsState', 'getVerifyPaymentState'],
    }),
})
export abstract class OpfCheckoutFacade {
  /**
   * Get checkout payment active configurations
   */
  abstract getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  >;

  /**
   * getVerifyPaymentState
   *
   * @param params Object with paymentSessionId and payload
   */
  abstract getVerifyPaymentState(
    paymentSessionId: string,
    payload: OpfVerifyPaymentPayload
  ): Observable<QueryState<OpfVerifyPaymentResponse | undefined>>;
}
