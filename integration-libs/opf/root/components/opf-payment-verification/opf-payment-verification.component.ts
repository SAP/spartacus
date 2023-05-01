/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorModel } from '@spartacus/core';

import { Subscription } from 'rxjs';
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
    protected paymentService: OpfPaymentVerificationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.paymentService
      .verifyResultUrl(this.route)
      .pipe(
        switchMap(({ paymentSessionId, responseMap }) => {
          return this.paymentService.verifyPayment(
            paymentSessionId,
            responseMap
          );
        }),
        switchMap(() => {
          return this.paymentService.placeOrder();
        })
      )
      .subscribe({
        error: (error: HttpErrorModel | undefined) => this.onError(error),
        next: () => this.onSuccess(),
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

  // private showPaymentErrorDialog(error: HttpErrorModel): void {
  //   if (error?.status === 400) {
  //     switch (error?.message) {
  //       case 'EXPIRED':
  //         break;
  //       case 'INSUFFICENT_FUNDS':
  //       case 'CREDIT_LIMIT':
  //         break;
  //       case 'INVALID_CARD':
  //       case 'INVALID_CVV':
  //         break;
  //       case 'LOST_CARD':
  //         break;
  //       case 'business_error':
  //         if (error.details?.[0]?.message === 'productStatusValidation') {
  //         } else {
  //         }
  //         break;
  //       default:
  //         console.log('default');
  //     }
  //   } else {
  //     if (error?.message === 'PAYMENT_REJECTED') {
  //       console.log('PAYMENT_REJECTED');
  //     } else if (error?.message !== 'PAYMENT_CANCELLED') {
  //       console.log('PAYMENT_CANCELLED');
  //     }
  //   }
  // }
}
