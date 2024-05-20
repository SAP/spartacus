/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Cart } from '@spartacus/cart/base/root';
import {
  LoggerService,
  OCC_CART_ID_CURRENT,
  SiteContextActions,
  isNotUndefined,
  normalizeHttpError,
  withdrawOn,
} from '@spartacus/core';
import { Observable, from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  groupBy,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { getCartIdByUserId, isCartNotFoundError } from '../../utils/utils';
import { CartActions } from '../actions/index';
import { StateWithMultiCart } from '../multi-cart-state';
import { getCartHasPendingProcessesSelectorFactory } from '../selectors/multi-cart.selector';

@Injectable()
export class CartEffects {
  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  protected logger = inject(LoggerService);

  loadCart$: Observable<
    | CartActions.LoadCartFail
    | CartActions.LoadCartSuccess
    | CartActions.RemoveCart
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.LOAD_CART),
      map((action: CartActions.LoadCart) => action.payload),
      groupBy((payload) => payload.cartId),
      mergeMap((group$) =>
        group$.pipe(
          switchMap((payload) => {
            return of(payload).pipe(
              withLatestFrom(
                this.store.pipe(
                  select(
                    getCartHasPendingProcessesSelectorFactory(payload.cartId)
                  )
                )
              )
            );
          }),
          filter(([_, hasPendingProcesses]) => !hasPendingProcesses),
          map(([payload]) => payload),
          switchMap((payload) => {
            return this.cartConnector.load(payload.userId, payload.cartId).pipe(
              mergeMap((cart) => {
                let actions = [];
                if (cart) {
                  actions.push(
                    new CartActions.LoadCartSuccess({
                      ...payload,
                      cart,
                      cartId: getCartIdByUserId(cart, payload.userId),
                    })
                  );

                  if (payload.cartId === OCC_CART_ID_CURRENT) {
                    // Removing cart from entity object under `current` key as it is no longer needed.
                    // Current cart is loaded under it's code entity.
                    actions.push(
                      new CartActions.RemoveCart({
                        cartId: OCC_CART_ID_CURRENT,
                      })
                    );
                  }
                } else {
                  actions = [
                    new CartActions.LoadCartFail({
                      ...payload,
                      error: {},
                    }),
                  ];
                }
                return actions;
              }),
              catchError((error) => this.handleLoadCartError(payload, error))
            );
          })
        )
      ),
      withdrawOn(this.contextChange$)
    )
  );

  protected handleLoadCartError(payload: any, error: any) {
    if (error?.error?.errors) {
      const couponExpiredErrors = error.error.errors.filter(
        (err: any) => err.reason === 'invalid'
      );
      if (couponExpiredErrors.length > 0) {
        // Reload in case of expired coupon.
        return of(new CartActions.LoadCart({ ...payload }));
      }

      const cartNotFoundErrors = error.error.errors.filter(
        (err: any) =>
          isCartNotFoundError(err) || err.reason === 'UnknownResourceError'
      );
      if (cartNotFoundErrors.length > 0) {
        // Remove cart as it doesn't exist on backend (selective cart always exists).
        return of(new CartActions.RemoveCart({ cartId: payload.cartId }));
      }
    }
    return of(
      new CartActions.LoadCartFail({
        ...payload,
        error: normalizeHttpError(error, this.logger),
      })
    );
  }

  createCart$: Observable<
    | CartActions.MergeCartSuccess
    | CartActions.CreateCartSuccess
    | CartActions.CreateCartFail
    | CartActions.RemoveCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CREATE_CART),
      map((action: CartActions.CreateCart) => action.payload),
      mergeMap((payload) => {
        return this.cartConnector
          .create(payload.userId, payload.oldCartId, payload.toMergeCartGuid)
          .pipe(
            switchMap((cart: Cart) => {
              const conditionalActions = [];
              if (payload.oldCartId) {
                conditionalActions.push(
                  new CartActions.MergeCartSuccess({
                    extraData: payload.extraData,
                    userId: payload.userId,
                    tempCartId: payload.tempCartId,
                    cartId: getCartIdByUserId(cart, payload.userId),
                    oldCartId: payload.oldCartId,
                  })
                );
              }
              return [
                new CartActions.CreateCartSuccess({
                  ...payload,
                  cart,
                  cartId: getCartIdByUserId(cart, payload.userId),
                }),
                new CartActions.RemoveCart({ cartId: payload.tempCartId }),
                ...conditionalActions,
              ];
            }),
            catchError((error) =>
              of(
                new CartActions.CreateCartFail({
                  ...payload,
                  error: normalizeHttpError(error, this.logger),
                })
              )
            )
          );
      }),
      withdrawOn(this.contextChange$)
    )
  );

  mergeCart$: Observable<CartActions.CreateCart> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.MERGE_CART),
      map((action: CartActions.MergeCart) => action.payload),
      switchMap((payload) => {
        return this.cartConnector
          .load(payload.userId, OCC_CART_ID_CURRENT)
          .pipe(
            map((currentCart) => {
              if (currentCart?.code !== payload.cartId) {
                return new CartActions.CreateCart({
                  userId: payload.userId,
                  oldCartId: payload.cartId,
                  toMergeCartGuid: currentCart ? currentCart.guid : undefined,
                  extraData: payload.extraData,
                  tempCartId: payload.tempCartId,
                });
              }
            }),
            filter(isNotUndefined)
          );
      }),
      withdrawOn(this.contextChange$)
    )
  );

  // TODO(#7241): Remove when AddVoucherSuccess actions will extend processes actions
  refresh$: Observable<
    CartActions.LoadCart | CartActions.CartProcessesDecrement
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.CART_ADD_VOUCHER_SUCCESS),
      map((action: CartActions.CartAddVoucherSuccess) => action.payload),
      concatMap((payload) =>
        from([
          new CartActions.CartProcessesDecrement(payload.cartId),
          new CartActions.LoadCart({
            userId: payload.userId,
            cartId: payload.cartId,
          }),
        ])
      )
    )
  );

  // TODO: Switch to automatic cart reload on processes count reaching 0 for cart entity
  refreshWithoutProcesses$: Observable<CartActions.LoadCart> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.CART_ADD_ENTRY_SUCCESS,
          CartActions.CART_REMOVE_ENTRY_SUCCESS,
          CartActions.CART_UPDATE_ENTRY_SUCCESS,
          CartActions.CART_REMOVE_VOUCHER_SUCCESS
        ),
        map(
          (
            action:
              | CartActions.CartAddEntrySuccess
              | CartActions.CartUpdateEntrySuccess
              | CartActions.CartRemoveEntrySuccess
              | CartActions.CartRemoveVoucherSuccess
          ) => action.payload
        ),
        map(
          (payload) =>
            new CartActions.LoadCart({
              userId: payload.userId,
              cartId: payload.cartId,
            })
        )
      )
  );

  resetCartDetailsOnSiteContextChange$: Observable<CartActions.ResetCartDetails> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(
          SiteContextActions.LANGUAGE_CHANGE,
          SiteContextActions.CURRENCY_CHANGE
        ),
        mergeMap(() => {
          return [new CartActions.ResetCartDetails()];
        })
      )
    );

  addEmail$: Observable<
    | CartActions.AddEmailToCartSuccess
    | CartActions.AddEmailToCartFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.ADD_EMAIL_TO_CART),
      map((action: CartActions.AddEmailToCart) => action.payload),
      mergeMap((payload) =>
        this.cartConnector
          .addEmail(payload.userId, payload.cartId, payload.email)
          .pipe(
            mergeMap(() => {
              return [
                new CartActions.AddEmailToCartSuccess({
                  ...payload,
                }),
                new CartActions.LoadCart({
                  userId: payload.userId,
                  cartId: payload.cartId,
                }),
              ];
            }),
            catchError((error) =>
              from([
                new CartActions.AddEmailToCartFail({
                  ...payload,
                  error: normalizeHttpError(error, this.logger),
                }),
                new CartActions.LoadCart({
                  userId: payload.userId,
                  cartId: payload.cartId,
                }),
              ])
            )
          )
      ),
      withdrawOn(this.contextChange$)
    )
  );

  deleteCart$: Observable<
    | CartActions.DeleteCartSuccess
    | CartActions.DeleteCartFail
    | CartActions.LoadCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.DELETE_CART),
      map((action: CartActions.DeleteCart) => action.payload),
      mergeMap((payload) =>
        this.cartConnector.delete(payload.userId, payload.cartId).pipe(
          map(() => {
            return new CartActions.DeleteCartSuccess({ ...payload });
          }),
          catchError((error) =>
            from([
              new CartActions.DeleteCartFail({
                ...payload,
                error: normalizeHttpError(error, this.logger),
              }),
              // Error might happen in higher backend layer and cart could still be removed.
              // When load fail with NotFound error then RemoveCart action will kick in and clear that cart in our state.
              new CartActions.LoadCart({
                ...payload,
              }),
            ])
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private store: Store<StateWithMultiCart>
  ) {}
}
