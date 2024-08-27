/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
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
  protected queryService = inject(QueryService);
  protected commandService = inject(CommandService);
  protected opfCheckoutConnector = inject(OpfCheckoutConnector);

  protected initiatePaymentCommand: Command<
    {
      paymentConfig: PaymentInitiationConfig;
    },
    PaymentSessionData
  > = this.commandService.create((payload) =>
    this.opfCheckoutConnector.initiatePayment(payload.paymentConfig)
  );

  initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData> {
    return this.initiatePaymentCommand.execute({ paymentConfig });
  }
}
