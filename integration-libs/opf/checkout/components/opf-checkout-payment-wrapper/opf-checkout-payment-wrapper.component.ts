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
import {
  GlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
} from '@spartacus/opf/base/root';
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
    this.globalFunctionsService.removeGlobalFunctions(
      GlobalFunctionsDomain.CHECKOUT
    );
    this.sub.unsubscribe();
  }

  retryInitiatePayment(): void {
    this.service.reloadPaymentMode();
  }

  protected initiatePaymentMode(): void {
    this.sub.add(
      this.service.initiatePayment(this.selectedPaymentId).subscribe({
        next: (paymentSessionData) => {
          if (this.isHostedFields(paymentSessionData)) {
            this.globalFunctionsService.registerGlobalFunctions({
              domain: GlobalFunctionsDomain.CHECKOUT,
              paymentSessionId: (paymentSessionData as PaymentSessionData)
                .paymentSessionId as string,
              vcr: this.vcr,
            });
          } else {
            this.globalFunctionsService.removeGlobalFunctions(
              GlobalFunctionsDomain.CHECKOUT
            );
          }
        },
      })
    );
  }

  protected isHostedFields(
    paymentSessionData: PaymentSessionData | Error
  ): boolean {
    return !!(
      !(paymentSessionData instanceof Error) &&
      paymentSessionData?.paymentSessionId &&
      paymentSessionData?.pattern === PaymentPattern.HOSTED_FIELDS
    );
  }
}
