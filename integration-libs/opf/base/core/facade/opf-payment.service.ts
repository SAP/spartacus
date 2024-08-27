/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  Command,
  CommandService,
  Query,
  QueryService,
  QueryState,
} from '@spartacus/core';
import {
  ActiveConfiguration,
  AfterRedirectScriptResponse,
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
  CtaScriptsRequest,
  CtaScriptsResponse,
  OpfPaymentFacade,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  SubmitCompleteInput,
  SubmitInput,
} from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';
import { OpfPaymentApplePayService } from '../services/opf-payment-apple-pay.service';
import { OpfPaymentHostedFieldsService } from '../services/opf-payment-hosted-fields.service';

@Injectable()
export class OpfPaymentService implements OpfPaymentFacade {
  protected queryService = inject(QueryService);
  protected commandService = inject(CommandService);
  protected opfPaymentConnector = inject(OpfPaymentConnector);
  protected opfPaymentHostedFieldsService = inject(
    OpfPaymentHostedFieldsService
  );
  protected opfPaymentApplePayService = inject(OpfPaymentApplePayService);

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
      submitInput: SubmitInput;
    },
    boolean
  > = this.commandService.create((payload) => {
    return this.opfPaymentHostedFieldsService.submitPayment(
      payload.submitInput
    );
  });

  protected submitCompletePaymentCommand: Command<
    {
      submitCompleteInput: SubmitCompleteInput;
    },
    boolean
  > = this.commandService.create((payload) => {
    return this.opfPaymentHostedFieldsService.submitCompletePayment(
      payload.submitCompleteInput
    );
  });

  protected afterRedirectScriptsCommand: Command<
    {
      paymentSessionId: string;
    },
    AfterRedirectScriptResponse
  > = this.commandService.create((payload) => {
    return this.opfPaymentConnector.afterRedirectScripts(
      payload.paymentSessionId
    );
  });

  protected ctaScriptsCommand: Command<
    {
      ctaScriptsRequest: CtaScriptsRequest;
    },
    CtaScriptsResponse
  > = this.commandService.create((payload) => {
    return this.opfPaymentConnector.getCtaScripts(payload.ctaScriptsRequest);
  });

  protected applePaySessionCommand: Command<
    {
      applePayWebSessionRequest: ApplePaySessionVerificationRequest;
    },
    ApplePaySessionVerificationResponse
  > = this.commandService.create((payload) => {
    return this.opfPaymentApplePayService.getApplePayWebSession(
      payload.applePayWebSessionRequest
    );
  });

  protected activeConfigurationsQuery: Query<ActiveConfiguration[]> =
    this.queryService.create<ActiveConfiguration[]>(() =>
      this.opfPaymentConnector.getActiveConfigurations()
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

  submitPayment(submitInput: SubmitInput): Observable<boolean> {
    return this.submitPaymentCommand.execute({
      submitInput,
    });
  }

  submitCompletePayment(
    submitCompleteInput: SubmitCompleteInput
  ): Observable<boolean> {
    return this.submitCompletePaymentCommand.execute({ submitCompleteInput });
  }

  afterRedirectScripts(paymentSessionId: string) {
    return this.afterRedirectScriptsCommand.execute({ paymentSessionId });
  }

  getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  > {
    return this.activeConfigurationsQuery.getState();
  }

  getCtaScripts(ctaScriptsRequest: CtaScriptsRequest) {
    return this.ctaScriptsCommand.execute({ ctaScriptsRequest });
  }

  getApplePayWebSession(
    applePayWebSessionRequest: ApplePaySessionVerificationRequest
  ) {
    return this.applePaySessionCommand.execute({ applePayWebSessionRequest });
  }
}
