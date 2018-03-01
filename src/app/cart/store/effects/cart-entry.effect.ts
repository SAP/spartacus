import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { map, tap, catchError, mergeMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { OccCartService } from '../../../newocc/cart/cart.service';

@Injectable()
export class CartEntryEffects {
  @Effect()
  addEntry$: Observable<any> = this.actions$
    .ofType(fromActions.ADD_ENTRY)
    .pipe(
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
  removeEntry$: Observable<any> = this.actions$
    .ofType(fromActions.REMOVE_ENTRY)
    .pipe(
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

  constructor(private actions$: Actions, private cartService: OccCartService) {}
}
