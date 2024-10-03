/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  JSONLD_PRODUCT_REVIEW_BUILDER,
  PRODUCT_REVIEW_SERVICE,
  SEO_CONFIG,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

//projects/storefrontlib/cms-structure/seo/structured-data/builders/product/jsonld-product-review.builder.ts
export const JSONLD_PRODUCT_REVIEW_BUILDER_MIGRATION: ConstructorDeprecation = {
  class: JSONLD_PRODUCT_REVIEW_BUILDER,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: PRODUCT_REVIEW_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: SEO_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
