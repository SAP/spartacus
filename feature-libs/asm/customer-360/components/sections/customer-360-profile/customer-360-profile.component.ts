/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Card, FocusConfig, ICON_TYPE } from '@spartacus/storefront';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Customer360CustomerProfile,
  Customer360PaymentDetail,
  Customer360Profile,
} from '@spartacus/asm/customer-360/root';
import { Customer360SectionContext } from '../customer-360-section-context.model';

@Component({
  selector: 'cx-customer-360-profile',
  templateUrl: './customer-360-profile.component.html',
})
export class Customer360ProfileComponent implements OnInit {
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'customer-list-selector',
    focusOnEscape: true,
  };

  iconTypes = ICON_TYPE;

  customerProfileData$: Observable<Customer360Profile | undefined>;

  constructor(
    public sectionContext: Customer360SectionContext<Customer360CustomerProfile>,
    protected translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.customerProfileData$ = this.sectionContext.data$.pipe(
      map((data) => {
        return data?.profile;
      })
    );
  }
  getCardContent({
    defaultPayment,
    expiryMonth,
    expiryYear,
    cardNumber,
    cardType,
  }: Customer360PaymentDetail): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentCard.expires', {
        month: expiryMonth,
        year: expiryYear,
      }),
      this.translation.translate('paymentCard.defaultPaymentMethod'),
    ]).pipe(
      map(([textExpires, textDefaultPaymentMethod]) => {
        const card: Card = {
          role: 'region',
          header: defaultPayment ? textDefaultPaymentMethod : undefined,
          text: [cardNumber ?? '', textExpires],
          img: this.getCardIcon(cardType?.code ?? ''),
          label: defaultPayment
            ? 'paymentCard.defaultPaymentLabel'
            : 'paymentCard.additionalPaymentLabel',
        };
        return card;
      })
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
}
