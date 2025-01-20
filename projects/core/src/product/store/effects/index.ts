/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductReferencesEffects } from './product-references.effect';
import { ProductReviewsEffects } from './product-reviews.effect';
import { ProductsSearchEffects } from './product-search.effect';
import { ProductEffects } from './product.effect';
import { ProductSearchByCodeEffects } from './product-search-by-code.effect';
import { ProductSearchByCategoryEffects } from './product-search-by-category.effect';

export const effects: any[] = [
  ProductsSearchEffects,
  ProductSearchByCodeEffects,
  ProductSearchByCategoryEffects,
  ProductEffects,
  ProductReviewsEffects,
  ProductReferencesEffects,
];

export * from './product-references.effect';
export * from './product-reviews.effect';
export * from './product-search.effect';
export * from './product-search-by-code.effect';
export * from './product-search-by-category.effect';
export * from './product.effect';
