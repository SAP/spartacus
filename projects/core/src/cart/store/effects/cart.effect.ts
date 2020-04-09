import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  groupBy,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { CheckoutActions } from '../../../checkout/store/actions/index';
import { Cart } from '../../../model/cart.model';
import { OCC_CART_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { withdrawOn } from '../../../util/withdraw-on';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { getCartIdByUserId } from '../../utils/utils';
import * as DeprecatedCartActions from '../actions/cart.action';
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

  @Effect()
  loadCart$: Observable<
    | CartActions.LoadCartFail
    | CartActions.LoadCartSuccess
    | CartActions.ClearExpiredCoupons
    | DeprecatedCartActions.ClearCart
    | CartActions.RemoveCart
  > = this.actions$.pipe(
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
            mergeMap((cart: Cart) => {
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
                  actions.push(new CartActions.RemoveCart(OCC_CART_ID_CURRENT));
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
            catchError((error) => {
              if (error?.error?.errors) {
                const couponExpiredErrors = error.error.errors.filter(
                  (err) => err.reason === 'invalid'
                );
                if (couponExpiredErrors.length > 0) {
                  // clear coupons actions just wanted to reload cart again
                  // no need to do it in refresh or keep that action
                  // however removing this action will be a breaking change
                  // remove that action in 2.0 release
                  // @deprecated since 1.4
                  return from([
                    new CartActions.LoadCart({ ...payload }),
                    new CartActions.ClearExpiredCoupons({}),
                  ]);
                }

                const cartNotFoundErrors = error.error.errors.filter(
                  (err) => err.reason === 'notFound' || 'UnknownResourceError'
                );
                if (
                  cartNotFoundErrors.length > 0 &&
                  payload.extraData &&
                  payload.extraData.active
                ) {
                  // Clear cart is responsible for removing cart in `cart` store feature.
                  // Remove cart does the same thing, but in `multi-cart` store feature.
                  return from([
                    new DeprecatedCartActions.ClearCart(),
                    new CartActions.RemoveCart(payload.cartId),
                  ]);
                }
              }
              return from([
                new CartActions.LoadCartFail({
                  ...payload,
                  error: makeErrorSerializable(error),
                }),
              ]);
            })
          );
        })
      )
    ),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  createCart$: Observable<
    | CartActions.MergeCartSuccess
    | CartActions.CreateCartSuccess
    | CartActions.CreateCartFail
    | CartActions.SetTempCart
  > = this.actions$.pipe(
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
              new CartActions.SetTempCart({
                cart,
                tempCartId: payload.tempCartId,
              }),
              ...conditionalActions,
            ];
          }),
          catchError((error) =>
            of(
              new CartActions.CreateCartFail({
                ...payload,
                error: makeErrorSerializable(error),
              })
            )
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  mergeCart$: Observable<CartActions.CreateCart> = this.actions$.pipe(
    ofType(CartActions.MERGE_CART),
    map((action: CartActions.MergeCart) => action.payload),
    mergeMap((payload) => {
      return this.cartConnector.load(payload.userId, OCC_CART_ID_CURRENT).pipe(
        mergeMap((currentCart) => {
          return [
            new CartActions.CreateCart({
              userId: payload.userId,
              oldCartId: payload.cartId,
              toMergeCartGuid: currentCart ? currentCart.guid : undefined,
              extraData: payload.extraData,
              tempCartId: payload.tempCartId,
            }),
          ];
        })
      );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  refresh$: Observable<
    CartActions.LoadCart | CartActions.CartProcessesDecrement
  > = this.actions$.pipe(
    ofType(
      CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS,
      CartActions.CART_ADD_VOUCHER_SUCCESS
    ),
    map(
      (
        action:
          | CheckoutActions.ClearCheckoutDeliveryModeSuccess
          | CartActions.CartAddVoucherSuccess
      ) => action.payload
    ),
    concatMap((payload) =>
      from([
        new CartActions.CartProcessesDecrement(payload.cartId),
        new CartActions.LoadCart({
          userId: payload.userId,
          cartId: payload.cartId,
        }),
      ])
    )
  );

  @Effect()
  refreshWithoutProcesses$: Observable<
    CartActions.LoadCart
  > = this.actions$.pipe(
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
  );

  @Effect()
  resetCartDetailsOnSiteContextChange$: Observable<
    DeprecatedCartActions.ResetCartDetails | CartActions.ResetMultiCartDetails
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    mergeMap(() => {
      return [
        new DeprecatedCartActions.ResetCartDetails(),
        new CartActions.ResetMultiCartDetails(),
      ];
    })
  );

  @Effect()
  addEmail$: Observable<
    | CartActions.AddEmailToCartSuccess
    | CartActions.AddEmailToCartFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
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
                error: makeErrorSerializable(error),
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
  );

  @Effect()
  deleteCart$: Observable<any> = this.actions$.pipe(
    ofType(DeprecatedCartActions.DELETE_CART),
    map((action: DeprecatedCartActions.DeleteCart) => action.payload),
    exhaustMap((payload) =>
      this.cartConnector.delete(payload.userId, payload.cartId).pipe(
        map(() => {
          return new DeprecatedCartActions.ClearCart();
        }),
        catchError((error) =>
          of(
            new DeprecatedCartActions.DeleteCartFail(
              makeErrorSerializable(error)
            )
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
