import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { OccCartService } from '../../occ/cart.service';

@Injectable()
export class CartEntryEffects {
  @Effect()
  addEntry$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ADD_ENTRY),
    map((action: fromActions.AddEntry) => action.payload),
    mergeMap(payload =>
      this.cartService
        .addCartEntry(
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
      this.cartService
        .removeCartEntry(payload.userId, payload.cartId, payload.entry)
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
      this.cartService
        .updateCartEntry(
          payload.userId,
          payload.cartId,
          payload.entry,
          payload.qty
        )
        .pipe(
          map(() => {
            return new fromActions.UpdateEntrySuccess();
          }),
          catchError(error => of(new fromActions.UpdateEntryFail(error)))
        )
    )
  );

  constructor(private actions$: Actions, private cartService: OccCartService) {}
}
