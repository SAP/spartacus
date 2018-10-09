import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../store';
import { SearchConfig } from '../search-config';

@Injectable()
export class ProductSearchService {
  readonly searchResults$: Observable<any> = this.store.pipe(
    select(fromStore.getSearchResults),
    filter(results => Object.keys(results).length > 0)
  );

  readonly searchSuggestions$: Observable<any> = this.store.pipe(
    select(fromStore.getProductSuggestions)
  );

  constructor(private store: Store<fromStore.ProductsState>) {}

  search(query: string, searchConfig?: SearchConfig) {
    this.store.dispatch(
      new fromStore.SearchProducts({
        queryText: query,
        searchConfig: searchConfig
      })
    );
  }

  getSuggestions(query: string, searchConfig?: SearchConfig) {
    this.store.dispatch(
      new fromStore.GetProductSuggestions({
        term: query,
        searchConfig: searchConfig
      })
    );
  }
}
