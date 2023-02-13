/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import {
  Address,
  PaymentDetails,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import {
  AddressBookComponentService,
  Card,
  FocusConfig,
  ICON_TYPE,
} from '@spartacus/storefront';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerProfileData } from './asm-customer-profile.model';

@Component({
  selector: 'cx-asm-customer-profile',
  templateUrl: './asm-customer-profile.component.html',
})
export class AsmCustomerProfileComponent implements OnInit {
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'customer-list-selector',
    focusOnEscape: true,
  };

  iconTypes = ICON_TYPE;

  customerProfileData$: Observable<CustomerProfileData>;

  constructor(
    protected translation: TranslationService,
    protected userPaymentService: UserPaymentService,
    protected addressBookComponentService: AddressBookComponentService
  ) {}

  ngOnInit(): void {
    this.customerProfileData$ = combineLatest([
      this.userPaymentService.getPaymentMethods(),
      this.addressBookComponentService.getAddresses(),
    ]).pipe(
      map(([paymentDetails, addresses]) => {
        const defaultPaymentDetail = paymentDetails.find(
          (paymentDetail) => paymentDetail.defaultPayment
        );
        const deliveryAddress: Address | undefined = addresses.find(
          (address) => address.defaultAddress
        );
        return {
          billingAddress: defaultPaymentDetail?.billingAddress,
          deliveryAddress: deliveryAddress,
          phone1: deliveryAddress?.phone,
          phone2: deliveryAddress?.cellphone,
          paymentInfoList: paymentDetails,
        };
      })
    );
    this.userPaymentService.loadPaymentMethods();
    this.addressBookComponentService.loadAddresses();
  }

  getCardContent({
    defaultPayment,
    expiryMonth,
    expiryYear,
    cardNumber,
    cardType,
  }: PaymentDetails): Observable<Card> {
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
