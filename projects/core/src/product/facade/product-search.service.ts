import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as fromStore from '../store/index';
import { SearchConfig } from '../model/search-config';
import { ProductSearchPage, Suggestion } from '../../occ/occ-models';

@Injectable()
export class ProductSearchService {
  constructor(
    private store: Store<fromStore.StateWithProduct>,
    private router: Router
  ) {}

  search(query: string, searchConfig?: SearchConfig) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { ...searchConfig, query },
      preserveFragment: false
    });

    this.router.navigateByUrl(urlTree);
    this.store.dispatch(
      new fromStore.SearchProducts({
        queryText: query,
        searchConfig: searchConfig
      })
    );
  }

  getSearchResults(): Observable<ProductSearchPage> {
    return this.store.pipe(
      select(fromStore.getSearchResults),
      filter(results => Object.keys(results).length > 0)
    );
  }

  getAuxSearchResults(): Observable<ProductSearchPage> {
    return this.store.pipe(
      select(fromStore.getAuxSearchResults),
      filter(results => Object.keys(results).length > 0)
    );
  }

  getSearchSuggestions(): Observable<Suggestion[]> {
    return this.store.pipe(select(fromStore.getProductSuggestions));
  }

  searchAuxiliary(query: string, searchConfig?: SearchConfig) {
    this.store.dispatch(
      new fromStore.SearchProducts(
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
      new fromStore.GetProductSuggestions({
        term: query,
        searchConfig: searchConfig
      })
    );
  }
}
