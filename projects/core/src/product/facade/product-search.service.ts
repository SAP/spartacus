import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductSearchPage } from '../../model/product-search.model';
import { SearchConfig } from '../model/search-config';
import * as fromStore from '../store/index';

@Injectable()
export class ProductSearchService {
  constructor(
    protected store: Store<fromStore.StateWithProduct>,
    private router: Router
  ) {}

  search(query: string, searchConfig?: SearchConfig): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { ...searchConfig, query },
      preserveFragment: false,
    });

    this.router.navigateByUrl(urlTree);
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
