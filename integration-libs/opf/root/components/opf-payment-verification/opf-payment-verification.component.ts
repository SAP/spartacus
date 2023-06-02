/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorModel } from '@spartacus/core';

import { Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-payment-verification.component.html',
})
export class OpfPaymentVerificationComponent implements OnInit, OnDestroy {
  subscription?: Subscription;

  constructor(
    protected route: ActivatedRoute,
    protected paymentService: OpfPaymentVerificationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.paymentService
      .verifyResultUrl(this.route)
      .pipe(
        concatMap(({ paymentSessionId, responseMap }) => {
          return this.paymentService.verifyPayment(
            paymentSessionId,
            responseMap
          );
        }),
        concatMap(() => {
          return this.paymentService.placeOrder();
        })
      )
      .subscribe({
        error: (error: HttpErrorModel | undefined) => this.onError(error),
        next: () => this.onSuccess(),
      });
  }

  onSuccess(): void {
    this.paymentService.goToPage('opfOrderConfirmation');
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
