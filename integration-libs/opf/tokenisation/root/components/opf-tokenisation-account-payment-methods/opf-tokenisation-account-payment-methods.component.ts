/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Card, CardComponent, SpinnerComponent } from '@spartacus/storefront';
import { OpfTokenisationFacade } from '../../facade';

@Component({
  selector: 'cx-opf-tokenisation-account-payment-methods',
  templateUrl: './opf-tokenisation-account-payment-methods.component.html',
  imports: [
    NgIf,
    SpinnerComponent,
    NgFor,
    CardComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class OpfTokenisationAccountPaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<PaymentDetails[]>;
  editCard: string | undefined;
  loading$: Observable<boolean>;
  @Input() showHeader = true;

  protected tokenisationFacade = inject(OpfTokenisationFacade);
  protected translation = inject(TranslationService);
  protected globalMessageService = inject(GlobalMessageService, {
    optional: true,
  });

  ngOnInit(): void {
    this.paymentMethods$ = this.tokenisationFacade.getPaymentMethods().pipe(
      tap((paymentDetails) => {
        // Set first payment method to DEFAULT if none is set
        if (
          paymentDetails.length > 0 &&
          !paymentDetails.find((paymentDetail) => paymentDetail.defaultPayment)
        ) {
          this.setDefaultPaymentMethod(paymentDetails[0]);
        }
      })
    );
    this.editCard = undefined;
    this.loading$ = this.tokenisationFacade.getPaymentMethodsLoading();
    this.tokenisationFacade.loadPaymentMethods();
  }

  getCardContent({
    defaultPayment,
    expiryMonth,
    expiryYear,
    cardNumber,
  }: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentCard.setAsDefault'),
      this.translation.translate('common.delete'),
      this.translation.translate('paymentCard.deleteConfirmation'),
      this.translation.translate('paymentCard.expires', {
        month: expiryMonth,
        year: expiryYear,
      }),
      this.translation.translate('paymentCard.defaultPaymentMethod'),
    ]).pipe(
      map(
        ([
          textSetAsDefault,
          textDelete,
          textDeleteConfirmation,
          textExpires,
          textDefaultPaymentMethod,
        ]) => {
          const actions: { name: string; event: string }[] = [];
          if (!defaultPayment) {
            actions.push({ name: textSetAsDefault, event: 'default' });
          }
          actions.push({ name: textDelete, event: 'edit' });
          const card: Card = {
            role: 'application',
            header: defaultPayment ? textDefaultPaymentMethod : undefined,
            text: [cardNumber ?? '', textExpires],
            actions,
            deleteMsg: textDeleteConfirmation,
            label: defaultPayment
              ? 'paymentCard.defaultPaymentLabel'
              : 'paymentCard.additionalPaymentLabel',
          };

          return card;
        }
      )
    );
  }

  deletePaymentMethod(paymentMethod: PaymentDetails): void {
    if (paymentMethod.id) {
      this.tokenisationFacade.deletePaymentMethod(paymentMethod.id);
      this.editCard = undefined;
    }
  }

  setEdit(paymentMethod: PaymentDetails): void {
    this.editCard = paymentMethod.id;
  }

  cancelCard(): void {
    this.editCard = undefined;
  }

  setDefaultPaymentMethod(paymentMethod: PaymentDetails): void {
    this.tokenisationFacade.setPaymentMethodAsDefault(paymentMethod.id ?? '');
    this.tokenisationFacade.loadPaymentMethods();
    this.globalMessageService?.add(
      { key: 'paymentMessages.setAsDefaultSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }
}
