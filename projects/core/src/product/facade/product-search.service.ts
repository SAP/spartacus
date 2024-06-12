/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { defer, Observable, of, combineLatest} from 'rxjs';
import { ProductSearchPage, ProductsListMap } from '../../model/product-search.model';
import { SearchConfig } from '../model/search-config';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';
import { Product } from '../../model/product.model';
import {filter, map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ProductSearchService {
  constructor(protected store: Store<StateWithProduct>) {}

  search(query: string | undefined, searchConfig?: SearchConfig): void {
    if (query) {
      this.store.dispatch(
        new ProductActions.SearchProducts({
          queryText: query,
          searchConfig: searchConfig,
        })
      );
    }
  }

  getResults(): Observable<ProductSearchPage> {
    return this.store.pipe(select(ProductSelectors.getSearchResults));
  }

  clearResults(): void {
    this.store.dispatch(
      new ProductActions.ClearProductSearchResult({
        clearPageResults: true,
      })
    );
  }

  /**
   * Triggers a search and returns the results as an Observable.
   *
   * @param codeList The search query string.
   * @param componentId
   * @returns An Observable of ProductSearchPage containing the search results.
   */
  searchAndReturnResults(codeList: string[], componentId: string): Observable<Observable<Product | undefined>[]> {
    console.log('Product carousel searchAndReturnResults() called for query(will be removed later): ', codeList);
    // Use defer to create an Observable that calls the search method
    const searchTrigger$ = defer(() => {
      // Perform the search
      this.searchByCodes(codeList, componentId);
      // Return an Observable that emits once immediately
      return of(null);
    });

    // Combine the trigger Observable with the search results Observable
    return combineLatest([searchTrigger$, this.getProductListResults()]).pipe(
      // Extract the search results from the combined latest values
      switchMap(([_, searchResults]) => of(searchResults)),
      // Filter out the initial state if necessary
      filter(results => results !== undefined && results !== null),
      // Map the ProductsListMap to Product[] by extracting the products array
      map((searchResults: ProductsListMap) => (searchResults[componentId] || []).map(product => of(product)))
    );
  }

  searchByCodes(codeList: string[], componentId: string): void {
    if (codeList.length > 0) {
      this.store.dispatch(
        new ProductActions.GetProductsList({
          codeList: codeList,
          componentId: componentId
        })
      );
    }
  }

  getProductListResults(): Observable<ProductsListMap> {
    return this.store.pipe(select(ProductSelectors.getProductsListResults));
  }
}
