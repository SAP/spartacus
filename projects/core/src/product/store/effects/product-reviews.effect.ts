import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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
  @Effect()
  loadProductReviews$: Observable<
    | ProductActions.LoadProductReviewsSuccess
    | ProductActions.LoadProductReviewsFail
  > = this.actions$.pipe(
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
  );

  @Effect()
  postProductReview: Observable<
    | ProductActions.PostProductReviewSuccess
    | ProductActions.PostProductReviewFail
  > = this.actions$.pipe(
    ofType(ProductActions.POST_PRODUCT_REVIEW),
    map((action: ProductActions.PostProductReview) => action.payload),
    mergeMap((payload) => {
      return this.productReviewsConnector
        .add(payload.productCode, payload.review)
        .pipe(
          map((reviewResponse) => {
            return new ProductActions.PostProductReviewSuccess(reviewResponse);
          }),
          catchError((_error) =>
            of(new ProductActions.PostProductReviewFail(payload.productCode))
          )
        );
    })
  );

  @Effect({ dispatch: false })
  showGlobalMessageOnPostProductReviewSuccess$ = this.actions$.pipe(
    ofType(ProductActions.POST_PRODUCT_REVIEW_SUCCESS),
    tap(() => {
      this.globalMessageService.add(
        { key: 'productReview.thankYouForReview' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    })
  );

  constructor(
    private actions$: Actions,
    private productReviewsConnector: ProductReviewsConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
