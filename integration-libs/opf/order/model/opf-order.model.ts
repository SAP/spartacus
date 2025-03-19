/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address, Occ, PaymentDetails } from '@spartacus/core';

export interface OpfOccOrder extends Omit<Occ.Order, 'paymentInfo'> {
  sapBillingAddress: Address;
  paymentInfo: Omit<PaymentDetails, 'billingAddress'>;
}
