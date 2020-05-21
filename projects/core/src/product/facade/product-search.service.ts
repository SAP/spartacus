import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
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

  search(query: string, searchConfig?: SearchConfig): void {
    this.store.dispatch(
      new ProductActions.SearchProducts({
        queryText: query,
        searchConfig: searchConfig,
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
