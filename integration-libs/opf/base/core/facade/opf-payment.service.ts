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
  AfterRedirectScriptResponse,
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
import { OpfPaymentHostedFieldsService } from '../services/opf-payment-hosted-fields.service';

@Injectable()
export class OpfPaymentService implements OpfPaymentFacade {
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
    return this.opfPaymentConnector.ctaScripts(payload.ctaScriptsRequest);
  });

  protected activeConfigurationsQuery: Query<ActiveConfiguration[]> =
    this.queryService.create<ActiveConfiguration[]>(() =>
      this.opfPaymentConnector.getActiveConfigurations()
    );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected opfPaymentConnector: OpfPaymentConnector,
    protected opfPaymentHostedFieldsService: OpfPaymentHostedFieldsService
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

  ctaScripts(ctaScriptsRequest: CtaScriptsRequest) {
    return this.ctaScriptsCommand.execute({ ctaScriptsRequest });
  }
}
