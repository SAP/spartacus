/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import {
  KeyValuePair,
  OpfCheckoutFacade,
  OpfConfig,
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfPaymenVerificationUrlInput,
} from '@spartacus/opf/root';
import { OrderFacade } from '@spartacus/order/root';
import { Subscription, throwError } from 'rxjs';
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
    protected routingService: RoutingService,
    protected orderFacade: OrderFacade,
    protected opfCheckoutService: OpfCheckoutFacade,
    protected config: OpfConfig,
    protected globalMessageService: GlobalMessageService,
    protected opfUrlHandlerService: OpfUrlHandlerService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.url
      .pipe(
        take(1),
        switchMap((segments) => {
          return !!this.config?.opf?.successUrl &&
            this.opfUrlHandlerService.isIncludedInPath(
              segments,
              this.config.opf.successUrl
            )
            ? this.route.queryParams
            : throwError('CANCEL URL RETURNED BY PSP');
        }),
        switchMap((params) => {
          if (!params) return throwError('No params');

          const list: KeyValuePair[] =
            this.opfUrlHandlerService.convertParamsToKeyValuePairs(params);

          const paymentSessionId =
            this.opfUrlHandlerService.FindFromKeyValuePairs(
              OpfPaymenVerificationUrlInput.PAYMENT_SESSION_ID,
              list
            );
          if (!paymentSessionId) return throwError('No paymentSessionId found');

          return this.opfCheckoutService.verifyPayment(paymentSessionId, {
            responseMap: [...list],
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
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }

  onError(error: any): void {
    this.globalMessageService.add(error, GlobalMessageType.MSG_TYPE_ERROR);
    this.routingService.go({ cxRoute: 'checkoutReviewOrder' });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
