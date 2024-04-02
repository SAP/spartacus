/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from './address.model';

export interface CardType {
  code?: string;
  name?: string;
}
export interface PaymentDetails {
  accountHolderName?: string;
  billingAddress?: Address;
  cardNumber?: string;
  cardType?: CardType;
  cvn?: string;
  defaultPayment?: boolean;
  expiryMonth?: string;
  expiryYear?: string;
  id?: string;
  issueNumber?: string;
  saved?: boolean;
  startMonth?: string;
  startYear?: string;
  subscriptionId?: string;
}
