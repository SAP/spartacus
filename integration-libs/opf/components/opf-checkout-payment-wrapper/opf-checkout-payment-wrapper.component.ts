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
import { PaymentSessionData } from '@spartacus/opf/root';
import { Observable } from 'rxjs';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@Component({
  selector: 'cx-opf-checkout-payment-wrapper',
  templateUrl: './opf-checkout-payment-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentWrapperComponent implements OnInit {
  @Input() selectedPaymentId: number;

  paymentData$: Observable<PaymentSessionData | boolean>;
  isInitPaymentFailed$ =
    this.opfCheckoutPaymentWrapperService.isInitPaymentFailed$;

  protected activeCartId: string;

  constructor(
    protected opfCheckoutPaymentWrapperService: OpfCheckoutPaymentWrapperService
  ) {}

  ngOnInit() {
    this.initPayment();
  }

  retryInitPayment(): void {
    this.initPayment();
  }

  protected initPayment(): void {
    this.paymentData$ = this.opfCheckoutPaymentWrapperService.initiatePayment(
      this.selectedPaymentId
    );
  }
}
