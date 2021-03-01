import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  Cart,
  CartActions,
  EntitiesModel,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SavedCartConnector } from '../../connectors/saved-cart.connector';
import { SavedCartActions } from '../actions/index';

@Injectable()
export class SavedCartEffects {
  @Effect()
  loadSavedCarts$: Observable<
    CartActions.LoadSavedCartsSuccess | SavedCartActions.LoadSavedCartsFail
  > = this.actions$.pipe(
    ofType(SavedCartActions.LOAD_SAVED_CARTS),
    map((action: SavedCartActions.LoadSavedCarts) => action.payload),
    switchMap(({ userId }) => {
      return this.savedCartConnector.getList(userId).pipe(
        switchMap((savedCarts: EntitiesModel<Cart>) => {
          return [
            new CartActions.LoadSavedCartsSuccess({ cart: savedCarts.values }),
          ];
        }),

        catchError((error: HttpErrorResponse) =>
          of(new SavedCartActions.LoadSavedCartsFail(normalizeHttpError(error)))
        )
      );
    })
  );

  @Effect()
  restoreSavedCart$: Observable<
    | SavedCartActions.RestoreSavedCartFail
    | SavedCartActions.RestoreSavedCartSuccess
    | CartActions.SetActiveCartId
    | SavedCartActions.LoadSavedCarts
  > = this.actions$.pipe(
    ofType(SavedCartActions.RESTORE_SAVED_CART),
    map((action: SavedCartActions.RestoreSavedCart) => action.payload),
    switchMap(({ userId, cartId }) => {
      return this.savedCartConnector.restoreSavedCart(userId, cartId).pipe(
        switchMap((_savedCarts: Cart) => {
          return [
            new CartActions.SetActiveCartId(cartId),
            new SavedCartActions.LoadSavedCarts({ userId }),
            new SavedCartActions.RestoreSavedCartSuccess(),
          ];
        }),

        catchError((error: HttpErrorResponse) =>
          of(
            new SavedCartActions.RestoreSavedCartFail(normalizeHttpError(error))
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private savedCartConnector: SavedCartConnector
  ) {}
}
