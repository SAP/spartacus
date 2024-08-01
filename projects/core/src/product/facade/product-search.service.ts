/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { auditTime, map, Observable, tap, using } from 'rxjs';
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

  loadSearchByCode({ code, scope }: { code: string; scope?: string }): void {
    this.store.dispatch(
      new ProductActions.SearchProductByCode({
        code,
        scope: scope ?? '',
      })
    );
  }

  searchByCode({
    code,
    scope,
  }: {
    code: string;
    scope?: string;
  }): Observable<Product | undefined> {
    const state$ = this.store.pipe(
      select(
        ProductSelectors.getSelectedProductSearchByCodeStateFactory({
          code,
          scope: scope ?? '',
        })
      )
    );

    const loading$ = state$.pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadSearchByCode({ code, scope });
        }
      })
    );

    const value$ = state$.pipe(map((state) => state.value));

    return using(
      () => loading$.subscribe(),
      () => value$
    );
  }
}
