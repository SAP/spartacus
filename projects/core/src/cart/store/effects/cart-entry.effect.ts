import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CartEntryConnector } from '../../connectors/entry/cart-entry.connector';
import * as fromActions from './../actions/index';

@Injectable()
export class CartEntryEffects {
  @Effect()
  addEntry$: Observable<
    fromActions.AddEntrySuccess | fromActions.AddEntryFail
  > = this.actions$.pipe(
    ofType(fromActions.ADD_ENTRY),
    map((action: fromActions.AddEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .add(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity
        )
        .pipe(
          map(entry => new fromActions.AddEntrySuccess(entry)),
          catchError(error =>
            of(new fromActions.AddEntryFail(makeErrorSerializable(error)))
          )
        )
    )
  );

  @Effect()
  removeEntry$: Observable<
    fromActions.RemoveEntrySuccess | fromActions.RemoveEntryFail
  > = this.actions$.pipe(
    ofType(fromActions.REMOVE_ENTRY),
    map((action: fromActions.AddEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .remove(payload.userId, payload.cartId, payload.entry)
        .pipe(
          map(() => {
            return new fromActions.RemoveEntrySuccess();
          }),
          catchError(error =>
            of(new fromActions.RemoveEntryFail(makeErrorSerializable(error)))
          )
        )
    )
  );

  @Effect()
  updateEntry$: Observable<
    fromActions.UpdateEntrySuccess | fromActions.UpdateEntryFail
  > = this.actions$.pipe(
    ofType(fromActions.UPDATE_ENTRY),
    map((action: fromActions.AddEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .update(payload.userId, payload.cartId, payload.entry, payload.qty)
        .pipe(
          map(() => {
            return new fromActions.UpdateEntrySuccess();
          }),
          catchError(error =>
            of(new fromActions.UpdateEntryFail(makeErrorSerializable(error)))
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
