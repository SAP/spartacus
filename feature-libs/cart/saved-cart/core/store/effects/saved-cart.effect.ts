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
  MultiCartService,
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
    | SavedCartActions.LoadSavedCarts
    | SavedCartActions.SaveCart
    | CartActions.LoadCartSuccess
    | CartActions.SetActiveCartId
  > = this.actions$.pipe(
    ofType(SavedCartActions.RESTORE_SAVED_CART),
    map((action: SavedCartActions.RestoreSavedCart) => action.payload),
    withLatestFrom(this.activeCartService.getActiveCartId()),
    switchMap(([{ userId, cartId }, activeCartId]) => {
      const actions: any[] = [];

      if (Boolean(activeCartId)) {
        actions.push(
          new SavedCartActions.SaveCart({
            userId,
            cartId: activeCartId,
            saveCartName: '',
            saveCartDescription: '',
            extraData: { edit: true },
          })
        );
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
            ...actions,
            new CartActions.SetActiveCartId(cartId),
            new CartActions.LoadCartSuccess({
              userId,
              cartId,
              cart: savedCart,
            }),
            new SavedCartActions.LoadSavedCarts({ userId }),
            new SavedCartActions.RestoreSavedCartSuccess({ userId, cartId }),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new SavedCartActions.RestoreSavedCartFail({
              userId,
              cartId,
              error: normalizeHttpError(error),
            })
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
                  new SavedCartActions.SaveCartSuccess({
                    userId,
                    cartId,
                    saveCartName,
                    saveCartDescription,
                  }),
                ];
              } else {
                this.clearCheckoutService.resetCheckoutProcesses();
                this.multiCartService.createCart({
                  userId,
                  extraData: { active: true },
                });

                return [
                  new CartActions.LoadCartSuccess({
                    userId,
                    cartId,
                    cart: savedCart,
                  }),
                  new SavedCartActions.SaveCartSuccess({
                    userId,
                    cartId,
                    saveCartName,
                    saveCartDescription,
                  }),
                ];
              }
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                new SavedCartActions.SaveCartFail({
                  userId,
                  cartId,
                  saveCartName,
                  saveCartDescription,
                  error: normalizeHttpError(error),
                })
              )
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
    private clearCheckoutService: ClearCheckoutService,
    private multiCartService: MultiCartService
  ) {}
}
