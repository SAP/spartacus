/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Command,
  CommandService,
  CommandStrategy,
  PaymentDetails,
  Query,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';
import { DpPaymentRequest } from '../models/dp-checkout.model';
@Injectable({
  providedIn: 'root',
})
export class DpCheckoutPaymentService {
  constructor(
    protected dpAdapter: DigitalPaymentsAdapter,
    protected command: CommandService,
    protected query: QueryService,
    protected userIdService: UserIdService
  ) {}

  protected RequestUrlQuery: Query<DpPaymentRequest> = this.query.create(() =>
    this.userIdService
      .takeUserId()
      .pipe(switchMap((userId) => this.dpAdapter.createPaymentRequest(userId)))
  );

  getCardRegistrationDetails(): Observable<DpPaymentRequest | undefined> {
    return this.RequestUrlQuery.get();
  }

  protected createPaymentDetailsCommand: Command<
    {
      sessionId: string;
      signature: string;
    },
    PaymentDetails
  > = this.command.create(
    (payload) =>
      this.userIdService
        .takeUserId()
        .pipe(
          switchMap((userId) =>
            this.dpAdapter.createPaymentDetails(
              payload.sessionId,
              payload.signature,
              userId
            )
          )
        ),
    {
      strategy: CommandStrategy.Queue,
    }
  );

  createPaymentDetails(
    sessionId: string,
    signature: string
  ): Observable<PaymentDetails> {
    return this.createPaymentDetailsCommand.execute({ sessionId, signature });
  }
}
