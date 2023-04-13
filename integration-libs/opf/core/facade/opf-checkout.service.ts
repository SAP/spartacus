/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Query, QueryService, QueryState } from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfCheckoutFacade,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';
import { Observable } from 'rxjs';
import { OpfCheckoutConnector } from '../connectors/opf-checkout.connector';

@Injectable()
export class OpfCheckoutService implements OpfCheckoutFacade {
  protected activeConfigurationsQuery: Query<ActiveConfiguration[]> =
    this.queryService.create<ActiveConfiguration[]>(() =>
      this.opfCheckoutConnector.getActiveConfigurations()
    );

  protected verifyPaymentQuery = (
    paymentSessionId: string,
    payload: string
  ): Query<OpfVerifyPaymentResponse> =>
    this.queryService.create<OpfVerifyPaymentResponse>(() => {
      console.log('flo1');
      return this.opfCheckoutConnector.getVerifyPayment(
        paymentSessionId,
        payload
      );
    });

  constructor(
    protected queryService: QueryService,
    protected opfCheckoutConnector: OpfCheckoutConnector
  ) {}

  getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  > {
    return this.activeConfigurationsQuery.getState();
  }

  getVerifyPaymentState(
    paymentSessionId: string,
    payload: string
  ): Observable<QueryState<OpfVerifyPaymentResponse | undefined>> {
    return this.verifyPaymentQuery(paymentSessionId, payload).getState();
  }
}
