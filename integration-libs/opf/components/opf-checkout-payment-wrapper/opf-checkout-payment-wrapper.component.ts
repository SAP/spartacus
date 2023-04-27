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
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PaymentSessionData } from '@spartacus/opf/root';
import { Observable, Subscription } from 'rxjs';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@Component({
  selector: 'cx-opf-checkout-payment-wrapper',
  templateUrl: './opf-checkout-payment-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentWrapperComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  @Input() selectedPaymentId: number;

  @ViewChild('paymentGateway', { read: ViewContainerRef })
  paymentGatewayContainer: ViewContainerRef;

  constructor(protected service: OpfCheckoutPaymentWrapperService) {}

  initiatePayment(): Observable<PaymentSessionData> {
    return this.service.initiatePayment(this.selectedPaymentId);
  }

  ngOnInit() {
    this.subscription.add(
      this.initiatePayment().subscribe(
        (paymentOptionConfig: PaymentSessionData) =>
          this.service.renderPaymentGateway(
            paymentOptionConfig,
            this.paymentGatewayContainer
          )
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
