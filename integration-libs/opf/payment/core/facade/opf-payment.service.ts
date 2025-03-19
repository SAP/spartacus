/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Command, CommandService, QueryService } from '@spartacus/core';
import {
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentFacade,
  OpfPaymentInitiationConfig,
  OpfPaymentSessionData,
  OpfPaymentSubmitCompleteInput,
  OpfPaymentSubmitInput,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { Observable } from 'rxjs';
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';
import { OpfPaymentHostedFieldsService } from '../services/opf-payment-hosted-fields.service';

@Injectable()
export class OpfPaymentService implements OpfPaymentFacade {
  protected queryService = inject(QueryService);
  protected commandService = inject(CommandService);
  protected opfPaymentConnector = inject(OpfPaymentConnector);
  protected opfPaymentHostedFieldsService = inject(
    OpfPaymentHostedFieldsService
  );

  protected verifyPaymentCommand: Command<
    {
      paymentSessionId: string;
      paymentVerificationPayload: OpfPaymentVerificationPayload;
    },
    OpfPaymentVerificationResponse
  > = this.commandService.create((payload) =>
    this.opfPaymentConnector.verifyPayment(
      payload.paymentSessionId,
      payload.paymentVerificationPayload
    )
  );

  protected submitPaymentCommand: Command<
    {
      submitInput: OpfPaymentSubmitInput;
    },
    boolean
  > = this.commandService.create((payload) => {
    return this.opfPaymentHostedFieldsService.submitPayment(
      payload.submitInput
    );
  });

  protected submitCompletePaymentCommand: Command<
    {
      submitCompleteInput: OpfPaymentSubmitCompleteInput;
    },
    boolean
  > = this.commandService.create((payload) => {
    return this.opfPaymentHostedFieldsService.submitCompletePayment(
      payload.submitCompleteInput
    );
  });

  protected getAfterRedirectScriptsCommand: Command<
    {
      paymentSessionId: string;
    },
    OpfPaymentAfterRedirectScriptResponse
  > = this.commandService.create((payload) => {
    return this.opfPaymentConnector.getAfterRedirectScripts(
      payload.paymentSessionId
    );
  });

  protected initiatePaymentCommand: Command<
    {
      paymentConfig: OpfPaymentInitiationConfig;
    },
    OpfPaymentSessionData
  > = this.commandService.create((payload) =>
    this.opfPaymentConnector.initiatePayment(payload.paymentConfig)
  );

  verifyPayment(
    paymentSessionId: string,
    paymentVerificationPayload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    return this.verifyPaymentCommand.execute({
      paymentSessionId,
      paymentVerificationPayload,
    });
  }

  submitPayment(submitInput: OpfPaymentSubmitInput): Observable<boolean> {
    return this.submitPaymentCommand.execute({
      submitInput,
    });
  }

  submitCompletePayment(
    submitCompleteInput: OpfPaymentSubmitCompleteInput
  ): Observable<boolean> {
    return this.submitCompletePaymentCommand.execute({ submitCompleteInput });
  }

  getAfterRedirectScripts(paymentSessionId: string) {
    return this.getAfterRedirectScriptsCommand.execute({ paymentSessionId });
  }

  initiatePayment(
    paymentConfig: OpfPaymentInitiationConfig
  ): Observable<OpfPaymentSessionData> {
    return this.initiatePaymentCommand.execute({ paymentConfig });
  }
}
