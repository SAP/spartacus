import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductSearchPage } from '../../model/product-search.model';
import { SearchConfig } from '../model/search-config';
import * as fromStore from '../store/index';

@Injectable()
export class ProductSearchService {
  constructor(protected store: Store<fromStore.StateWithProduct>) {}

  search(query: string, searchConfig?: SearchConfig): void {
    this.store.dispatch(
      new fromStore.SearchProducts({
        queryText: query,
        searchConfig: searchConfig,
      })
    );
  }

  getResults(): Observable<ProductSearchPage> {
    return this.store.pipe(select(fromStore.getSearchResults));
  }

  clearResults(): void {
    this.store.dispatch(
      new fromStore.ClearProductSearchResult({
        clearPageResults: true,
      })
    );
  }
}
