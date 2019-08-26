import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CartActions } from '../actions/index';
import { SaveForLaterDataService } from '../../facade/save-for-later-data.service';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { Cart } from '../../../model/cart.model';

@Injectable()
export class SaveForLaterEffects {
  @Effect()
  loadSaveForLater$: Observable<
    CartActions.LoadSaveForLaterFail | CartActions.LoadSaveForLaterSuccess
  > = this.actions$.pipe(
    ofType(CartActions.LOAD_SAVE_FOR_LATER),
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
        return of(new CartActions.LoadSaveForLaterFail({}));
      }

      return this.cartConnector
        .load(loadSaveForLaterParams.userId, loadSaveForLaterParams.cartId)
        .pipe(
          map((cart: Cart) => {
            return new CartActions.LoadSaveForLaterSuccess(cart);
          }),
          catchError(error => of(new CartActions.LoadSaveForLaterFail(error)))
        );
    })
  );

  @Effect()
  createSaveForLater$: Observable<
    CartActions.CreateSaveForLaterSuccess | CartActions.CreateSaveForLaterFail
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_SAVE_FOR_LATER),
    map((action: CartActions.CreateSaveForLater) => action.payload),
    mergeMap(payload => {
      return this.cartConnector.load(payload.userId, payload.cartId).pipe(
        switchMap((cart: Cart) => {
          return [new CartActions.CreateSaveForLaterSuccess(cart)];
        }),
        catchError(error => of(new CartActions.CreateSaveForLaterFail(error)))
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
