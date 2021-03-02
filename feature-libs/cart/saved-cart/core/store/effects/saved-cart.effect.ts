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
  loadSavedCart$: Observable<
    | CartActions.LoadCartSuccess
    | SavedCartActions.LoadSavedCartFail
    | SavedCartActions.LoadSavedCartSuccess
  > = this.actions$.pipe(
    ofType(SavedCartActions.LOAD_SAVED_CART),
    map((action: SavedCartActions.LoadSavedCart) => action.payload),
    switchMap(({ userId, cartId }) =>
      this.savedCartConnector.get(userId, cartId).pipe(
        switchMap((savedCart: Cart) => {
          return [
            new CartActions.LoadCartSuccess({
              userId,
              cartId,
              cart: savedCart,
            }),
            new SavedCartActions.LoadSavedCartSuccess({ cartId }),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new SavedCartActions.LoadSavedCartFail({
              cartId,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

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
            new SavedCartActions.LoadSavedCartsSuccess(),
            new CartActions.LoadCartsSuccess(savedCarts),
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
    | CartActions.LoadCart
    | CartActions.SetActiveCartId
    | SavedCartActions.LoadSavedCarts
  > = this.actions$.pipe(
    ofType(SavedCartActions.RESTORE_SAVED_CART),
    map((action: SavedCartActions.RestoreSavedCart) => action.payload),
    withLatestFrom(this.activeCartService.getActiveCartId()),
    switchMap(([{ userId, cartId }, activeCartId]) => {
      if (Boolean(activeCartId)) {
        //  save cart functionality
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
            new CartActions.LoadCart({ userId, cartId: savedCart?.code }),
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

  @Effect()
  saveCart$: Observable<
    | SavedCartActions.SaveCartFail
    | SavedCartActions.SaveCartSuccess
    | SavedCartActions.SaveCart
    | CartActions.LoadCartSuccess
  > = this.actions$.pipe(
    ofType(SavedCartActions.SAVE_CART),
    map((action: SavedCartActions.SaveCart) => action.payload),
    switchMap(
      ({ userId, cartId, saveCartName, saveCartDescription, extraData }) => {
        return this.savedCartConnector
          .saveCart(userId, cartId, saveCartName, saveCartDescription)
          .pipe(
            switchMap((savedCart: Cart) => {
              if (extraData?.edit) {
                return [
                  new CartActions.LoadCartSuccess({
                    userId,
                    cartId,
                    cart: savedCart,
                  }),
                  new SavedCartActions.SaveCartSuccess(),
                ];
              } else {
                // TODO: Michal to put logic for saving his cart from cart page
                // remove snippet below
                // might be the same thing, therefore can remove the extra data
                // will think more about it
                return [
                  new CartActions.LoadCartSuccess({
                    userId,
                    cartId,
                    cart: savedCart,
                  }),
                  new SavedCartActions.SaveCartSuccess(),
                ];
              }
            }),
            catchError((error: HttpErrorResponse) =>
              of(new SavedCartActions.SaveCartFail(normalizeHttpError(error)))
            )
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private savedCartConnector: SavedCartConnector,
    private activeCartService: ActiveCartService,
    private globalMessageService: GlobalMessageService,
    private clearCheckoutService: ClearCheckoutService
  ) {}
}
