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
import { OpfTokenisationPaymentMethodService } from './opf-tokenisation-payment-method.service';

@Component({
  selector: 'cx-opf-tokenisation-payment-method',
  templateUrl: './opf-tokenisation-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    CardComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
  providers: [OpfTokenisationPaymentMethodService],
})
export class OpfTokenisationPaymentMethodComponent
  implements OnInit, OnDestroy
{
  protected OpfTokenisationPaymentMethodService = inject(
    OpfTokenisationPaymentMethodService
  );

  cards$: Observable<{ content: Card; paymentMethod: PaymentDetails }[]>;
  isUpdating$: Observable<boolean>;
  selectedMethod$: Observable<PaymentDetails | undefined>;
  showSavedCards$: Observable<boolean>;

  ngOnInit(): void {
    this.OpfTokenisationPaymentMethodService.initialize();
    this.cards$ = this.OpfTokenisationPaymentMethodService.getCards$();
    this.isUpdating$ = this.OpfTokenisationPaymentMethodService.isUpdating$;
    this.selectedMethod$ =
      this.OpfTokenisationPaymentMethodService.selectedMethod$;
    this.showSavedCards$ =
      this.OpfTokenisationPaymentMethodService.showSavedCards$;
  }

  selectPaymentMethod(paymentDetails: PaymentDetails): void {
    this.OpfTokenisationPaymentMethodService.selectPaymentMethod(
      paymentDetails
    );
  }

  onCardClick(event: MouseEvent, paymentDetails: PaymentDetails): void {
    const target = event.target as HTMLElement | null;

    if (target?.closest('button, a, cx-generic-link')) {
      return;
    }

    this.selectPaymentMethod(paymentDetails);
  }

  setDefaultPaymentMethod(paymentDetails: PaymentDetails): void {
    this.OpfTokenisationPaymentMethodService.setDefaultPaymentMethod(
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
    this.OpfTokenisationPaymentMethodService.setPaymentDetails({
      paymentDetails,
      billingAddress,
    });
  }

  next(): void {
    this.OpfTokenisationPaymentMethodService.next();
  }

  back(): void {
    this.OpfTokenisationPaymentMethodService.back();
  }

  ngOnDestroy(): void {
    this.OpfTokenisationPaymentMethodService.destroy();
  }
}
