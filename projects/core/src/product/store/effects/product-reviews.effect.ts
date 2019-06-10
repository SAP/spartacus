import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductReviewsConnector } from '../../connectors/reviews/product-reviews.connector';
import * as productReviewsActions from './../actions/product-reviews.action';
import { ErrorModel } from '../../../model/misc.model';

@Injectable()
export class ProductReviewsEffects {
  @Effect()
  loadProductReviews$: Observable<
    | productReviewsActions.LoadProductReviewsSuccess
    | productReviewsActions.LoadProductReviewsFail
  > = this.actions$.pipe(
    ofType(productReviewsActions.LOAD_PRODUCT_REVIEWS),
    map((action: productReviewsActions.LoadProductReviews) => action.payload),
    mergeMap(productCode => {
      return this.productReviewsConnector.get(productCode).pipe(
        map(data => {
          return new productReviewsActions.LoadProductReviewsSuccess({
            productCode,
            list: data,
          });
        }),
        catchError(_error =>
          of(
            new productReviewsActions.LoadProductReviewsFail({
              message: productCode,
            } as ErrorModel)
          )
        )
      );
    })
  );

  @Effect()
  postProductReview: Observable<
    | productReviewsActions.PostProductReviewSuccess
    | productReviewsActions.PostProductReviewFail
  > = this.actions$.pipe(
    ofType(productReviewsActions.POST_PRODUCT_REVIEW),
    map((action: productReviewsActions.PostProductReview) => action.payload),
    mergeMap(payload => {
      return this.productReviewsConnector
        .add(payload.productCode, payload.review)
        .pipe(
          map(reviewResponse => {
            return new productReviewsActions.PostProductReviewSuccess(
              reviewResponse
            );
          }),
          catchError(_error =>
            of(
              new productReviewsActions.PostProductReviewFail(
                payload.productCode
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private productReviewsConnector: ProductReviewsConnector
  ) {}
}
