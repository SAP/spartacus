/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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
import {
  COMMENT_PROMPT,
  NEGATIVE_SENTIMENTS_PROMPT,
  SENTIMENTS_PERCENTAGE_PROMPT,
  POSITIVE_SENTIMENTS_PROMPT,
  SUMMARY_PROMPT,
  FETCH_SPAM_PROMPT,
} from './ai-prompts';

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
    } else if (systemContent === 'sentimentsPercentage') {
      input = this.getSystemSentimentPercentageContent();
    } else if (systemContent === 'fetchSpams') {
      input = this.getSystemSpamContent();
    }
    console.log(reviews, systemContent);
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
    item.content = SUMMARY_PROMPT;
    input?.prompt?.push(item);
    return input;
  }

  private getSystemPositiveContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = POSITIVE_SENTIMENTS_PROMPT;
    input?.prompt?.push(item);
    return input;
  }
  private getSystemNegativeContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = NEGATIVE_SENTIMENTS_PROMPT;
    input?.prompt?.push(item);
    return input;
  }

  private getSystemCommentContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = COMMENT_PROMPT;
    input?.prompt?.push(item);
    return input;
  }

  private getSystemSentimentPercentageContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = SENTIMENTS_PERCENTAGE_PROMPT;
    input?.prompt?.push(item);
    return input;
  }

  private getSystemSpamContent(): aiPrompt {
    let input: aiPrompt = { prompt: [] };
    let item: aiRoleContent = {};
    item.role = 'system';
    item.content = FETCH_SPAM_PROMPT;
    input?.prompt?.push(item);
    return input;
  }

  updateSpamInfo(reviews: Review[]): Observable<Review[]> {
    let updatedReviews: Review[] = [];
    return this.getAiReponse(reviews, 'fetchSpams').pipe(
      switchMap((spam) => {
        let spamIndex = this.convertStringToNumberArray(
          spam.choices[0].message.content
        );
        reviews.forEach((review, index) => {
          let spamIdx = spamIndex.indexOf(index);
          if (spamIdx === -1) {
            let out = {};
            Object.assign(out, review, { isSpam: false });
            updatedReviews.push(out);
          } else {
            let out = {};
            Object.assign(out, review, { isSpam: true });
            updatedReviews.push(out);
          }
        });
        return of(updatedReviews);
      })
    );
  }

  convertStringToNumberArray(x: String): number[] {
    x = x.substring(1, x.length - 1);
    var y = x.split(',').map(function (item) {
      return parseInt(item, 10);
    });
    return y;
  }
}
