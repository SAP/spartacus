/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ErrorAction } from '../../../error-handling';
import { Review } from '../../../model/product.model';

export const LOAD_PRODUCT_REVIEWS = '[Product] Load Product Reviews Data';
export const LOAD_PRODUCT_REVIEWS_FAIL =
  '[Product] Load Product Reviews Data Fail';
export const LOAD_PRODUCT_REVIEWS_SUCCESS =
  '[Product] Load Product Reviews Data Success';
export const POST_PRODUCT_REVIEW = '[Product] Post Product Review';
export const POST_PRODUCT_REVIEW_FAIL = '[Product] Post Product Review Fail';
export const POST_PRODUCT_REVIEW_SUCCESS =
  '[Product] Post Product Review Success';

export class LoadProductReviews implements Action {
  readonly type = LOAD_PRODUCT_REVIEWS;

  constructor(public payload: string) {}
}

export class LoadProductReviewsFail implements ErrorAction {
  readonly type = LOAD_PRODUCT_REVIEWS_FAIL;
  public error: any;

  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: any);
  /**
   * @deprecated Please pass the argument `payload` (i.e. the error object).
   *             It will become mandatory along with removing
   *             the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   */
  constructor();
  constructor(public payload?: any) {
    this.error = payload;
  }
}

export class LoadProductReviewsSuccess implements Action {
  readonly type = LOAD_PRODUCT_REVIEWS_SUCCESS;

  constructor(public payload: { productCode: string; list: Review[] }) {}
}

export class PostProductReview implements Action {
  readonly type = POST_PRODUCT_REVIEW;

  constructor(public payload: { productCode: string; review: Review }) {}
}

export class PostProductReviewFail implements ErrorAction {
  readonly type = POST_PRODUCT_REVIEW_FAIL;
  public error: any;

  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: any);
  /**
   * @deprecated Please pass the argument `payload` (i.e. the error object).
   *             It will become mandatory along with removing
   *             the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   */
  constructor();
  constructor(public payload?: any) {
    this.error = payload;
  }
}

export class PostProductReviewSuccess implements Action {
  readonly type = POST_PRODUCT_REVIEW_SUCCESS;

  constructor(public payload: Review) {}
}

// action types
export type ProductReviewsAction =
  | LoadProductReviews
  | LoadProductReviewsFail
  | LoadProductReviewsSuccess
  | PostProductReview
  | PostProductReviewFail
  | PostProductReviewSuccess;
