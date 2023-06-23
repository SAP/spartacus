/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  OpfPaymentMethodType,
  PaymentPattern,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';
import { Subscription } from 'rxjs';
import { GlobalFunctionsRegistrationService } from '../opf-checkout-global-functions/opf-global-functions-registration.service';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@Component({
  selector: 'cx-opf-checkout-payment-wrapper',
  templateUrl: './opf-checkout-payment-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentWrapperComponent implements OnInit, OnDestroy {
  @Input() selectedPaymentId: number;

  renderPaymentMethodEvent$ = this.service.getRenderPaymentMethodEvent();

  RENDER_TYPES = OpfPaymentMethodType;

  sub: Subscription = new Subscription();

  constructor(
    protected service: OpfCheckoutPaymentWrapperService,
    protected sanitizer: DomSanitizer,
    protected globalFunctionsRegistrationService: GlobalFunctionsRegistrationService
  ) {}

  renderHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.initiatePaymentMode();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  retryInitiatePayment(): void {
    this.service.reloadPaymentMode();
  }

  protected initiatePaymentMode(): void {
    this.sub.add(
      this.service.initiatePayment(this.selectedPaymentId).subscribe({
        next: (response) =>
          this.initiateGlobalFunctions(response as PaymentSessionData),
      })
    );
  }

  protected initiateGlobalFunctions(
    paymentSessionData: PaymentSessionData
  ): void {
    if (
      paymentSessionData?.paymentSessionId &&
      paymentSessionData?.pattern === PaymentPattern.HOSTED_FIELDS
    ) {
      this.globalFunctionsRegistrationService.initializeService(
        paymentSessionData.paymentSessionId
      );
    } else {
      if (this.globalFunctionsRegistrationService.isGlobalFunctionInit) {
        this.globalFunctionsRegistrationService.removeService();
      }
    }
  }

  // protected initiatePaymentMode(): void {
  //   this.sub.add(
  //     this.service.initiatePayment(this.selectedPaymentId).subscribe({
  //       next: (paymentSessionData) => {
  //         if ((paymentSessionData as PaymentSessionData)?.paymentSessionId) {
  //           this.glob.initializeService(
  //             (paymentSessionData as PaymentSessionData)?.paymentSessionId
  //           );
  //         }
  //       },
  //     })
  //   );
  // }
}
