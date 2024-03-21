/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  aiPrompt,
  aiResponse,
  aiRoleContent,
  Product,
  Review,
} from '../../model/product.model';
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
  getComment(review: Review, product: Product): Observable<string | undefined> {
    let input: aiPrompt = this.getSystemCommentContent();
    // adding product
    let itemProduct: aiRoleContent = {};
    itemProduct.role = 'user';
    let item: string = 'Product Description: ';
    item = item.concat(product?.description ?? '');
    itemProduct.content = item;
    input?.prompt?.push(itemProduct);
    // adding title
    let itemTitle: aiRoleContent = {};
    itemTitle.role = 'user';
    let title: string = 'Review Title: ';
    title = title.concat(review.headline ?? '');
    itemTitle.content = title;
    input?.prompt?.push(itemTitle);
    // adding rating
    let itemRating: aiRoleContent = {};
    itemRating.role = 'user';
    let rate: string;
    if (review.rating === null) {
      review.rating = 0;
    }
    rate = 'The customer rating is ';
    rate = rate.concat((review.rating ?? 0).toString());
    rate = rate.concat(' out of 5');
    itemRating.content = rate;
    input?.prompt?.push(itemRating);
    return this.productReviewsConnector.getAiResponse(input).pipe(
      map((aiResponse: aiResponse) => {
        return aiResponse?.choices?.[0].message?.content;
      })
    );
  }

  getAiReponse(reviews: Review[], systemContent: string): Observable<any> {
    let aiPrompt = this.reFormatInput(reviews, systemContent);
    if (reviews?.length > 0)
      return this.productReviewsConnector.getAiResponse(aiPrompt);
    else return EMPTY;
  }

  private reFormatInput(reviews: Review[], systemContent: string): aiPrompt {
    let input: aiPrompt = {};
    if (systemContent === 'summary') {
      input = this.getSystemSummaryContent();
    } else if (systemContent === 'positiveSentiments') {
      input = this.getSystemPositiveContent();
    } else if (systemContent === 'negativeSentiments') {
      input = this.getSystemNegativeContent();
    }
    reviews.forEach((review) => {
      let item: aiRoleContent = {};
      item.role = 'user';
      item.content = review.comment;
      input?.prompt?.push(item);
    });
    return input;
  }

  private getSystemSummaryContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = 'Generate review summary';
    input?.prompt?.push(item);
    return input;
  }

  private getSystemPositiveContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = 'Tags in separate lines with positive sentiments';
    input?.prompt?.push(item);
    return input;
  }
  private getSystemNegativeContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = 'Tags in separate lines line with negative sentiments';
    input?.prompt?.push(item);
    return input;
  }

  private getSystemCommentContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content =
      'Generate a detailed customer review comment with approximately 30 words based on product details, review title and rating (out of 5) provided by customer';
    input?.prompt?.push(item);
    return input;
  }
}
