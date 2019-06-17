import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartEntryConnector } from '../../connectors/entry/cart-entry.connector';
import * as fromActions from './../actions';

@Injectable()
export class CartEntryEffects {
  @Effect()
  addEntry$: Observable<any> = this.actions$.pipe(
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
          map(
            (entry: any) =>
              new fromActions.AddEntrySuccess({
                ...entry,
                userId: payload.userId,
                cartId: payload.cartId,
              })
          ),
          catchError(error => of(new fromActions.AddEntryFail(error)))
        )
    )
  );

  @Effect()
  removeEntry$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.REMOVE_ENTRY),
    map((action: fromActions.AddEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .remove(payload.userId, payload.cartId, payload.entry)
        .pipe(
          map(() => {
            return new fromActions.RemoveEntrySuccess({
              userId: payload.userId,
              cartId: payload.cartId,
            });
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
      this.cartEntryConnector
        .update(payload.userId, payload.cartId, payload.entry, payload.qty)
        .pipe(
          map(() => {
            return new fromActions.UpdateEntrySuccess({
              userId: payload.userId,
              cartId: payload.cartId,
            });
          }),
          catchError(error => of(new fromActions.UpdateEntryFail(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
