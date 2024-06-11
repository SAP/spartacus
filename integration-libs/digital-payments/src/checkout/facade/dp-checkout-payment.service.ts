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
import { map, switchMap, take } from 'rxjs/operators';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';
import { DpPaymentRequest } from '../models/dp-checkout.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
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
  protected activeCartFacade = inject(ActiveCartFacade);

  protected RequestUrlQuery: Query<DpPaymentRequest> = this.query.create(() => {
    return this.checkoutPreconditions().pipe(
      switchMap(([userId, cartId]) =>
        this.dpAdapter.createPaymentRequest(userId, cartId)
      )
    );
  });

  getCardRegistrationDetails(): Observable<DpPaymentRequest | undefined> {
    return this.RequestUrlQuery.getState().pipe(
      map((state) => {
        if (state.loading === false && state.error !== false) {
          throw new Error(state.error.message);
        } else {
          return state.data;
        }
      })
    );
  }

  protected createPaymentDetailsCommand: Command<
    {
      sessionId: string;
      signature: string;
      billingAddress?: Address;
    },
    PaymentDetails
  > = this.command.create(
    (payload) =>
      this.checkoutPreconditions().pipe(
        switchMap(([userId, cartId]) => {
          return this.dpAdapter.createPaymentDetails(
            payload.sessionId,
            payload.signature,
            userId,
            cartId,
            payload?.billingAddress
          );
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
    return this.createPaymentDetailsCommand.execute({
      sessionId,
      signature,
      billingAddress,
    });
  }

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }
}
