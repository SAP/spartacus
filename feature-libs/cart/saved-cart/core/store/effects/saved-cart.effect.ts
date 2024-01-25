/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartActions, CartConnector } from '@spartacus/cart/base/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  LoggerService,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SavedCartConnector } from '../../connectors/saved-cart.connector';
import { SavedCartActions } from '../actions/index';

@Injectable()
export class SavedCartEffects {
  protected logger = inject(LoggerService);

  loadSavedCart$: Observable<
    | CartActions.LoadCartSuccess
    | SavedCartActions.LoadSavedCartFail
    | SavedCartActions.LoadSavedCartSuccess
  > = createEffect(() =>
    this.actions$.pipe(
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
              new SavedCartActions.LoadSavedCartSuccess({ userId, cartId }),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new SavedCartActions.LoadSavedCartFail({
                userId,
                cartId,
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );

  loadSavedCarts$: Observable<
    | CartActions.LoadCartsSuccess
    | SavedCartActions.LoadSavedCartsFail
    | SavedCartActions.LoadSavedCartsSuccess
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SavedCartActions.LOAD_SAVED_CARTS),
      map((action: SavedCartActions.LoadSavedCarts) => action.payload),
      switchMap(({ userId }) =>
        this.savedCartConnector.getList(userId).pipe(
          switchMap((savedCarts: Cart[]) => {
            return [
              new CartActions.LoadCartsSuccess(savedCarts),
              new SavedCartActions.LoadSavedCartsSuccess({ userId }),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new SavedCartActions.LoadSavedCartsFail({
                userId,
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );

  restoreSavedCart$: Observable<
    | SavedCartActions.RestoreSavedCartFail
    | SavedCartActions.RestoreSavedCartSuccess
    | SavedCartActions.LoadSavedCarts
    | SavedCartActions.SaveCart
    | CartActions.LoadCartSuccess
    | CartActions.SetActiveCartId
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SavedCartActions.RESTORE_SAVED_CART),
      map((action: SavedCartActions.RestoreSavedCart) => action.payload),
      withLatestFrom(this.activeCartService.getActive()),
      switchMap(([{ userId, cartId }, activeCart]) => {
        const actions: any[] = [];

        if ((activeCart?.entries ?? []).length > 0) {
          if (activeCart.code) {
            /**
             * Instead of calling the SaveCartAction, we are calling the edit saved cart
             * because we do not want to clear the state when we swap carts between active and saved cart
             */
            actions.push(
              new SavedCartActions.EditSavedCart({
                userId,
                cartId: activeCart.code,
                saveCartName: '',
                saveCartDescription: '',
              })
            );
          }
        }

        return this.savedCartConnector.restoreSavedCart(userId, cartId).pipe(
          switchMap((savedCart: Cart) => {
            this.globalMessageService.add(
              {
                key:
                  (activeCart?.entries ?? []).length > 0
                    ? 'savedCartList.swapCartWithActiveCart'
                    : 'savedCartList.swapCartNoActiveCart',
                params: {
                  cartName: cartId,
                  previousCartName: activeCart.code,
                },
              },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
            return [
              ...actions,
              new CartActions.LoadCartSuccess({
                userId,
                cartId,
                cart: savedCart,
                extraData: { active: true },
              }),
              new SavedCartActions.RestoreSavedCartSuccess({ userId, cartId }),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new SavedCartActions.RestoreSavedCartFail({
                userId,
                cartId,
                error: normalizeHttpError(error, this.logger),
              })
            )
          )
        );
      })
    )
  );

  saveCart$: Observable<
    | SavedCartActions.SaveCartFail
    | SavedCartActions.SaveCartSuccess
    | SavedCartActions.SaveCart
    | CartActions.LoadCartSuccess
    | CartActions.ClearCartState
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SavedCartActions.SAVE_CART),
      map((action: SavedCartActions.SaveCart) => action.payload),
      switchMap(({ userId, cartId, saveCartName, saveCartDescription }) => {
        return this.cartConnector
          .save(userId, cartId, saveCartName, saveCartDescription)
          .pipe(
            switchMap((savedCart: Cart) => {
              return [
                new CartActions.ClearCartState(),
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
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                new SavedCartActions.SaveCartFail({
                  userId,
                  cartId,
                  saveCartName,
                  saveCartDescription,
                  error: normalizeHttpError(error, this.logger),
                })
              )
            )
          );
      })
    )
  );

  editSavedCart$: Observable<
    | SavedCartActions.EditSavedCartFail
    | SavedCartActions.EditSavedCartSuccess
    | SavedCartActions.EditSavedCart
    | CartActions.LoadCartSuccess
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SavedCartActions.EDIT_SAVED_CART),
      map((action: SavedCartActions.EditSavedCart) => action.payload),
      switchMap(({ userId, cartId, saveCartName, saveCartDescription }) => {
        return this.cartConnector
          .save(userId, cartId, saveCartName, saveCartDescription)
          .pipe(
            switchMap((savedCart: Cart) => {
              return [
                new CartActions.LoadCartSuccess({
                  userId,
                  cartId,
                  cart: savedCart,
                }),
                new SavedCartActions.EditSavedCartSuccess({
                  userId,
                  cartId,
                  saveCartName,
                  saveCartDescription,
                }),
              ];
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                new SavedCartActions.EditSavedCartFail({
                  userId,
                  cartId,
                  saveCartName,
                  saveCartDescription,
                  error: normalizeHttpError(error, this.logger),
                })
              )
            )
          );
      })
    )
  );

  cloneSavedCart$: Observable<
    | SavedCartActions.CloneSavedCartFail
    | SavedCartActions.CloneSavedCartSuccess
    | SavedCartActions.CloneSavedCart
    | SavedCartActions.RestoreSavedCart
    | SavedCartActions.LoadSavedCarts
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SavedCartActions.CLONE_SAVED_CART),
      map((action: SavedCartActions.CloneSavedCart) => action.payload),
      switchMap(({ userId, cartId, saveCartName }) => {
        return this.savedCartConnector
          .cloneSavedCart(userId, cartId, saveCartName)
          .pipe(
            switchMap((_) => {
              return [
                new SavedCartActions.CloneSavedCartSuccess({
                  userId,
                  cartId,
                  saveCartName,
                }),
                new SavedCartActions.RestoreSavedCart({
                  userId,
                  cartId,
                }),
                new SavedCartActions.LoadSavedCarts({ userId }),
              ];
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                new SavedCartActions.CloneSavedCartFail({
                  userId,
                  cartId,
                  saveCartName,
                  error: normalizeHttpError(error, this.logger),
                })
              )
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private savedCartConnector: SavedCartConnector,
    private activeCartService: ActiveCartFacade,
    private globalMessageService: GlobalMessageService,
    private cartConnector: CartConnector
  ) {}
}
