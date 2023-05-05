/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartService } from '@spartacus/cart/base/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  OpfCheckoutFacade,
  OpfOtpFacade,
  PaymentSessionData,
} from '@spartacus/opf/root';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class OpfCheckoutPaymentWrapperService {
  protected activeCartId: string;
  protected isInitPaymentFailedSub = new BehaviorSubject(false);

  isInitPaymentFailed$ = this.isInitPaymentFailedSub.asObservable();

  constructor(
    protected opfCheckoutService: OpfCheckoutFacade,
    protected opfOtpService: OpfOtpFacade,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  initiatePayment(
    selectedPaymentId: number
  ): Observable<PaymentSessionData | boolean> {
    this.isInitPaymentFailedSub.next(false);

    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      switchMap(([userId, cartId]) => {
        this.activeCartId = cartId;
        return this.opfOtpService.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.value)),
      map(({ value: otpKey }) => {
        return {
          otpKey,
          config: {
            configurationId: String(selectedPaymentId),
            cartId: this.activeCartId,
            resultURL: this.routingService.getFullUrl({
              cxRoute: 'paymentVerificationResult',
            }),
            cancelURL: this.routingService.getFullUrl({
              cxRoute: 'paymentVerificationCancel',
            }),
          },
        };
      }),
      switchMap((params) => this.opfCheckoutService.initiatePayment(params)),
      catchError(() => this.onInitPaymentError())
    );
  }

  protected onInitPaymentError(): Observable<boolean> {
    this.isInitPaymentFailedSub.next(true);

    this.globalMessageService.add(
      {
        key: 'opf.checkout.errors.proceedPayment',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );

    return of(false);
  }
}
