/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address, PaymentDetails } from '@spartacus/core';
import { Card, getAddressNumbers } from '@spartacus/storefront';

/**
 * Get card for delivery address
 */
export function deliveryAddressCard(
  textTitle: string,
  textPhone: string,
  textMobile: string,
  deliveryAddress: Address,
  countryName?: string,
  addTitleToAddressCard = false
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
  const fullName = getAddressFullName(deliveryAddress, addTitleToAddressCard);

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
 * Builds the full name for an address, optionally prefixed with the title.
 */
function getAddressFullName(
  address: Address,
  addTitleToAddressCard: boolean
): string | undefined {
  let fullName;
  if (address.firstName && address.lastName) {
    fullName = address.firstName + ' ' + address.lastName;
  } else if (address.firstName) {
    fullName = address.firstName;
  } else if (address.lastName) {
    fullName = address.lastName;
  }

  if (addTitleToAddressCard && !!address.title && fullName) {
    fullName = address.title + ' ' + fullName;
  }

  return fullName;
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
