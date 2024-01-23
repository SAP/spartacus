/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeliveryMode, PaymentDetails } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import { Card, getAddressNumbers } from '@spartacus/storefront';

/**
 * Get card for delivery address
 */
export function deliveryAddressCard(
  textTitle: string,
  textPhone: string,
  textMobile: string,
  deliveryAddress: Address,
  countryName?: string
): Card {
  if (!countryName) {
    countryName = deliveryAddress?.country?.name as string;
  }

  let region = '';
  if (
    deliveryAddress &&
    deliveryAddress.region &&
    deliveryAddress.region.isocode
  ) {
    region = deliveryAddress.region.isocode + ', ';
  }

  const numbers = getAddressNumbers(deliveryAddress, textPhone, textMobile);
  let fullName;
  if (deliveryAddress.firstName && deliveryAddress.lastName) {
    fullName = deliveryAddress.firstName + ' ' + deliveryAddress.lastName;
  } else if (deliveryAddress.firstName) {
    fullName = deliveryAddress.firstName;
  } else if (deliveryAddress.lastName) {
    fullName = deliveryAddress.lastName;
  }

  return {
    title: textTitle,
    textBold: fullName,
    text: [
      deliveryAddress.line1,
      deliveryAddress.line2,
      deliveryAddress.town + ', ' + region + countryName,
      deliveryAddress.postalCode,
      numbers,
    ],
  } as Card;
}

/**
 * Get card for delivery mode
 */
export function deliveryModeCard(
  textTitle: string,
  deliveryMode: DeliveryMode
): Card {
  return {
    title: textTitle,
    textBold: deliveryMode.name,
    text: [
      deliveryMode.description,
      deliveryMode.deliveryCost?.formattedValue
        ? deliveryMode.deliveryCost?.formattedValue
        : '',
    ],
  } as Card;
}

/**
 * Get card for payment method
 */
export function paymentMethodCard(
  textTitle: string,
  textExpires: string,
  paymentDetails: PaymentDetails
): Card {
  return {
    title: textTitle,
    text: [
      paymentDetails.cardType?.name,
      paymentDetails.accountHolderName,
      paymentDetails.cardNumber,
      textExpires,
    ],
  } as Card;
}

/**
 * Get card for billing address
 */
export function billingAddressCard(
  textTitle: string,
  textBillTo: string,
  paymentDetails: PaymentDetails
): Card {
  const region = paymentDetails.billingAddress?.region?.isocode
    ? paymentDetails.billingAddress?.region?.isocode + ', '
    : '';
  return {
    title: textTitle,
    text: [
      textBillTo,
      paymentDetails.billingAddress?.firstName +
        ' ' +
        paymentDetails.billingAddress?.lastName,
      paymentDetails.billingAddress?.line1,
      paymentDetails.billingAddress?.town +
        ', ' +
        region +
        paymentDetails.billingAddress?.country?.isocode,
      paymentDetails.billingAddress?.postalCode,
    ],
  } as Card;
}
