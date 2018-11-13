import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  SearchConfig,
  ProductsState,
  getProductSuggestions,
  SearchProducts,
  GetProductSuggestions,
  getSearchResults,
  getAuxSearchResults
} from '@spartacus/core';

@Injectable()
export class ProductSearchService {
  readonly searchResults$: Observable<any> = this.store.pipe(
    select(getSearchResults),
    filter(results => Object.keys(results).length > 0)
  );

  readonly auxSearchResults$: Observable<any> = this.store.pipe(
    select(getAuxSearchResults),
    filter(results => Object.keys(results).length > 0)
  );

  readonly searchSuggestions$: Observable<any> = this.store.pipe(
    select(getProductSuggestions)
  );

  constructor(private store: Store<ProductsState>) {}

  search(query: string, searchConfig?: SearchConfig) {
    this.store.dispatch(
      new SearchProducts({
        queryText: query,
        searchConfig: searchConfig
      })
    );
  }

  searchAuxiliary(query: string, searchConfig?: SearchConfig) {
    this.store.dispatch(
      new SearchProducts(
        {
          queryText: query,
          searchConfig: searchConfig
        },
        true
      )
    );
  }

  getSuggestions(query: string, searchConfig?: SearchConfig) {
    this.store.dispatch(
      new GetProductSuggestions({
        term: query,
        searchConfig: searchConfig
      })
    );
  }
}
