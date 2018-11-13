import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ProductsState,
  getSelectedProductReviewsFactory,
  LoadProductReviews,
  PostProductReview
} from '@spartacus/core';

@Injectable()
export class ProductReviewService {
  constructor(private store: Store<ProductsState>) {}

  getByProductCode(productCode: string): Observable<any> {
    const selector = getSelectedProductReviewsFactory(productCode);
    return this.store.pipe(
      select(selector),
      tap(reviews => {
        if (reviews === undefined && productCode !== undefined) {
          this.store.dispatch(new LoadProductReviews(productCode));
        }
      })
    );
  }

  add(productCode: string, review: any) {
    this.store.dispatch(
      new PostProductReview({
        productCode: productCode,
        review: review
      })
    );
  }
}
