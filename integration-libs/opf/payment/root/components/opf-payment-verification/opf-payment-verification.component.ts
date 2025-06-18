/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorModel } from '@spartacus/core';
import { OpfKeyValueMap, OpfPage } from '@spartacus/opf/base/root';
import { Observable, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { OpfPaymentVerificationService } from './opf-payment-verification.service';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-payment-verification.component.html',
  standalone: false,
})
export class OpfPaymentVerificationComponent implements OnInit, OnDestroy {
  protected route = inject(ActivatedRoute);
  protected opfPaymentVerificationService = inject(
    OpfPaymentVerificationService
  );
  protected vcr = inject(ViewContainerRef);

  protected subscription?: Subscription;
  protected isHostedFieldPattern = false;

  ngOnInit(): void {
    this.opfPaymentVerificationService.checkIfProcessingCartIdExist();

    this.subscription = this.opfPaymentVerificationService
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
    paramsMap: OpfKeyValueMap[];
    afterRedirectScriptFlag?: string;
  }): Observable<boolean> {
    if (afterRedirectScriptFlag === 'true') {
      this.isHostedFieldPattern = true;
      return this.opfPaymentVerificationService.runHostedFieldsPattern(
        paymentSessionId,
        this.vcr,
        paramsMap
      );
    } else {
      return this.opfPaymentVerificationService.runHostedPagePattern(
        paymentSessionId,
        paramsMap
      );
    }
  }

  onError(error: HttpErrorModel | undefined): void {
    this.opfPaymentVerificationService.displayError(error);
    this.opfPaymentVerificationService.goToPage(OpfPage.CHECKOUT_REVIEW_PAGE);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.isHostedFieldPattern) {
      this.opfPaymentVerificationService.removeResourcesAndGlobalFunctions();
    }
  }
}
