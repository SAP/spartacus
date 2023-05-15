/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorModel } from '@spartacus/core';

import { Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
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
        tap(() => console.log('flo6')),
        concatMap(({ paymentSessionId, responseMap }) => {
          return this.paymentService.verifyPayment(
            paymentSessionId,
            responseMap
          );
        }),
        tap(() => console.log('flo7')),
        concatMap(() => {
          return this.paymentService.placeOrder();
        })
      )
      .subscribe({
        error: (error: HttpErrorModel | undefined) => {
          console.log('flo8'), JSON.stringify(error);
          this.onError(error);
        },
        next: () => this.onSuccess(),
      });
  }

  onSuccess(): void {
    console.log('flo10 success');
    this.paymentService.goToPage('orderConfirmation');
  }

  onError(error: HttpErrorModel | undefined): void {
    console.log('flo9', error);
    this.paymentService.displayError(error);
    this.paymentService.goToPage('checkoutReviewOrder');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
