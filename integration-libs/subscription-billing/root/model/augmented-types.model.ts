/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricePlan, SubscriptionTerm } from './subscription-product.model';
import '@spartacus/core';

declare module '@spartacus/core' {
  interface Product {
    sapSubscriptionTerm?: SubscriptionTerm;
    sapPricePlan?: PricePlan;
  }
}

declare module '@spartacus/core' {
  const enum ProductScope {
    SUBSCRIPTION = 'subscription',
  }
}
