/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ErrorModel } from '../../../model/misc.model';
import { ProductReviewsConnector } from '../../connectors/reviews/product-reviews.connector';
import { ProductActions } from '../actions/index';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message/index';

@Injectable()
export class ProductReviewsEffects {
  loadProductReviews$: Observable<
    | ProductActions.LoadProductReviewsSuccess
    | ProductActions.LoadProductReviewsFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.LOAD_PRODUCT_REVIEWS),
      map((action: ProductActions.LoadProductReviews) => action.payload),
      mergeMap((productCode) => {
        return this.productReviewsConnector.get(productCode).pipe(
          map((data) => {
            return new ProductActions.LoadProductReviewsSuccess({
              productCode,
              list: data,
            });
          }),
          catchError((_error) =>
            of(
              new ProductActions.LoadProductReviewsFail({
                message: productCode,
              } as ErrorModel)
            )
          )
        );
      })
    )
  );

  postProductReview: Observable<
    | ProductActions.PostProductReviewSuccess
    | ProductActions.PostProductReviewFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.POST_PRODUCT_REVIEW),
      map((action: ProductActions.PostProductReview) => action.payload),
      mergeMap((payload) => {
        return this.productReviewsConnector
          .add(payload.productCode, payload.review)
          .pipe(
            map((reviewResponse) => {
              return new ProductActions.PostProductReviewSuccess(
                reviewResponse
              );
            }),
            catchError((_error) =>
              of(new ProductActions.PostProductReviewFail({
                message: payload.productCode,
              } as ErrorModel))
            )
          );
      })
    )
  );

  showGlobalMessageOnPostProductReviewSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.POST_PRODUCT_REVIEW_SUCCESS),
        tap(() => {
          this.globalMessageService.add(
            { key: 'productReview.thankYouForReview' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private productReviewsConnector: ProductReviewsConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
