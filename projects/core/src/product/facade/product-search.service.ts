/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BundleActions } from '@spartacus/cart/bundle/core';
import { Observable } from 'rxjs';
import { ProductSearchPage } from '../../model/product-search.model';
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

  searchInBundle(cartId: string, userId: string, entryGroupNumber: number, queryText?: string, searchConfig?: SearchConfig): void {
    this.store.dispatch(
      new BundleActions.GetBundleAllowedProducts({
        cartId,
        userId,
        entryGroupNumber,
        query: queryText,
        searchConfig
      })
    );
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
