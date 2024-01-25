/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Card, FocusConfig, ICON_TYPE } from '@spartacus/storefront';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AsmCustomer360CustomerProfile,
  AsmCustomer360PaymentDetail,
  AsmCustomer360Profile,
  PaymentCardCode,
} from '@spartacus/asm/customer-360/root';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';

@Component({
  selector: 'cx-asm-customer-360-profile',
  templateUrl: './asm-customer-360-profile.component.html',
})
export class AsmCustomer360ProfileComponent implements OnInit {
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'customer-list-selector',
    focusOnEscape: true,
  };

  iconTypes = ICON_TYPE;

  customerProfileData$: Observable<AsmCustomer360Profile | undefined>;

  constructor(
    public sectionContext: AsmCustomer360SectionContext<AsmCustomer360CustomerProfile>,
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
  }: AsmCustomer360PaymentDetail): Observable<Card> {
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
    if (code === PaymentCardCode.VISA) {
      ccIcon = this.iconTypes.VISA;
    } else if (
      code === PaymentCardCode.MASTER ||
      code === PaymentCardCode.MASTERCARD_EUROCARD
    ) {
      ccIcon = this.iconTypes.MASTER_CARD;
    } else if (code === PaymentCardCode.DINERS) {
      ccIcon = this.iconTypes.DINERS_CLUB;
    } else if (code === PaymentCardCode.AMEX) {
      ccIcon = this.iconTypes.AMEX;
    } else {
      ccIcon = this.iconTypes.CREDIT_CARD;
    }
    return ccIcon;
  }
}
