import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import * as fromBackInStockAction from '../actions/back-in-stock.actions';
import { OccProductInterestsService } from '../../occ/product-interest.service';

@Injectable()
export class BackInStockEffect {
  constructor(
    private actions$: Actions,
    private productInterestsService: OccProductInterestsService
  ) {}

  @Effect()
  loadBackInStock$: Observable<
    fromBackInStockAction.BackInStockAction
  > = this.actions$.pipe(
    ofType(fromBackInStockAction.LOAD_BACK_IN_STOCK),
    map((action: fromBackInStockAction.LoadBackInStock) => action.payload),
    switchMap(payload => {
      return this.productInterestsService
        .hasInterest(
          payload.userId,
          payload.productCode,
          payload.notificationType
        )
        .pipe(
          map((result: boolean) => {
            return new fromBackInStockAction.LoadBackInStockSuccess(result);
          }),
          catchError(error =>
            of(new fromBackInStockAction.LoadBackInStockFail(error))
          )
        );
    })
  );

  @Effect()
  deleteBackInStock$: Observable<
    fromBackInStockAction.BackInStockAction
  > = this.actions$.pipe(
    ofType(fromBackInStockAction.DELETE_BACK_IN_STOCK),
    map((action: fromBackInStockAction.DeleteBackInStock) => action.payload),
    switchMap(payload =>
      this.productInterestsService
        .deleteInterest(
          payload.userId,
          payload.productCode,
          payload.notificationType
        )
        .pipe(
          map(() => new fromBackInStockAction.DeleteBackInStockSuccess(true)),
          catchError(error =>
            of(new fromBackInStockAction.DeleteBackInStockFail(error))
          )
        )
    )
  );

  @Effect()
  createBackInStock$: Observable<
    fromBackInStockAction.BackInStockAction
  > = this.actions$.pipe(
    ofType(fromBackInStockAction.CREATE_BACK_IN_STOCK),
    map((action: fromBackInStockAction.CreateBackInStock) => action.payload),
    switchMap(payload =>
      this.productInterestsService
        .createInterest(
          payload.userId,
          payload.productCode,
          payload.notificationType
        )
        .pipe(
          map(() => new fromBackInStockAction.CreateBackInStockSuccess(true)),
          catchError(error =>
            of(new fromBackInStockAction.CreateBackInStockFail(error))
          )
        )
    )
  );
}
