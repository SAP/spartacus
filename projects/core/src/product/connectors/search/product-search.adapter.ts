/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SearchConfig } from '../../model/search-config';

import { Observable } from 'rxjs';
import {
  Suggestion,
  ProductSearchPage,
} from '../../../model/product-search.model';
import { Product } from '../../../model';

export abstract class ProductSearchAdapter {
  abstract search(
    query: string,
    searchConfig?: SearchConfig,
    scope?: string
  ): Observable<ProductSearchPage>;

  abstract searchByCodes(
    codes: string[],
    scope?: string
  ): Observable<{ products: Product[] }>;

  abstract loadSuggestions(
    term: string,
    pageSize?: number
  ): Observable<Suggestion[]>;
}
