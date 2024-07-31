/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../model';
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

  searchByCode({ code, scope }: { code: string; scope?: string }): void {
    this.store.dispatch(
      new ProductActions.SearchProductByCode({
        code,
        scope: scope ?? '',
      })
    );
  }

  getSearchByCodeResult({
    code,
    scope,
  }: {
    code: string;
    scope?: string;
  }): Observable<Product> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductSearchByCodeFactory({
          code,
          scope: scope ?? '',
        })
      )
    );
  }
}
