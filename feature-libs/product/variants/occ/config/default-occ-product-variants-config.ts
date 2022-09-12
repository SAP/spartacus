/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@commerce-storefront-toolset/core';

export const defaultOccProductVariantsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          variants:
            'products/${productCode}?fields=name,purchasable,baseOptions(DEFAULT),baseProduct,variantOptions(DEFAULT),variantType',
        },
      },
    },
  },
};
