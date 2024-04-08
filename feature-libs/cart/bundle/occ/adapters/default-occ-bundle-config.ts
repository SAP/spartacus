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
          'users/${userId}/carts/${cartId}/entrygroups/${entryGroupNumber}/allowedProductsSearch?fields=products(code,name,summary,configurable,configuratorType,multidimensional,price(FULL),images(DEFAULT),stock(FULL),averageRating,variantOptions),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT),freeTextSearch,currentQuery',
        product: {
          bundleTemplates:
            'products/${productCode}?fields=code,name,summary,bundleTemplates',
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
