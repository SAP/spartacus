import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../store';
import { SearchConfig } from '../search-config';

@Injectable()
export class ProductSearchService {
  readonly searchResults$: Observable<any> = this.store
    .select(fromStore.getSearchResults)
    .pipe(filter(results => Object.keys(results).length > 0));

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
