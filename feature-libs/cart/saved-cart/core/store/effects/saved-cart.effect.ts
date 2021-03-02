import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ActiveCartService,
  Cart,
  CartActions,
  ClearCheckoutService,
  GlobalMessageService,
  GlobalMessageType,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SavedCartConnector } from '../../connectors/saved-cart.connector';
import { SavedCartActions } from '../actions/index';

@Injectable()
export class SavedCartEffects {
  @Effect()
  loadSavedCarts$: Observable<
    | CartActions.LoadCartsSuccess
    | SavedCartActions.LoadSavedCartsFail
    | SavedCartActions.LoadSavedCartsSuccess
  > = this.actions$.pipe(
    ofType(SavedCartActions.LOAD_SAVED_CARTS),
    map((action: SavedCartActions.LoadSavedCarts) => action.payload),
    switchMap(({ userId }) =>
      this.savedCartConnector.getList(userId).pipe(
        switchMap((savedCarts: Cart[]) => {
          return [
            new CartActions.LoadCartsSuccess(savedCarts),
            new SavedCartActions.LoadSavedCartsSuccess(),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(new SavedCartActions.LoadSavedCartsFail(normalizeHttpError(error)))
        )
      )
    )
  );

  @Effect()
  restoreSavedCart$: Observable<
    | SavedCartActions.RestoreSavedCartFail
    | SavedCartActions.RestoreSavedCartSuccess
    | CartActions.LoadCartSuccess
    | CartActions.SetActiveCartId
    | SavedCartActions.LoadSavedCarts
  > = this.actions$.pipe(
    ofType(SavedCartActions.RESTORE_SAVED_CART),
    map((action: SavedCartActions.RestoreSavedCart) => action.payload),
    withLatestFrom(this.activeCartService.getActiveCartId()),
    switchMap(([{ userId, cartId }, activeCartId]) => {
      if (Boolean(activeCartId)) {
        // TODO: save cart functionality
        //  from #9190
      }

      return this.savedCartConnector.restoreSavedCart(userId, cartId).pipe(
        switchMap((savedCart: Cart) => {
          this.clearCheckoutService.resetCheckoutProcesses();

          this.globalMessageService.add(
            {
              key: Boolean(activeCartId)
                ? 'savedCartList.swapCartWithActiveCart'
                : 'savedCartList.swapCartNoActiveCart',
              params: {
                cartName: cartId,
                previousCartName: activeCartId,
              },
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );

          return [
            new CartActions.SetActiveCartId(cartId),
            new CartActions.LoadCartSuccess({
              userId,
              cartId,
              cart: savedCart,
            }),
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
    private savedCartConnector: SavedCartConnector,
    private activeCartService: ActiveCartService,
    private globalMessageService: GlobalMessageService,
    private clearCheckoutService: ClearCheckoutService
  ) {}
}
