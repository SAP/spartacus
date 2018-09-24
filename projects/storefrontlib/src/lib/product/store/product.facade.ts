import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import * as fromStore from './index';
import { SearchConfig } from '../search-config';

@Injectable()
export class ProductFacade {
  searchResults$ = this.store
    .select(fromStore.getSearchResults)
    .pipe(filter(results => Object.keys(results).length > 0));

  constructor(private store: Store<fromStore.ProductsState>) {}

  getProductByCode(code: string): Observable<any> {
    return this.store.select(fromStore.getSelectedProductFactory(code));
  }

  getProductReviews(code: string): Observable<any> {
    return this.store
      .select(fromStore.getSelectedProductReviewsFactory(code))
      .pipe(
        tap(reviews => {
          if (reviews === undefined && code !== undefined) {
            this.store.dispatch(new fromStore.LoadProductReviews(code));
          }
        })
      );
  }

  submitReview(code: string, review: any) {
    this.store.dispatch(
      new fromStore.PostProductReview({
        productCode: code,
        review: review
      })
    );
  }

  searchProducts(query: string, searchConfig: SearchConfig) {
    this.store.dispatch(
      new fromStore.SearchProducts({
        queryText: query,
        searchConfig: searchConfig
      })
    );
  }

  getSuggestions(query: string, searchConfig: SearchConfig) {
    this.store.dispatch(
      new fromStore.GetProductSuggestions({
        term: query,
        searchConfig: searchConfig
      })
    );
  }
}
