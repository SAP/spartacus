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
import { OpfPaymentMethodType, PaymentSessionData } from '@spartacus/opf/root';
import { Observable, Subscription } from 'rxjs';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@Component({
  selector: 'cx-opf-checkout-payment-wrapper',
  templateUrl: './opf-checkout-payment-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentWrapperComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  renderPaymentMethodEvent$ = this.service.getRenderPaymentMethodEvent();

  RENDER_TYPES = OpfPaymentMethodType;

  @Input() selectedPaymentId: number;

  constructor(
    protected service: OpfCheckoutPaymentWrapperService,
    protected sanitizer: DomSanitizer
  ) {}

  initiatePayment(): Observable<PaymentSessionData> {
    return this.service.initiatePayment(this.selectedPaymentId);
  }

  renderHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.subscription.add(
      this.initiatePayment().subscribe(
        (paymentOptionConfig: PaymentSessionData) =>
          this.service.renderPaymentGateway(paymentOptionConfig)
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
