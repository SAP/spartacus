/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BundleSearchParams, ProductSearchPage } from '../../model/product-search.model';
import { SearchConfig } from '../model/search-config';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';

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

  bundleSearch(urlParams: BundleSearchParams, queryText: string | undefined, searchConfig?: SearchConfig): void {
    if (urlParams) {
      this.store.dispatch(
        new ProductActions.SearchBundleProducts(
          {
            userId: urlParams.userId || 'current',
            cartId: urlParams.cartId,
            entryGroupNumber: urlParams.entryGroupNumber,
          },
          { queryText, searchConfig }
        )
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
}
