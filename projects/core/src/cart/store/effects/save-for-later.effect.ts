import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CURRENCY_CHANGE, LANGUAGE_CHANGE } from '../../../site-context/index';
import * as fromActions from './../actions/save-for-later.action';
import { SaveForLaterDataService } from '../../facade/save-for-later-data.service';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { Cart } from '../../../model/cart.model';

@Injectable()
export class SaveForLaterEffects {
  @Effect()
  loadSaveForLater$: Observable<
    fromActions.LoadSaveForLaterFail | fromActions.LoadSaveForLaterSuccess
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_SAVE_FOR_LATER, LANGUAGE_CHANGE, CURRENCY_CHANGE),
    map(
      (action: {
        type: string;
        payload?: { userId: string; cartId: string };
      }) => action.payload
    ),
    mergeMap(payload => {
      const loadSaveForLaterParams = {
        userId: (payload && payload.userId) || this.saveForLaterData.userId,
        cartId: (payload && payload.cartId) || this.saveForLaterData.cartId,
      };

      if (this.isMissingData(loadSaveForLaterParams)) {
        return of(new fromActions.LoadSaveForLaterFail({}));
      }

      return this.cartConnector
        .load(
          loadSaveForLaterParams.userId,
          loadSaveForLaterParams.cartId,
          true
        )
        .pipe(
          map((cart: Cart) => {
            return new fromActions.LoadSaveForLaterSuccess(cart);
          }),
          catchError(error => of(new fromActions.LoadSaveForLaterFail(error)))
        );
    })
  );

  @Effect()
  createSaveForLater$: Observable<
    fromActions.CreateSaveForLaterSuccess | fromActions.CreateSaveForLaterFail
  > = this.actions$.pipe(
    ofType(fromActions.CREATE_SAVE_FOR_LATER),
    map((action: fromActions.CreateSaveForLater) => action.payload),
    mergeMap(payload => {
      return this.cartConnector.load(payload.userId, payload.cartId, true).pipe(
        switchMap((cart: Cart) => {
          return [new fromActions.CreateSaveForLaterSuccess(cart)];
        }),
        catchError(error => of(new fromActions.CreateSaveForLaterFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private saveForLaterData: SaveForLaterDataService
  ) {}

  private isMissingData(payload) {
    return payload.userId === undefined || payload.cartId === undefined;
  }
}
