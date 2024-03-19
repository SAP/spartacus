/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ProductSearchPage,
  Suggestion,
} from '../../model/product-search.model';
import { Product } from '../../model/product.model';
import { EntityScopedLoaderState } from '../../state/utils/scoped-loader/scoped-loader.state';

export const BUNDDLE_FEATURE = 'bundle';

export interface StateWithProduct {
  [BUNDDLE_FEATURE]: any;
}

export interface BundleProductListState {
  productList: Product[];
}
