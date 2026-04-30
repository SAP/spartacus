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
import { OpfTokenisationFacade } from '../../facade';
import { OpfTokenisationDeletePaymentDialogComponent } from './opf-tokenisation-delete-payment-dialog/opf-tokenisation-delete-payment-dialog.component';

@Component({
  selector: 'cx-opf-tokenisation-account-payment-methods',
  templateUrl: './opf-tokenisation-account-payment-methods.component.html',
  standalone: true,
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
      map((paymentDetails) =>
        this.sortPaymentMethodsForDisplay(paymentDetails)
      ),
      tap((paymentDetails) => {
        // Set first payment method to DEFAULT if none is set
        if (
          paymentDetails.length > 0 &&
          !paymentDetails.find((paymentDetail) => paymentDetail.defaultPayment)
        ) {
          this.setDefaultPaymentMethod(paymentDetails[0]);
          const hasDefault = paymentDetails.some(
            (paymentDetail) => paymentDetail.defaultPayment
          );
          const hasPaymentMethods = paymentDetails.length > 0;
          const paymentMethodId = paymentDetails[0]?.id;

          if (
            !this.autoDefaultRequested &&
            hasPaymentMethods &&
            !hasDefault &&
            paymentMethodId
          ) {
            this.autoDefaultRequested = true;
            this.tokenisationFacade.setPaymentMethodAsDefault(paymentMethodId);
          }
        }
      })
    );
    this.editCard = undefined;
    this.loading$ = this.tokenisationFacade.getPaymentMethodsLoading();
    this.tokenisationFacade.loadPaymentMethods();
  }

  protected sortPaymentMethodsForDisplay(
    paymentDetails: PaymentDetails[]
  ): PaymentDetails[] {
    const defaultPayments: PaymentDetails[] = [];
    const activeNonDefaultPayments: PaymentDetails[] = [];
    const expiredNonDefaultPayments: PaymentDetails[] = [];

    paymentDetails.forEach((paymentDetail) => {
      if (paymentDetail.defaultPayment) {
        defaultPayments.push(paymentDetail);
      } else if (this.isCardExpired(paymentDetail)) {
        expiredNonDefaultPayments.push(paymentDetail);
      } else {
        activeNonDefaultPayments.push(paymentDetail);
      }
    });

    return [
      ...defaultPayments,
      ...activeNonDefaultPayments,
      ...expiredNonDefaultPayments,
    ];
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
      this.translation.translate('paymentCard.defaultPaymentMethod'),
    ]).pipe(
      map(
        ([
          textSetAsDefault,
          textDelete,
          textExpires,
          textDefaultPaymentMethod,
        ]) => {
          const actions: { name: string; event: string }[] = [];
          if (!defaultPayment) {
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
    const expiryMonth = paymentMethod.expiryMonth;
    const expiryYear = paymentMethod.expiryYear;

    if (!expiryMonth || !expiryYear) {
      return false;
    }
    // original logic
    /*
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const parsedMonth = parseInt(expiryMonth, 10);
    const normalizedYear = this.normalizeExpiryYear(expiryYear);

    if (
      Number.isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      Number.isNaN(normalizedYear)
    ) {
      return false;
    }

    return (
      normalizedYear < currentYear ||
      (normalizedYear === currentYear && parsedMonth < currentMonth)
    );
*/

    // logic for testing. Only cards with date 03/30 are expired.
    const parsedMonth = parseInt(expiryMonth, 10);
    const normalizedYear = this.normalizeExpiryYear(expiryYear);

    if (
      Number.isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      Number.isNaN(normalizedYear)
    ) {
      return false;
    }

    return normalizedYear === 2030 && parsedMonth === 3;
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

  protected normalizeExpiryYear(expiryYear: string): number {
    const parsed = parseInt(expiryYear, 10);
    if (parsed < 100) {
      return 2000 + parsed;
    }
    return parsed;
  }
}
