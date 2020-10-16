import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Review } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  constructor(protected store: Store<StateWithProduct>) {}

  getByProductCode(productCode: string): Observable<Review[]> {
    return this.store.pipe(
      select(ProductSelectors.getSelectedProductReviewsFactory(productCode)),
      tap((reviews) => {
        if (reviews === undefined && productCode !== undefined) {
          this.store.dispatch(
            new ProductActions.LoadProductReviews(productCode)
          );
        }
      })
    );
  }

  add(productCode: string, review: Review): void {
    this.store.dispatch(
      new ProductActions.PostProductReview({
        productCode: productCode,
        review,
      })
    );
  }
}
