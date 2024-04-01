/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BundleProductScope } from '@spartacus/cart/bundle/core';
import { OccConfig } from '@spartacus/core';

export const defaultOccBundleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        bundleStart: 'users/${userId}/carts/${cartId}/bundles?fields=FULL',
        bundleAllowedProductsSearch:
          'users/${userId}/carts/${cartId}/entrygroups/${entryGroupNumber}/allowedProductsSearch?fields=products(FULL)',
        product: {
          bundleTemplates:
            'products/${productCode}?fields=code,bundleTemplates',
        },
      },
    },
    loadingScopes: {
      product: {
        details: {
          include: [BundleProductScope.TEMPLATES],
        },
      },
    },
  },
};
