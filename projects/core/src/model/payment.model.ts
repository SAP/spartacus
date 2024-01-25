/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from './address.model';

/**
 * Use 'CardType' from '@spartacus/checkout/base/root' instead.
 * @deprecated since version 5.0
 *
 * // TODO:#deprecation-checkout - remove
 */
export interface CardType {
  code?: string;
  name?: string;
}
/**
 * Use 'CardType' from '@spartacus/checkout/base/root' instead.
 * @deprecated since version 5.0
 *
 * // TODO:#deprecation-checkout - remove
 */
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
