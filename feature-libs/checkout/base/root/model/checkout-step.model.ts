/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const enum CheckoutStepType {
  DELIVERY_ADDRESS = 'deliveryAddress',
  DELIVERY_MODE = 'deliveryMode',
  PAYMENT_DETAILS = 'paymentDetails',
  REVIEW_ORDER = 'reviewOrder',
  PAYMENT_REVIEW = 'paymentAndReview',
}

export interface CheckoutStep {
  id: string;
  name: string;
  routeName: string;
  type: Array<CheckoutStepType>;
  disabled?: boolean;
  nameMultiLine?: boolean;
}
