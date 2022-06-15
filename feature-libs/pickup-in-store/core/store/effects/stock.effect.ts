import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { StockConnector } from '../../connectors/index';
import { StockActions } from '../actions/index';

@Injectable()
export class StockEffect {
  constructor(
    private actions$: Actions,
    private stockConnector: StockConnector
  ) {}

  loadStockLevels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.STOCK_LEVEL),
      map((action: StockActions.StockLevel) => action.payload),
      switchMap(({ productCode, ...location }) =>
        this.stockConnector.loadStockLevels(productCode, location).pipe(
          map((data) => new StockActions.StockLevelSuccess(data)),
          catchError((error) =>
            of(new StockActions.StockLevelFail(normalizeHttpError(error)))
          )
        )
      )
    )
  );
}
