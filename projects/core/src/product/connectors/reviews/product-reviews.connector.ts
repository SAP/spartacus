import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../../occ/occ-models/occ.models';
import { ProductReviewsAdapter } from './product-reviews.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewsConnector {
  constructor(protected adapter: ProductReviewsAdapter) {}

  getList(productCode: string, maxCount?: number): Observable<Review[]> {
    return this.adapter.loadList(productCode, maxCount);
  }

  add(productCode: string, review: any): Observable<Review> {
    return this.adapter.post(productCode, review);
  }
}
