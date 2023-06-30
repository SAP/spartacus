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
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OpfGlobalFunctionsFacade } from '@spartacus/opf/base/root';
import {
  OpfPaymentMethodType,
  PaymentPattern,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';
import { Subscription } from 'rxjs';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@Component({
  selector: 'cx-opf-checkout-payment-wrapper',
  templateUrl: './opf-checkout-payment-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OpfCheckoutPaymentWrapperComponent implements OnInit, OnDestroy {
  @Input() selectedPaymentId: number;

  renderPaymentMethodEvent$ = this.service.getRenderPaymentMethodEvent();

  RENDER_TYPES = OpfPaymentMethodType;

  sub: Subscription = new Subscription();

  constructor(
    protected service: OpfCheckoutPaymentWrapperService,
    protected sanitizer: DomSanitizer,
    protected globalFunctionsService: OpfGlobalFunctionsFacade,
    protected vcr: ViewContainerRef
  ) {}

  renderHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.initiatePaymentMode();
  }

  ngOnDestroy() {
    this.globalFunctionsService.removeGlobalFunctions();

    this.sub.unsubscribe();
  }

  retryInitiatePayment(): void {
    this.service.reloadPaymentMode();
  }

  protected initiatePaymentMode(): void {
    this.sub.add(
      this.service.initiatePayment(this.selectedPaymentId).subscribe({
        next: (paymentSessionData) => {
          this.registerHostedFieldsGlobalFunctions(paymentSessionData);
        },
      })
    );
  }

  protected registerHostedFieldsGlobalFunctions(
    paymentSessionData: PaymentSessionData | Error
  ) {
    if (
      !(paymentSessionData instanceof Error) &&
      paymentSessionData?.paymentSessionId &&
      paymentSessionData?.pattern === PaymentPattern.HOSTED_FIELDS
    ) {
      this.globalFunctionsService.registerGlobalFunctions(
        paymentSessionData.paymentSessionId,
        this.vcr
      );
    } else {
      this.globalFunctionsService.removeGlobalFunctions();
    }
  }
}
