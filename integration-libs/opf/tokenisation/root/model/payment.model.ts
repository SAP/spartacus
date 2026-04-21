/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Address,
  CardType,
  PaymentDetails as CorePaymentDetails,
} from '@spartacus/core';

/**
 * OPF Tokenisation payment details model.
 * Re-exports core PaymentDetails for use within OPF tokenisation library.
 * This provides a single import point and allows future customization if needed.
 */
export type OpfPaymentDetails = CorePaymentDetails;

export interface OpfSapPaymentMethod {
  code?: string;
  name?: string;
}

export interface OpfSetDefaultPaymentPayload {
  id: string;
  accountHolderName?: string;
  cardType?: CardType;
  cardNumber?: string;
  startMonth?: string;
  startYear?: string;
  expiryMonth?: string;
  expiryYear?: string;
  issueNumber?: string;
  subscriptionId?: string;
  saved?: boolean;
  defaultPayment: true;
  billingAddress?: Address;
  sapPaymentMethod?: OpfSapPaymentMethod;
}
