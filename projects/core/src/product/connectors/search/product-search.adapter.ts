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

export abstract class ProductSearchAdapter {
  abstract search(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<ProductSearchPage>;

  abstract loadSuggestions(
    term: string,
    pageSize?: number
  ): Observable<Suggestion[]>;

  abstract searchByCodes(
    codeList: string[]
  ): Observable<ProductSearchPage>;
}
