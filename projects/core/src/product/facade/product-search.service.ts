/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable, merge, Subject } from 'rxjs';
import { ProductSearchPage } from '../../model/product-search.model';
import { SearchConfig } from '../model/search-config';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchService {
  transferState = inject(TransferState, { optional: true });

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
    const results = this.getResultsFromTransferState();

    if (results) {
      return merge(
        this.store.pipe(select(ProductSelectors.getSearchResults)),
        results
      );
    }

    return this.store.pipe(select(ProductSelectors.getSearchResults));
  }

  clearResults(): void {
    this.store.dispatch(
      new ProductActions.ClearProductSearchResult({
        clearPageResults: true,
      })
    );
  }

  protected getResultsFromTransferState():
    | Observable<ProductSearchPage>
    | undefined {
    if (this.transferState) {
      const subject = new Subject<ProductSearchPage>();
      const CX_KEY = makeStateKey<string>('cx-state');
      const state = this.transferState.get(CX_KEY, <any>{});
      const results = state[PRODUCT_FEATURE]?.search?.results;
      subject.next(results);

      return results ? subject.asObservable() : undefined;
    }
    return undefined;
  }
}
