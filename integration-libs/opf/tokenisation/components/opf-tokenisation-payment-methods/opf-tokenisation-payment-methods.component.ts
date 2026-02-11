/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  FormRequiredLegendComponent,
  ICON_TYPE,
  SpinnerComponent,
} from '@spartacus/storefront';
import { OpfTokenisationFacade } from '../../root/facade';

@Component({
  selector: 'cx-opf-tokenisation-payment-methods',
  templateUrl: './opf-tokenisation-payment-methods.component.html',
  imports: [
    NgIf,
    FormRequiredLegendComponent,
    SpinnerComponent,
    NgFor,
    CardComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class OpfTokenisationPaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<PaymentDetails[]>;
  editCard: string | undefined;
  iconTypes = ICON_TYPE;
  loading$: Observable<boolean>;

  constructor(
    private tokenisationFacade: OpfTokenisationFacade,
    private translation: TranslationService,
    protected globalMessageService?: GlobalMessageService
  ) {}

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
        ]) => {
          const actions: { name: string; event: string }[] = [];
          if (!defaultPayment) {
            actions.push({ name: textSetAsDefault, event: 'default' });
          }
          actions.push({ name: textDelete, event: 'edit' });
          const card: Card = {
            role: 'application',
            text: [cardNumber ?? '', textExpires],
            actions,
            deleteMsg: textDeleteConfirmation,
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
    this.globalMessageService?.add(
      { key: 'paymentMessages.setAsDefaultSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  getCardIcon(code: string): string {
    let ccIcon: string;
    if (code === 'visa') {
      ccIcon = this.iconTypes.VISA;
    } else if (code === 'master' || code === 'mastercard_eurocard') {
      ccIcon = this.iconTypes.MASTER_CARD;
    } else if (code === 'diners') {
      ccIcon = this.iconTypes.DINERS_CLUB;
    } else if (code === 'amex') {
      ccIcon = this.iconTypes.AMEX;
    } else {
      ccIcon = this.iconTypes.CREDIT_CARD;
    }

    return ccIcon;
  }

  getCardIconLabel(code: string | undefined): string {
    let ccIconLabel: string;
    if (code === 'visa') {
      ccIconLabel = 'paymentCard.visa';
    } else if (code === 'master') {
      ccIconLabel = 'paymentCard.master';
    } else if (code === 'mastercard_eurocard') {
      ccIconLabel = 'paymentCard.masterEuro';
    } else if (code === 'diners') {
      ccIconLabel = 'paymentCard.dinersClub';
    } else if (code === 'amex') {
      ccIconLabel = 'paymentCard.amex';
    } else if (code === 'switch') {
      ccIconLabel = 'paymentCard.switch';
    } else if (code === 'maestro') {
      ccIconLabel = 'paymentCard.maestro';
    } else {
      ccIconLabel = 'paymentCard.credit';
    }

    return ccIconLabel;
  }
}
