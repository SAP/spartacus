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
import {
  getActiveCartId,
  getCartHasPendingProcessesSelectorFactory,
} from '../selectors/multi-cart.selector';

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
    | DeprecatedCartActions.LoadCartFail
    | CartActions.LoadMultiCartFail
    | DeprecatedCartActions.LoadCartSuccess
    | CartActions.LoadMultiCartSuccess
    | CartActions.ClearExpiredCoupons
    | DeprecatedCartActions.ClearCart
    | CartActions.RemoveCart
  > = this.actions$.pipe(
    ofType(DeprecatedCartActions.LOAD_CART),
    map((action: DeprecatedCartActions.LoadCart) => action.payload),
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
            // TODO: remove with the `cart` store feature
            withLatestFrom(this.store.pipe(select(getActiveCartId))),
            mergeMap(([cart, activeCartId]: [Cart, string]) => {
              let actions = [];
              if (cart) {
                // `cart` store branch should only be updated for active cart
                // avoid dispatching LoadCartSuccess action on different cart loads
                if (
                  payload.cartId === activeCartId ||
                  payload.cartId === OCC_CART_ID_CURRENT
                ) {
                  actions.push(new DeprecatedCartActions.LoadCartSuccess(cart));
                }
                actions.push(
                  new CartActions.LoadMultiCartSuccess({
                    cart,
                    userId: payload.userId,
                    extraData: payload.extraData,
                  })
                );
                if (payload.cartId === OCC_CART_ID_CURRENT) {
                  // Removing cart from entity object under `current` key as it is no longer needed.
                  // Current cart is loaded under it's code entity.
                  actions.push(new CartActions.RemoveCart(OCC_CART_ID_CURRENT));
                }
              } else {
                actions = [
                  new DeprecatedCartActions.LoadCartFail({}),
                  new CartActions.LoadMultiCartFail({
                    cartId: payload.cartId,
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
                new DeprecatedCartActions.LoadCartFail(
                  makeErrorSerializable(error)
                ),
                new CartActions.LoadMultiCartFail({
                  cartId: payload.cartId,
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
    | DeprecatedCartActions.MergeCartSuccess
    | CartActions.MergeMultiCartSuccess
    | CartActions.CreateCartSuccess
    | CartActions.CreateCartFail
    | CartActions.SetTempCart
  > = this.actions$.pipe(
    ofType(DeprecatedCartActions.CREATE_CART),
    map((action: CartActions.CreateCart) => action.payload),
    mergeMap((payload) => {
      return this.cartConnector
        .create(payload.userId, payload.oldCartId, payload.toMergeCartGuid)
        .pipe(
          switchMap((cart: Cart) => {
            const conditionalActions = [];
            if (payload.oldCartId) {
              conditionalActions.push(
                new DeprecatedCartActions.MergeCartSuccess({
                  userId: payload.userId,
                  cartId: cart.code,
                })
              );
              conditionalActions.push(
                new CartActions.MergeMultiCartSuccess({
                  userId: payload.userId,
                  cartId: cart.code,
                  oldCartId: payload.oldCartId,
                })
              );
            }
            return [
              new CartActions.CreateCartSuccess({
                cart,
                userId: payload.userId,
                extraData: payload.extraData,
                cartId: getCartIdByUserId(cart, payload.userId),
                tempCartId: payload.tempCartId,
                oldCartId: payload.oldCartId,
                toMergeCartGuid: payload.toMergeCartGuid,
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
                tempCartId: payload.tempCartId,
                error: makeErrorSerializable(error),
                userId: payload.userId,
                oldCartId: payload.oldCartId,
                toMergeCartGuid: payload.toMergeCartGuid,
                extraData: payload.extraData,
              })
            )
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  mergeCart$: Observable<CartActions.CreateCart> = this.actions$.pipe(
    ofType(DeprecatedCartActions.MERGE_CART),
    map((action: DeprecatedCartActions.MergeCart) => action.payload),
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
    DeprecatedCartActions.LoadCart | CartActions.CartProcessesDecrement
  > = this.actions$.pipe(
    ofType(
      DeprecatedCartActions.ADD_EMAIL_TO_CART_SUCCESS,
      CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS,
      CartActions.CART_ADD_VOUCHER_SUCCESS
    ),
    map(
      (
        action:
          | DeprecatedCartActions.AddEmailToCartSuccess
          | CheckoutActions.ClearCheckoutDeliveryModeSuccess
          | CartActions.CartAddVoucherSuccess
      ) => action.payload
    ),
    concatMap((payload) =>
      from([
        new CartActions.CartProcessesDecrement(payload.cartId),
        new DeprecatedCartActions.LoadCart({
          userId: payload.userId,
          cartId: payload.cartId,
        }),
      ])
    )
  );

  @Effect()
  refreshWithoutProcesses$: Observable<
    DeprecatedCartActions.LoadCart
  > = this.actions$.pipe(
    ofType(
      DeprecatedCartActions.MERGE_CART_SUCCESS,
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
          | DeprecatedCartActions.MergeCartSuccess
          | CartActions.CartRemoveEntrySuccess
          | CartActions.CartRemoveVoucherSuccess
      ) => action.payload
    ),
    map(
      (payload) =>
        new DeprecatedCartActions.LoadCart({
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
    | DeprecatedCartActions.AddEmailToCartSuccess
    | DeprecatedCartActions.AddEmailToCartFail
    | CartActions.AddEmailToMultiCartFail
    | CartActions.AddEmailToMultiCartSuccess
    | CartActions.CartProcessesDecrement
    | DeprecatedCartActions.LoadCart
  > = this.actions$.pipe(
    ofType(DeprecatedCartActions.ADD_EMAIL_TO_CART),
    map((action: DeprecatedCartActions.AddEmailToCart) => action.payload),
    mergeMap((payload) =>
      this.cartConnector
        .addEmail(payload.userId, payload.cartId, payload.email)
        .pipe(
          mergeMap(() => {
            return [
              new DeprecatedCartActions.AddEmailToCartSuccess({
                userId: payload.userId,
                cartId: payload.cartId,
              }),
              new CartActions.AddEmailToMultiCartSuccess({
                userId: payload.userId,
                cartId: payload.cartId,
              }),
            ];
          }),
          catchError((error) =>
            from([
              new DeprecatedCartActions.AddEmailToCartFail(
                makeErrorSerializable(error)
              ),
              new CartActions.AddEmailToMultiCartFail({
                error: makeErrorSerializable(error),
                userId: payload.userId,
                cartId: payload.cartId,
              }),
              new CartActions.CartProcessesDecrement(payload.cartId),
              new DeprecatedCartActions.LoadCart({
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
