import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CURRENCY_CHANGE, LANGUAGE_CHANGE } from '../../../site-context/index';
import * as fromActions from './../actions/save-for-later.action';
import { CartDataService } from '../../facade/cart-data.service';
import { SaveForLaterConnector } from '../../connectors/cart/save-for-later.connector';
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
        payload?: { userId: string; cartId: string; details?: boolean };
      }) => action.payload
    ),
    mergeMap(payload => {
      const loadSaveForLaterParams = {
        userId: (payload && payload.userId) || this.cartData.userId,
        cartId: (payload && payload.cartId) || this.cartData.cartId,
      };

      if (this.isMissingData(loadSaveForLaterParams)) {
        return of(new fromActions.LoadSaveForLaterFail({}));
      }

      return this.saveForLaterConnector
        .load(loadSaveForLaterParams.userId, loadSaveForLaterParams.cartId)
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
      return this.saveForLaterConnector
        .create(payload.userId, payload.cartId)
        .pipe(
          switchMap((cart: Cart) => {
            return [new fromActions.CreateSaveForLaterSuccess(cart)];
          }),
          catchError(error => of(new fromActions.CreateSaveForLaterFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private saveForLaterConnector: SaveForLaterConnector,
    private cartData: CartDataService
  ) {}

  private isMissingData(payload) {
    return payload.userId === undefined || payload.cartId === undefined;
  }
}
