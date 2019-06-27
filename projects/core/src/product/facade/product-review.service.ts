import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Review } from '../../model/product.model';
import * as fromStore from '../store/index';
import { ProductSelectors } from '../store/selectors/index';

@Injectable()
export class ProductReviewService {
  constructor(protected store: Store<fromStore.StateWithProduct>) {}

  getByProductCode(productCode: string): Observable<Review[]> {
    return this.store.pipe(
      select(ProductSelectors.getSelectedProductReviewsFactory(productCode)),
      tap(reviews => {
        if (reviews === undefined && productCode !== undefined) {
          this.store.dispatch(new fromStore.LoadProductReviews(productCode));
        }
      })
    );
  }

  add(productCode: string, review: Review): void {
    this.store.dispatch(
      new fromStore.PostProductReview({
        productCode: productCode,
        review,
      })
    );
  }
}
