/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import {
  OpfCheckoutFacade,
  OpfConfig,
  OpfOrderFacade,
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfPaymenVerificationUrlInput,
  OpfResponseMapElement,
} from '@spartacus/opf/root';
import { of, Subscription, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-payment-verification.component.html',
})
export class OpfPaymentVerificationComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  constructor(
    protected route: ActivatedRoute,
    protected opfOrderFacade: OpfOrderFacade,
    protected opfCheckoutService: OpfCheckoutFacade,
    protected config: OpfConfig,
    protected globalMessageService: GlobalMessageService,
    protected opfPaymentVerificationService: OpfPaymentVerificationService
  ) {}

  ngOnInit(): void {
    this.subscription = of(this.route.routeConfig?.data?.cxRoute as string)
      .pipe(
        switchMap((cxRoute) => {
          return cxRoute === 'paymentVerificationResult'
            ? this.route.queryParams
            : throwError('ERROR_CANCEL_LINK');
        }),
        switchMap((params) => {
          if (!params) {
            return throwError('ERROR_NO_PARAMS');
          }

          const responseMap: OpfResponseMapElement[] =
            this.opfPaymentVerificationService.getOpfResponseMap(params);

          const paymentSessionId =
            this.opfPaymentVerificationService.findInOpfResponseMap(
              OpfPaymenVerificationUrlInput.PAYMENT_SESSION_ID,
              responseMap
            );
          if (!paymentSessionId) {
            return throwError('ERROR_NO_PAYMENT_SESSION_ID');
          }

          return this.opfCheckoutService.verifyPayment(paymentSessionId, {
            responseMap: [...responseMap],
          });
        }),
        switchMap((response: OpfPaymentVerificationResponse) => {
          return response?.result ===
            (OpfPaymentVerificationResult.AUTHORIZED ||
              OpfPaymentVerificationResult.DELAYED)
            ? this.opfOrderFacade.placeOpfOrder(true)
            : throwError('ERROR_UNAUTHORIZED_RESULT');
        })
      )
      .subscribe({
        error: () => this.onError(),
        next: () => this.onSuccess(),
      });
  }

  onSuccess(): void {
    this.opfPaymentVerificationService.goToPage('orderConfirmation');
  }

  onError(): void {
    this.displayError();
    this.opfPaymentVerificationService.goToPage('checkoutReviewOrder');
  }

  protected displayError(): void {
    this.globalMessageService.add(
      {
        key: 'opf.errorToProcessPayment',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
