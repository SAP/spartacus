/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  Address,
  Command,
  CommandService,
  CommandStrategy,
  OCC_USER_ID_ANONYMOUS,
  PaymentDetails,
  Query,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';
import { DpPaymentRequest } from '../models/dp-checkout.model';
import { ActiveCartService } from '@spartacus/cart/base/core';
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
  protected activeCartService = inject(ActiveCartService);

  protected RequestUrlQuery: Query<DpPaymentRequest> = this.query.create(() => {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartService.getActive(),
    ]).pipe(
      switchMap(([userId, cart]) => {
        if (userId === OCC_USER_ID_ANONYMOUS) {
          return this.dpAdapter.createPaymentRequest(userId, cart.guid);
        }
        return this.dpAdapter.createPaymentRequest(userId);
      })
    );
  });

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
      combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.getActive(),
      ]).pipe(
        switchMap(([userId, cart]) => {
          if (userId === OCC_USER_ID_ANONYMOUS) {
            return this.dpAdapter.createPaymentDetails(
              payload.sessionId,
              payload.signature,
              userId,
              cart.guid
            );
          } else {
            return this.dpAdapter.createPaymentDetails(
              payload.sessionId,
              payload.signature,
              userId
            );
          }
        })
      ),
    {
      strategy: CommandStrategy.Queue,
    }
  );

  createPaymentDetails(
    sessionId: string,
    signature: string,
    billingAddress?: Address
  ): Observable<PaymentDetails> {
    console.log(billingAddress);
    return this.createPaymentDetailsCommand.execute({ sessionId, signature });
  }
}
