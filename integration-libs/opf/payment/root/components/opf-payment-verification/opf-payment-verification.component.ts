/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
import { FeatureToggles, HttpErrorModel, WindowRef } from '@spartacus/core';
import { OpfKeyValueMap, OpfPage } from '@spartacus/opf/base/root';
import { Observable, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { SpinnerComponent } from '@spartacus/storefront';
import { OpfPaymentVerificationService } from './opf-payment-verification.service';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-payment-verification.component.html',
  imports: [SpinnerComponent],
})
export class OpfPaymentVerificationComponent implements OnInit, OnDestroy {
  protected route = inject(ActivatedRoute);
  protected opfPaymentVerificationService = inject(
    OpfPaymentVerificationService
  );
  protected vcr = inject(ViewContainerRef);
  protected winRef = inject(WindowRef);
  private featureToggles = inject(FeatureToggles);

  protected subscription?: Subscription;
  protected isHostedFieldPattern = false;

  ngOnInit(): void {
    this.breakOutOfIframeIfNeeded();

    const checkProcessingCartOnErrorOnly =
      this.featureToggles.opfPaymentVerificationCheckProcessingCartOnErrorOnly;

    if (!checkProcessingCartOnErrorOnly) {
      this.opfPaymentVerificationService.checkIfProcessingCartIdExist();
    }

    this.subscription = this.opfPaymentVerificationService
      .verifyResultUrl(this.route)
      .pipe(
        concatMap(
          ({
            paymentSessionId,
            paramsMap: paramsMap,
            afterRedirectScriptFlag,
            is3DSRedirect,
          }) =>
            this.runPaymentPattern({
              paymentSessionId,
              paramsMap,
              afterRedirectScriptFlag,
              is3DSRedirect,
            })
        )
      )
      .subscribe({
        error: (error: HttpErrorModel | undefined) => {
          if (checkProcessingCartOnErrorOnly) {
            this.opfPaymentVerificationService.checkIfProcessingCartIdExist();
          }
          this.onError(error);
        },
        next: (success: boolean) => {
          if (!success) {
            this.onError(undefined);
          }
        },
      });
  }

  /**
   * Ensures the verification page is displayed in the top-level window.
   * Some PSPs render verification/success pages inside an iframe; in such cases
   * we reload the current URL in the top window to preserve full-page UX.
   *
   * Reference: https://docs.saferpay.com/home/integration-guide/general-information/iframe-integration-and-css
   */
  protected breakOutOfIframeIfNeeded(): void {
    if (
      this.winRef?.nativeWindow?.top &&
      this.winRef.nativeWindow.top.location !==
        this.winRef.nativeWindow.location
    ) {
      this.winRef.nativeWindow.top.location.href =
        this.winRef.nativeWindow.document.location.href;
    }
  }

  protected runPaymentPattern({
    paymentSessionId,
    paramsMap,
    afterRedirectScriptFlag,
    is3DSRedirect,
  }: {
    paymentSessionId: string;
    paramsMap: OpfKeyValueMap[];
    afterRedirectScriptFlag?: string;
    is3DSRedirect?: boolean;
  }): Observable<boolean> {
    // Handle 3DS redirect return
    if (is3DSRedirect) {
      this.isHostedFieldPattern = true;
      return this.opfPaymentVerificationService.run3DSRedirectPattern(
        paymentSessionId,
        paramsMap,
        this.vcr
      );
    }

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
    this.opfPaymentVerificationService.clearPaymentSessionForReinitiation();
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
