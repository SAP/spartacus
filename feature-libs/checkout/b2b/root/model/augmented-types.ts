/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentType } from '@spartacus/cart/base/root';
import '@spartacus/checkout/base/root';
import { CostCenter } from '@spartacus/core';

declare module '@spartacus/checkout/base/root' {
  const enum CheckoutStepType {
    PAYMENT_TYPE = 'paymentType',
  }

  interface CheckoutState {
    costCenter?: CostCenter;
    purchaseOrderNumber?: string;
    paymentType?: PaymentType;
  }
}
