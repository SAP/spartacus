import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../occ/occ-models/occ.models';
import { ProductReviewsAdapter } from './product-reviews-adapter';
import { Normalizer, NormalizersService } from '../../util/normalizers.service';

export const PRODUCT_REVIEWS_LIST_NORMALIZER = new InjectionToken<
  Normalizer<any, Review[]>
>('ProductReviewsList Normalizer');

export const PRODUCT_REVIEW_ADD_NORMALIZER = new InjectionToken<
  Normalizer<any, Review>
>('ProductReviewsAdd Normalizer');

@Injectable({
  providedIn: 'root',
})
export class ProductReviewsConnector {
  constructor(
    protected adapter: ProductReviewsAdapter,
    protected normalizers: NormalizersService
  ) {}

  getList(productCode: string, maxCount?: number): Observable<Review[]> {
    return this.adapter
      .loadList(productCode, maxCount)
      .pipe(this.normalizers.pipeable(PRODUCT_REVIEWS_LIST_NORMALIZER));
  }

  add(productCode: string, review: any): Observable<Review> {
    review = this.normalizers.normalize(review, PRODUCT_REVIEW_ADD_NORMALIZER);
    return this.adapter.post(productCode, review);
  }
}
