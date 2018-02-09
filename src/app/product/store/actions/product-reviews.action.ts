import { Action } from '@ngrx/store';

export const LOAD_PRODUCT_REVIEWS = '[Product] Load Product Reviews Data';
export const LOAD_PRODUCT_REVIEWS_FAIL =
  '[Product] Load Product Reviews Data Fail';
export const LOAD_PRODUCT_REVIEWS_SUCCESS =
  '[Product] Load Product Reviews Data Success';

export class LoadProductReviews implements Action {
  readonly type = LOAD_PRODUCT_REVIEWS;
  constructor(public payload: string) {}
}

export class LoadProductReviewsFail implements Action {
  readonly type = LOAD_PRODUCT_REVIEWS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductReviewsSuccess implements Action {
  readonly type = LOAD_PRODUCT_REVIEWS_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type ProductReviewsAction =
  | LoadProductReviews
  | LoadProductReviewsFail
  | LoadProductReviewsSuccess;
