/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccSubscriptionBillingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          subscription:
            'products/${productCode}?fields=sapPricePlan,sapSubscriptionTerm',
        },
      },
    },
  },
};
