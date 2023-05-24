/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Command, CommandService, QueryService } from '@spartacus/core';
import {
  OpfPaymentFacade,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/base/root';

import { Observable } from 'rxjs';
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';

@Injectable()
export class OpfPaymentService implements OpfPaymentFacade {
  protected verifyPaymentCommand: Command<
    {
      paymentSessionId: string;
      paymentVerificationPayload: OpfPaymentVerificationPayload;
    },
    OpfPaymentVerificationResponse
  > = this.commandService.create((payload) =>
    this.opfCheckoutConnector.verifyPayment(
      payload.paymentSessionId,
      payload.paymentVerificationPayload
    )
  );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected opfCheckoutConnector: OpfPaymentConnector
  ) {}

  verifyPayment(
    paymentSessionId: string,
    paymentVerificationPayload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    return this.verifyPaymentCommand.execute({
      paymentSessionId,
      paymentVerificationPayload,
    });
  }
}
