/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Address, PaymentDetails, TranslatePipe } from '@spartacus/core';
import { Card, CardComponent, SpinnerComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OpfTokenisationCheckoutPaymentMethodService } from './opf-tokenisation-checkout-payment-method.service';

@Component({
  selector: 'cx-opf-tokenisation-checkout-payment-method',
  templateUrl: './opf-tokenisation-checkout-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    CardComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
  providers: [OpfTokenisationCheckoutPaymentMethodService],
})
export class OpfTokenisationCheckoutPaymentMethodComponent
  implements OnInit, OnDestroy
{
  protected OpfTokenisationCheckoutPaymentMethodService = inject(
    OpfTokenisationCheckoutPaymentMethodService
  );

  cards$: Observable<{ content: Card; paymentMethod: PaymentDetails }[]>;
  isUpdating$: Observable<boolean>;
  selectedMethod$: Observable<PaymentDetails | undefined>;
  showSavedCards$: Observable<boolean>;

  ngOnInit(): void {
    this.OpfTokenisationCheckoutPaymentMethodService.initialize();
    this.cards$ = this.OpfTokenisationCheckoutPaymentMethodService.getCards$();
    this.isUpdating$ =
      this.OpfTokenisationCheckoutPaymentMethodService.isUpdating$;
    this.selectedMethod$ =
      this.OpfTokenisationCheckoutPaymentMethodService.selectedMethod$;
    this.showSavedCards$ =
      this.OpfTokenisationCheckoutPaymentMethodService.showSavedCards$;
  }

  selectPaymentMethod(paymentDetails: PaymentDetails): void {
    this.OpfTokenisationCheckoutPaymentMethodService.selectPaymentMethod(
      paymentDetails
    );
  }
  setPaymentDetails({
    paymentDetails,
    billingAddress,
  }: {
    paymentDetails: PaymentDetails;
    billingAddress?: Address;
  }): void {
    this.OpfTokenisationCheckoutPaymentMethodService.setPaymentDetails({
      paymentDetails,
      billingAddress,
    });
  }

  next(): void {
    this.OpfTokenisationCheckoutPaymentMethodService.next();
  }

  back(): void {
    this.OpfTokenisationCheckoutPaymentMethodService.back();
  }

  ngOnDestroy(): void {
    this.OpfTokenisationCheckoutPaymentMethodService.destroy();
  }
}
