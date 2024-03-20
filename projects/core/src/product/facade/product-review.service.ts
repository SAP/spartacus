/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { aiPrompt, aiRoleContent, Review } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';
import { ProductReviewsConnector } from '../connectors';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  constructor(
    protected store: Store<StateWithProduct>,
    protected productReviewsConnector: ProductReviewsConnector
  ) {}

  getByProductCode(productCode: string): Observable<Review[]> {
    return this.store.pipe(
      select(ProductSelectors.getSelectedProductReviewsFactory(productCode)),
      tap((reviews) => {
        if (reviews === undefined && productCode !== undefined) {
          this.store.dispatch(
            new ProductActions.LoadProductReviews(productCode)
          );
        }
      }),
      map((reviews) => reviews ?? [])
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

  getOverallReview(reviews: Review[], systemContent: string): Observable<any> {
    let aiPrompt = this.reFormatInput(reviews, systemContent);
    console.log(JSON.stringify(aiPrompt));
    if (reviews?.length > 0)
      return this.productReviewsConnector.getOverallReview(aiPrompt);
    else return EMPTY;
  }

  reFormatInput(reviews: Review[], systemContent: string): aiPrompt {
    let input: aiPrompt;
    if (systemContent === 'summary') {
      input = this.getSystemSummaryContent();
    } else {
      input = this.getSystemSentimentContent();
    }
    let item: aiRoleContent = {};
    item.role = 'user';
    reviews.forEach((review) => {
      item.content = review.comment;
      input?.prompt?.push(item);
    });
    return input;
  }

  getSystemSummaryContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = 'Generate review summary';
    input?.prompt?.push(item);
    return input;
  }
  getSystemSentimentContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = 'Tags in new line with positive and negative sentiments';
    input?.prompt?.push(item);
    return input;
  }
}
