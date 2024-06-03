/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ProductReviewsConnector } from '../../connectors/reviews/product-reviews.connector';
import { ProductActions } from '../actions/index';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { LoggerService } from '../../../logger';

@Injectable()
export class ProductReviewsEffects {
  protected logger = inject(LoggerService);
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
          catchError((error) =>
            of(
              new ProductActions.LoadProductReviewsFail(
                normalizeHttpError(error, this.logger)
              )
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
            catchError((error) =>
              of(
                new ProductActions.PostProductReviewFail(
                  normalizeHttpError(error, this.logger)
                )
              )
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

  showGlobalMessageOnPostProductReviewFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.POST_PRODUCT_REVIEW_FAIL),
        tap(() => {
          this.globalMessageService.add(
            { key: 'productReview.postReviewFail' },
            GlobalMessageType.MSG_TYPE_ERROR
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
