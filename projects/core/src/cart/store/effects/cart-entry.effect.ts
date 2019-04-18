import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromActions from './../actions';
import { CartConnector } from '../../connectors/cart/cart.connector';

@Injectable()
export class CartEntryEffects {
  @Effect()
  addEntry$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ADD_ENTRY),
    map((action: fromActions.AddEntry) => action.payload),
    mergeMap(payload =>
      this.cartConnector
        .addEntry(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity
        )
        .pipe(
          map((entry: any) => new fromActions.AddEntrySuccess(entry)),
          catchError(error => of(new fromActions.AddEntryFail(error)))
        )
    )
  );

  @Effect()
  removeEntry$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.REMOVE_ENTRY),
    map((action: fromActions.AddEntry) => action.payload),
    mergeMap(payload =>
      this.cartConnector
        .removeEntry(payload.userId, payload.cartId, payload.entry)
        .pipe(
          map(() => {
            return new fromActions.RemoveEntrySuccess();
          }),
          catchError(error => of(new fromActions.RemoveEntryFail(error)))
        )
    )
  );

  @Effect()
  updateEntry$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.UPDATE_ENTRY),
    map((action: fromActions.AddEntry) => action.payload),
    mergeMap(payload =>
      this.cartConnector
        .updateEntry(payload.userId, payload.cartId, payload.entry, payload.qty)
        .pipe(
          map(() => {
            return new fromActions.UpdateEntrySuccess();
          }),
          catchError(error => of(new fromActions.UpdateEntryFail(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector
  ) {}
}
