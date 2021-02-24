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
    | CartActions.LoadSavedCartsSuccess
    | SavedCartActions.LoadSavedCartsSuccess
    | SavedCartActions.LoadSavedCartsFail
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
  constructor(
    private actions$: Actions,
    private savedCartConnector: SavedCartConnector
  ) {}
}
