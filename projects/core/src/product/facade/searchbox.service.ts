/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { select, ActionsSubject } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';
import { ProductSearchPage, Suggestion } from '../../model/index';
import { SearchConfig } from '../model/index';
import { ProductActions } from '../store/actions/index';
import { ProductSelectors } from '../store/selectors/index';
import { ProductSearchService } from './product-search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchboxService extends ProductSearchService {
  private actionsSubject = inject(ActionsSubject);

  /**
   * dispatch the search for the search box
   */
  search(query: string, searchConfig?: SearchConfig): void {
    this.store.dispatch(
      new ProductActions.SearchProducts(
        {
          queryText: query,
          searchConfig: searchConfig,
        },
        true
      )
    );
  }

  /**
   * Performs search and returns an Observable that emits when the search is completed
   */
  searchWithCompletion(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<boolean> {
    this.search(query, searchConfig);
    return this.actionsSubject.pipe(
      filter(
        (action: any) =>
          action.type === ProductActions.SEARCH_PRODUCTS_SUCCESS ||
          action.type === ProductActions.SEARCH_PRODUCTS_FAIL
      ),
      take(1)
    );
  }

  getResults(): Observable<ProductSearchPage> {
    return this.store.pipe(select(ProductSelectors.getAuxSearchResults));
  }

  /**
   * clears the products and suggestions
   */
  clearResults(): void {
    this.store.dispatch(
      new ProductActions.ClearProductSearchResult({
        clearSearchboxResults: true,
      })
    );
  }

  getSuggestionResults(): Observable<Suggestion[]> {
    return this.store.pipe(select(ProductSelectors.getProductSuggestions));
  }

  searchSuggestions(query: string, searchConfig?: SearchConfig): void {
    this.store.dispatch(
      new ProductActions.GetProductSuggestions({
        term: query,
        searchConfig: searchConfig,
      })
    );
  }

  /**
   * Performs suggestions search and returns an Observable that emits when the operation is completed
   */
  searchSuggestionsWithCompletion(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<boolean> {
    this.searchSuggestions(query, searchConfig);
    return this.actionsSubject.pipe(
      filter(
        (action: any) =>
          action.type === ProductActions.GET_PRODUCT_SUGGESTIONS_SUCCESS ||
          action.type === ProductActions.GET_PRODUCT_SUGGESTIONS_FAIL
      ),
      take(1)
    );
  }
}
