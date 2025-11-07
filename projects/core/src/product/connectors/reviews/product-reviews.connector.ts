/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReviewsAdapter } from './product-reviews.adapter';
import { Review } from '../../../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewsConnector {
  protected adapter = inject(ProductReviewsAdapter);


  get(productCode: string, maxCount?: number): Observable<Review[]> {
    return this.adapter.load(productCode, maxCount);
  }

  add(productCode: string, review: any): Observable<Review> {
    return this.adapter.post(productCode, review);
  }
}
