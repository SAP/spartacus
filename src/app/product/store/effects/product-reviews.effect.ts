import { OccProductService } from './../../../newocc/product/product.service';

import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as productReviewsActions from './../actions/product-reviews.action';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProductReviewsEffects {
  @Effect()
  loadProductReviews$ = this.actions$
    .ofType(productReviewsActions.LOAD_REVIEWS)
    .pipe(
      map((action: productReviewsActions.LoadProductReviews) => action.payload),
      mergeMap(productCode => {
        return this.occProductService.loadProductReviews(productCode).pipe(
          map(reviews => {
            return new productReviewsActions.LoadProductReviewsSuccess(reviews);
          }),
          catchError(error =>
            of(new productReviewsActions.LoadProductReviewsFail(error))
          )
        );
      })
    );

  constructor(
    private actions$: Actions,
    private occProductService: OccProductService
  ) {}
}
