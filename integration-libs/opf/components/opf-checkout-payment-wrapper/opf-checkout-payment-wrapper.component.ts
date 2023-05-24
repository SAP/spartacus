/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OpfPaymentMethodType, PaymentSessionData } from '@spartacus/opf/root';
import { take } from 'rxjs/operators';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@Component({
  selector: 'cx-opf-checkout-payment-wrapper',
  templateUrl: './opf-checkout-payment-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentWrapperComponent implements OnInit {
  @Input() selectedPaymentId: number;

  renderPaymentMethodEvent$ = this.service.getRenderPaymentMethodEvent();

  RENDER_TYPES = OpfPaymentMethodType;

  constructor(
    protected service: OpfCheckoutPaymentWrapperService,
    protected sanitizer: DomSanitizer
  ) {}

  renderHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.initiatePayment();
  }

  retryInitiatePayment(): void {
    this.initiatePayment();
  }

  protected initiatePayment(): void {
    this.service
      .initiatePayment(this.selectedPaymentId)
      .pipe(take(1))
      .subscribe((paymentOptionConfig: PaymentSessionData | Error) => {
        if (paymentOptionConfig instanceof Error) {
          return;
        }

        this.service.renderPaymentGateway(paymentOptionConfig);
      });
  }
}
