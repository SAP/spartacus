/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorModel } from '@spartacus/core';

import { Subscription } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

import { OpfPaymentVerificationService } from './opf-payment-verification.service';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-payment-verification.component.html',
})
export class OpfPaymentVerificationComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  constructor(
    protected route: ActivatedRoute,
    protected paymentService: OpfPaymentVerificationService,
    protected vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.paymentService.checkIfProcessingCartIdExist();

    this.subscription = this.paymentService
      .verifyResultUrl(this.route)
      .pipe(
        concatMap(
          ({ paymentSessionId, responseMap, afterRedirectScriptFlag }) => {
            if (afterRedirectScriptFlag === 'true') {
              console.log('flo1');

              return this.paymentService.runHostedFieldsPattern(
                paymentSessionId,
                this.vcr,
                responseMap
              );
            } else {
              return this.paymentService
                .verifyPayment(paymentSessionId, responseMap)
                .pipe(
                  concatMap(() => {
                    return this.paymentService.placeOrder();
                  }),
                  map((order) => (order ? true : false)),
                  tap((success: boolean) => {
                    if (success) {
                      this.onSuccess();
                    }
                  })
                );
            }
          }
        )
      )
      .subscribe({
        error: (error: HttpErrorModel | undefined) => this.onError(error),
        next: (success: boolean) => {
          if (success) {
            console.log('success');
          } else {
            console.log('fail');
            this.onError(undefined);
          }
        },
      });
  }

  onSuccess(): void {
    this.paymentService.goToPage('orderConfirmation');
  }

  onError(error: HttpErrorModel | undefined): void {
    this.paymentService.displayError(error);
    this.paymentService.goToPage('checkoutReviewOrder');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
