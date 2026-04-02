/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  PaymentDetails,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.paymentMethods$ = this.tokenisationFacade.getPaymentMethods().pipe();
    this.editCard = undefined;
    this.loading$ = this.tokenisationFacade.getPaymentMethodsLoading();
    this.tokenisationFacade.loadPaymentMethods();
  }

  getCardContent({
    expiryMonth,
    expiryYear,
    cardNumber,
  }: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('common.delete'),
      this.translation.translate('paymentCard.deleteConfirmation'),
      this.translation.translate('paymentCard.expires', {
        month: expiryMonth,
        year: expiryYear,
      }),
    ]).pipe(
      map(([textDelete, textDeleteConfirmation, textExpires]) => {
        const actions: { name: string; event: string }[] = [];
        actions.push({ name: textDelete, event: 'edit' });
        const card: Card = {
          role: 'application',
          text: [cardNumber ?? '', textExpires],
          actions,
          deleteMsg: textDeleteConfirmation,
        };

        return card;
      })
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
}
