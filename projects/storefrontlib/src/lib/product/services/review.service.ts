import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class ReviewService {
  constructor(private store: Store<fromStore.ProductsState>) {}

  getByProductCode(productCode: string): Observable<any> {
    return this.store
      .select(fromStore.getSelectedProductReviewsFactory(productCode))
      .pipe(
        tap(reviews => {
          if (reviews === undefined && productCode !== undefined) {
            this.store.dispatch(new fromStore.LoadProductReviews(productCode));
          }
        })
      );
  }

  add(productCode: string, review: any) {
    this.store.dispatch(
      new fromStore.PostProductReview({
        productCode: productCode,
        review: review
      })
    );
  }
}
