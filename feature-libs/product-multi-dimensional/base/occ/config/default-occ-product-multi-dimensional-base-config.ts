/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccProductMultiDimensionalBaseConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        productSearch:
          'products/search?fields=products(code,name,summary,configurable,configuratorType,priceRange(maxPrice(formattedValue),minPrice(formattedValue)),multidimensional,price(FULL),images(DEFAULT),stock(FULL),averageRating,variantOptions),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT),freeTextSearch,currentQuery,keywordRedirectUrl',
      },
    },
  },
};
