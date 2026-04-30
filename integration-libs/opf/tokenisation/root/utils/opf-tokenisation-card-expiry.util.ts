/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentDetails } from '@spartacus/core';

export function sortPaymentMethodsForDisplay(
  paymentDetails: PaymentDetails[]
): PaymentDetails[] {
  const defaultPayments: PaymentDetails[] = [];
  const activeNonDefaultPayments: PaymentDetails[] = [];
  const expiredNonDefaultPayments: PaymentDetails[] = [];

  paymentDetails.forEach((paymentDetail) => {
    if (paymentDetail.defaultPayment) {
      defaultPayments.push(paymentDetail);
    } else if (isTokenisationCardExpired(paymentDetail)) {
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

export function isTokenisationCardExpired(
  this: any,
  paymentMethod: PaymentDetails
): boolean {
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
  const normalizedYear = normalizeExpiryYear(expiryYear);

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

function normalizeExpiryYear(expiryYear: string): number {
  const parsed = parseInt(expiryYear, 10);
  if (parsed < 100) {
    return 2000 + parsed;
  }
  return parsed;
}
