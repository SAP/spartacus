/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentType } from '@commerce-storefront-toolset/cart/base/root';
import '@commerce-storefront-toolset/checkout/base/root';
import { CostCenter } from '@commerce-storefront-toolset/core';

declare module '@commerce-storefront-toolset/checkout/base/root' {
  const enum CheckoutStepType {
    PAYMENT_TYPE = 'paymentType',
  }

  interface CheckoutState {
    costCenter?: CostCenter;
    purchaseOrderNumber?: string;
    paymentType?: PaymentType;
  }
}
