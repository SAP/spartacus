import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { PRODUCT_INTERESTS } from '../user-state';
import { CLEAR_MISCS_DATA } from '../actions/index';
import * as fromInterestsAction from '../actions/product-interests.actions';
import { LoaderResetAction } from '../../../state';
import { ProductInterestsService } from '../../occ/index';
import { ProductInterestList } from '../../model/product-interest.model';

@Injectable()
export class ProductInterestsEffect {
  constructor(
    private actions$: Actions,
    private productInterestsService: ProductInterestsService
  ) {}

  @Effect()
  loadProductInteres$: Observable<
    fromInterestsAction.ProductInterestsAction
  > = this.actions$.pipe(
    ofType(fromInterestsAction.LOAD_PRODUCT_INTERESTS),
    map((action: fromInterestsAction.LoadProductInterests) => action.payload),
    switchMap(payload => {
      return this.productInterestsService
        .getInterests(
          payload.userId,
          payload.pageSize,
          payload.currentPage,
          payload.sort
        )
        .pipe(
          map((interests: ProductInterestList) => {
            return new fromInterestsAction.LoadProductInterestsSuccess(
              interests
            );
          }),
          catchError(error =>
            of(new fromInterestsAction.LoadProductInterestsFail(error))
          )
        );
    })
  );

  @Effect()
  deleteProductInterests$: Observable<Action> = this.actions$.pipe(
    ofType(fromInterestsAction.DELETE_PRODUCT_INTERESTS),
    map((action: fromInterestsAction.DeleteProductInterests) => action.payload),
    switchMap(payload =>
      this.productInterestsService
        .removeInterests(payload.userId, payload.item)
        .pipe(
          map(
            (res: any) =>
              new fromInterestsAction.DeleteProductInterestsSuccess(res)
          ),
          catchError(error =>
            of(new fromInterestsAction.DeleteProductInterestsFail(error))
          )
        )
    )
  );

  @Effect()
  resetProductInterests$: Observable<Action> = this.actions$.pipe(
    ofType(
      CLEAR_MISCS_DATA,
      fromInterestsAction.CLEAR_PRODUCT_INTERESTS,
      fromInterestsAction.DELETE_PRODUCT_INTERESTS_SUCCESS
    ),
    map(() => {
      return new LoaderResetAction(PRODUCT_INTERESTS);
    })
  );
}
