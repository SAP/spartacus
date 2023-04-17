/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Command,
  CommandService,
  Query,
  QueryService,
  QueryState,
} from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfCheckoutFacade,
  OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
  PaymentInitiationConfig,
  PaymentSessionData,
} from '@spartacus/opf/root';
import { Observable } from 'rxjs';
import { OpfCheckoutConnector } from '../connectors/opf-checkout.connector';

@Injectable()
export class OpfCheckoutService implements OpfCheckoutFacade {
  protected activeConfigurationsQuery: Query<ActiveConfiguration[]> =
    this.queryService.create<ActiveConfiguration[]>(() =>
      this.opfCheckoutConnector.getActiveConfigurations()
    );

  protected initiatePaymentCommand: Command<
    {
      paymentConfig: PaymentInitiationConfig;
    },
    PaymentSessionData
  > = this.commandService.create((payload) =>
    this.opfCheckoutConnector.initiatePayment(payload.paymentConfig)
  );

  protected verifyPaymentCommand: Command<
    {
      paymentSessionId: string;
      verifyPaymentData: OpfVerifyPaymentPayload;
    },
    OpfVerifyPaymentResponse
  > = this.commandService.create((payload) =>
    this.opfCheckoutConnector.getVerifyPayment(
      payload.paymentSessionId,
      payload.verifyPaymentData
    )
  );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected opfCheckoutConnector: OpfCheckoutConnector
  ) {}

  getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  > {
    return this.activeConfigurationsQuery.getState();
  }

  initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData> {
    return this.initiatePaymentCommand.execute({ paymentConfig });
  }

  verifyPayment(
    paymentSessionId: string,
    verifyPaymentData: OpfVerifyPaymentPayload
  ): Observable<OpfVerifyPaymentResponse> {
    return this.verifyPaymentCommand.execute({
      paymentSessionId,
      verifyPaymentData,
    });
  }
}
