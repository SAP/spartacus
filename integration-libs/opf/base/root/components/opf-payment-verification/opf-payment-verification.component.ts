/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorModel } from '@spartacus/core';

import { Observable, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { KeyValuePair, OpfPage, TargetPage } from '../../model';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-payment-verification.component.html',
})
export class OpfPaymentVerificationComponent implements OnInit, OnDestroy {
  protected subscription?: Subscription;
  protected isHostedFieldPattern = false;

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
          ({
            paymentSessionId,
            paramsMap: paramsMap,
            afterRedirectScriptFlag,
          }) =>
            this.runPaymentPattern({
              paymentSessionId,
              paramsMap,
              afterRedirectScriptFlag,
            })
        )
      )
      .subscribe({
        error: (error: HttpErrorModel | undefined) => this.onError(error),
        next: (success: boolean) => {
          if (!success) {
            this.onError(undefined);
          }
        },
      });
  }

  protected runPaymentPattern({
    paymentSessionId,
    paramsMap,
    afterRedirectScriptFlag,
  }: {
    paymentSessionId: string;
    paramsMap: KeyValuePair[];
    afterRedirectScriptFlag?: string;
  }): Observable<boolean> {
    if (afterRedirectScriptFlag === 'true') {
      this.isHostedFieldPattern = true;
      return this.paymentService.runHostedFieldsPattern(
        TargetPage.RESULT,
        paymentSessionId,
        this.vcr,
        paramsMap
      );
    } else {
      return this.paymentService.runHostedPagePattern(
        paymentSessionId,
        paramsMap
      );
    }
  }

  onError(error: HttpErrorModel | undefined): void {
    this.paymentService.displayError(error);
    this.paymentService.goToPage(OpfPage.CHECKOUT_REVIEW_PAGE);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.isHostedFieldPattern) {
      this.paymentService.removeResourcesAndGlobalFunctions();
    }
  }
}
