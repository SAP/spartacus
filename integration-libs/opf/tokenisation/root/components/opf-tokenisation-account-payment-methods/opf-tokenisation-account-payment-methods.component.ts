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
import {
  Card,
  CardComponent,
  ICON_TYPE,
  IconComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import {
  isTokenisationCardExpired,
  sortPaymentMethodsForDisplay,
} from '../../utils/opf-tokenisation-card-expiry.util';
import { OpfTokenisationFacade } from '../../facade';
import { OpfTokenisationDeletePaymentDialogComponent } from './opf-tokenisation-delete-payment-dialog/opf-tokenisation-delete-payment-dialog.component';

@Component({
  selector: 'cx-opf-tokenisation-account-payment-methods',
  templateUrl: './opf-tokenisation-account-payment-methods.component.html',
  imports: [
    NgIf,
    SpinnerComponent,
    NgFor,
    CardComponent,
    IconComponent,
    AsyncPipe,
    TranslatePipe,
    OpfTokenisationDeletePaymentDialogComponent,
  ],
})
export class OpfTokenisationAccountPaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<PaymentDetails[]>;
  editCard: string | undefined;
  loading$: Observable<boolean>;
  showDeleteDialog = false;
  paymentMethodToDelete: PaymentDetails | undefined;
  @Input() showHeader = true;
  protected autoDefaultRequested = false;
  iconTypes = ICON_TYPE;

  protected tokenisationFacade = inject(OpfTokenisationFacade);
  protected translation = inject(TranslationService);
  protected globalMessageService = inject(GlobalMessageService, {
    optional: true,
  });

  ngOnInit(): void {
    this.paymentMethods$ = this.tokenisationFacade.getPaymentMethods().pipe(
      map((paymentDetails) => sortPaymentMethodsForDisplay(paymentDetails)),
      tap((paymentDetails) => {
        const hasDefault = paymentDetails.some(
          (paymentDetail) => paymentDetail.defaultPayment
        );
        const hasPaymentMethods = paymentDetails.length > 0;
        const firstNonExpired = paymentDetails.find(
          (paymentDetail) => !isTokenisationCardExpired(paymentDetail)
        );

        // Set first non-expired payment method to DEFAULT if none is set
        if (
          !this.autoDefaultRequested &&
          hasPaymentMethods &&
          !hasDefault &&
          firstNonExpired
        ) {
          this.autoDefaultRequested = true;
          this.setDefaultPaymentMethod(firstNonExpired);
        }
      })
    );
    this.editCard = undefined;
    this.loading$ = this.tokenisationFacade.getPaymentMethodsLoading();
    this.tokenisationFacade.loadPaymentMethods();
  }

  getCardContent(paymentMethod: PaymentDetails): Observable<Card> {
    const { defaultPayment, expiryMonth, expiryYear, cardNumber, cardType } =
      paymentMethod;

    return combineLatest([
      this.translation.translate('paymentCard.setAsDefault'),
      this.translation.translate('common.delete'),
      this.translation.translate('paymentCard.expires', {
        month: expiryMonth,
        year: expiryYear,
      }),
      this.translation.translate(
        'paymentCard.defaultPaymentMethodTokenisation'
      ),
    ]).pipe(
      map(
        ([
          textSetAsDefault,
          textDelete,
          textExpires,
          textDefaultPaymentMethod,
        ]) => {
          const actions: { name: string; event: string }[] = [];
          if (!defaultPayment && !isTokenisationCardExpired(paymentMethod)) {
            actions.push({ name: textSetAsDefault, event: 'default' });
          }
          actions.push({ name: textDelete, event: 'delete' });
          const card: Card = {
            role: 'application',
            header: defaultPayment ? textDefaultPaymentMethod : undefined,
            textBold: cardType?.name,
            text: [cardNumber ?? '', textExpires],
            actions,
            label: defaultPayment
              ? 'paymentCard.defaultPaymentLabel'
              : 'paymentCard.additionalPaymentLabel',
          };

          return card;
        }
      )
    );
  }

  isCardExpired(paymentMethod: PaymentDetails): boolean {
    return isTokenisationCardExpired(paymentMethod);
  }

  deletePaymentMethod(paymentMethod: PaymentDetails): void {
    if (paymentMethod.id) {
      this.paymentMethodToDelete = paymentMethod;
      this.showDeleteDialog = true;
      this.editCard = undefined;
    }
  }

  confirmDeletePaymentMethod(): void {
    if (this.paymentMethodToDelete?.id) {
      this.tokenisationFacade.deletePaymentMethod(
        this.paymentMethodToDelete.id
      );
    }
    this.closeDeleteDialog();
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.paymentMethodToDelete = undefined;
  }

  setEdit(paymentMethod: PaymentDetails): void {
    this.editCard = paymentMethod.id;
  }

  cancelCard(): void {
    this.editCard = undefined;
  }

  setDefaultPaymentMethod(paymentMethod: PaymentDetails): void {
    this.tokenisationFacade.setPaymentMethodAsDefault(paymentMethod.id ?? '');
    this.globalMessageService?.add(
      { key: 'paymentMessages.setAsDefaultSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }
}
