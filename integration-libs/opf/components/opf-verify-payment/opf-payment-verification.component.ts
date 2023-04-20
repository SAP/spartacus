/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import {
  KeyValuePair,
  OpfCheckoutFacade,
  OpfConfig,
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfPaymenVerificationUrlInput,
} from '@spartacus/opf/root';
import { OrderFacade } from '@spartacus/order/root';
import { of, Subscription, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OpfUrlHandlerService } from '../opf-url-handler.service';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-payment-verification.component.html',
})
export class OpfPaymentVerificationComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  constructor(
    protected route: ActivatedRoute,
    protected orderFacade: OrderFacade,
    protected opfCheckoutService: OpfCheckoutFacade,
    protected config: OpfConfig,
    protected globalMessageService: GlobalMessageService,
    protected opfUrlHandlerService: OpfUrlHandlerService
  ) {}

  ngOnInit(): void {
    this.subscription = of(this.route.routeConfig?.data?.cxRoute as string)
      .pipe(
        take(1),
        switchMap((cxRoute) => {
          return cxRoute === 'paymentVerificationResult'
            ? this.route.queryParams
            : throwError('CANCEL URL RETURNED BY PSP');
        }),
        switchMap((params) => {
          if (!params) return throwError('No params');

          const paramsList: KeyValuePair[] =
            this.opfUrlHandlerService.convertParamsToKeyValuePairs(params);

          const paymentSessionId =
            this.opfUrlHandlerService.findFromKeyValuePairs(
              OpfPaymenVerificationUrlInput.PAYMENT_SESSION_ID,
              paramsList
            );
          if (!paymentSessionId) return throwError('No paymentSessionId found');

          return this.opfCheckoutService.verifyPayment(paymentSessionId, {
            responseMap: [...paramsList],
          });
        }),
        switchMap((response: OpfPaymentVerificationResponse) => {
          return response?.result === OpfPaymentVerificationResult.AUTHORIZED
            ? this.orderFacade.placeOrder(true)
            : throwError('UNAUTHORIZED payment from OPF Adapter');
        })
      )
      .subscribe({
        error: (error) => this.onError(error),
        next: () => this.onSuccess(),
      });
  }

  onSuccess(): void {
    this.opfUrlHandlerService.goToPage('orderConfirmation');
  }

  onError(error: any): void {
    this.globalMessageService.add(error, GlobalMessageType.MSG_TYPE_ERROR);
    this.opfUrlHandlerService.goToPage('checkoutReviewOrder');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
