/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccProductVariantsMultidimensionalConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          multidimensional:
            'products/${productCode}?fields=name,purchasable,baseOptions(DEFAULT),baseProduct,multidimensional,variantOptions(DEFAULT),variantMatrix',
        },
      },
    },
  },
};
