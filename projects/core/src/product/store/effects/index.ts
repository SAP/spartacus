/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductReferencesEffects } from './product-references.effect';
import { ProductReviewsEffects } from './product-reviews.effect';
import { ProductSearchByCodesEffects } from './product-search-by-codes.effect';
import { ProductsSearchEffects } from './product-search.effect';
import { ProductEffects } from './product.effect';

export const effects: any[] = [
  ProductsSearchEffects,
  ProductSearchByCodesEffects,
  ProductEffects,
  ProductReviewsEffects,
  ProductReferencesEffects,
];

export * from './product-references.effect';
export * from './product-reviews.effect';
export * from './product-search-by-codes.effect';
export * from './product-search.effect';
export * from './product.effect';
