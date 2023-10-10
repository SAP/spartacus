/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Command, CommandService, QueryService } from '@spartacus/core';
import {
  OpfCheckoutFacade,
  PaymentInitiationConfig,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';

import { Observable } from 'rxjs';
import { OpfCheckoutConnector } from '../connectors/opf-checkout.connector';

@Injectable()
export class OpfCheckoutService implements OpfCheckoutFacade {
  protected initiatePaymentCommand: Command<
    {
      paymentConfig: PaymentInitiationConfig;
    },
    PaymentSessionData
  > = this.commandService.create((payload) =>
    this.opfCheckoutConnector.initiatePayment(payload.paymentConfig)
  );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected opfCheckoutConnector: OpfCheckoutConnector
  ) {}

  initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData> {
    return this.initiatePaymentCommand.execute({ paymentConfig });
  }
}
