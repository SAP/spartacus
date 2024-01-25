/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccBulkPricingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          bulkPrices:
            'orgProducts/${productCode}?fields=price(DEFAULT),volumePrices(FULL)',
        },
      },
    },
  },
};
