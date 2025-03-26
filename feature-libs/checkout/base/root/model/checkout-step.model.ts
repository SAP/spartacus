/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const enum CheckoutStepType {
  DELIVERY_ADDRESS = 'deliveryAddress',
  DELIVERY_MODE = 'deliveryMode',
  PAYMENT_DETAILS = 'paymentDetails',
  REVIEW_ORDER = 'reviewOrder',
  // TODO: Add augmentation from OPF LIB
  OPF_PAYMENT_AND_REVIEW = 'opfPaymentAndReview',
}

export const enum CheckoutStepState {
  COMPLETED = 'completed',
  SELECTED = 'selected',
  DISABLED = 'disabled',
}

export interface CheckoutStep {
  id: string;
  name: string;
  routeName: string;
  type: Array<CheckoutStepType>;
  disabled?: boolean;
  nameMultiLine?: boolean;
}
