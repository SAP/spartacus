import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { CheckoutActions } from '../../../checkout/store/actions/index';
import { Cart } from '../../../model/cart.model';
import { OCC_CART_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { CartDataService } from '../../facade/cart-data.service';
import { CartActions } from '../actions/index';

@Injectable()
export class CartEffects {
  @Effect()
  loadCart$: Observable<
    | CartActions.LoadCartFail
    | CartActions.LoadMultiCartFail
    | CartActions.LoadCartSuccess
    | CartActions.LoadMultiCartSuccess
    | CartActions.ClearExpiredCoupons
    | CartActions.ClearCart
    | CartActions.RemoveCart
  > = this.actions$.pipe(
    ofType(CartActions.LOAD_CART),
    map((action: CartActions.LoadCart) => action.payload),
    mergeMap(payload => {
      const loadCartParams = {
        userId: (payload && payload.userId) || this.cartData.userId,
        cartId: (payload && payload.cartId) || this.cartData.cartId,
      };

      if (this.isMissingData(loadCartParams)) {
        return from([
          new CartActions.LoadCartFail({}),
          new CartActions.LoadMultiCartFail({ cartId: loadCartParams.cartId }),
        ]);
      }
      return this.cartConnector
        .load(loadCartParams.userId, loadCartParams.cartId)
        .pipe(
          mergeMap((cart: Cart) => {
            let actions = [];
            if (payload.extraData && payload.extraData.addEntries) {
              actions.push(new CartActions.CartSuccessAddEntryProcess());
            }
            if (cart) {
              actions.push(new CartActions.LoadCartSuccess(cart));
              actions.push(
                new CartActions.LoadMultiCartSuccess({
                  cart,
                  userId: loadCartParams.userId,
                  extraData: payload.extraData,
                })
              );
              if (loadCartParams.cartId === OCC_CART_ID_CURRENT) {
                // Removing cart from entity object under `current` key as it is no longer needed.
                // Current cart is loaded under it's code entity.
                actions.push(new CartActions.RemoveCart(OCC_CART_ID_CURRENT));
              }
            } else {
              actions = [
                new CartActions.LoadCartFail({}),
                new CartActions.LoadMultiCartFail({
                  cartId: loadCartParams.cartId,
                }),
              ];
            }
            return actions;
          }),
          catchError(error => {
            const couponExpiredErrors = error.error.errors.filter(
              err => err.reason === 'invalid'
            );
            if (couponExpiredErrors.length > 0) {
              return of(new CartActions.ClearExpiredCoupons({}));
            }

            if (error && error.error && error.error.errors) {
              const cartNotFoundErrors = error.error.errors.filter(
                err => err.reason === 'notFound' || 'UnknownResourceError'
              );
              if (cartNotFoundErrors.length > 0) {
                return from([
                  new CartActions.ClearCart(),
                  new CartActions.RemoveCart(loadCartParams.cartId),
                ]);
              }
            }
            return from([
              new CartActions.LoadCartFail(makeErrorSerializable(error)),
              new CartActions.LoadMultiCartFail({
                cartId: loadCartParams.cartId,
                error: makeErrorSerializable(error),
              }),
            ]);
          })
        );
    })
  );

  @Effect()
  createCart$: Observable<
    | CartActions.MergeCartSuccess
    | CartActions.MergeMultiCartSuccess
    | CartActions.CreateCartSuccess
    | CartActions.CreateMultiCartSuccess
    | CartActions.CreateCartFail
    | CartActions.CreateMultiCartFail
    | CartActions.SetFreshCart
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_CART),
    map((action: CartActions.CreateCart) => action.payload),
    mergeMap(payload => {
      return this.cartConnector
        .create(payload.userId, payload.oldCartId, payload.toMergeCartGuid)
        .pipe(
          switchMap((cart: Cart) => {
            if (payload.oldCartId) {
              return [
                new CartActions.CreateCartSuccess(cart),
                new CartActions.CreateMultiCartSuccess({
                  cart,
                  userId: payload.userId,
                  extraData: payload.extraData,
                }),
                new CartActions.SetFreshCart(cart),
                new CartActions.MergeCartSuccess({
                  userId: payload.userId,
                  cartId: cart.code,
                }),
                new CartActions.MergeMultiCartSuccess({
                  userId: payload.userId,
                  cartId: cart.code,
                  oldCartId: payload.oldCartId,
                }),
              ];
            }
            return [
              new CartActions.CreateCartSuccess(cart),
              new CartActions.CreateMultiCartSuccess({
                cart,
                userId: payload.userId,
                extraData: payload.extraData,
              }),
              new CartActions.SetFreshCart(cart),
            ];
          }),
          catchError(error =>
            from([
              new CartActions.CreateCartFail(makeErrorSerializable(error)),
              new CartActions.CreateMultiCartFail({
                cartId: payload.cartId,
                error: makeErrorSerializable(error),
              }),
            ])
          )
        );
    })
  );

  @Effect()
  mergeCart$: Observable<CartActions.CreateCart> = this.actions$.pipe(
    ofType(CartActions.MERGE_CART),
    map((action: CartActions.MergeCart) => action.payload),
    mergeMap(payload => {
      return this.cartConnector.load(payload.userId, OCC_CART_ID_CURRENT).pipe(
        mergeMap(currentCart => {
          return [
            new CartActions.CreateCart({
              userId: payload.userId,
              oldCartId: payload.cartId,
              toMergeCartGuid: currentCart ? currentCart.guid : undefined,
              extraData: payload.extraData,
            }),
          ];
        })
      );
    })
  );

  @Effect()
  refresh$: Observable<CartActions.LoadCart> = this.actions$.pipe(
    ofType(
      CartActions.MERGE_CART_SUCCESS,
      CartActions.CART_UPDATE_ENTRY_SUCCESS,
      CartActions.CART_REMOVE_ENTRY_SUCCESS,
      CartActions.ADD_EMAIL_TO_CART_SUCCESS,
      CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS,
      CartActions.CART_REMOVE_ENTRY_SUCCESS,
      CartActions.CART_ADD_VOUCHER_SUCCESS,
      CartActions.CART_REMOVE_VOUCHER_SUCCESS,
      CartActions.CART_REMOVE_VOUCHER_FAIL,
      CartActions.CLEAR_EXPIRED_COUPONS
    ),
    map(
      (
        action:
          | CartActions.MergeCartSuccess
          | CartActions.CartUpdateEntrySuccess
          | CartActions.CartRemoveEntrySuccess
          | CartActions.AddEmailToCartSuccess
          | CheckoutActions.ClearCheckoutDeliveryModeSuccess
          | CartActions.CartAddVoucherSuccess
          | CartActions.CartRemoveVoucherSuccess
          | CartActions.CartRemoveVoucherFail
          | CartActions.ClearExpiredCoupons
      ) => action.payload
    ),
    map(
      payload =>
        payload &&
        new CartActions.LoadCart({
          userId: payload.userId,
          cartId: payload.cartId,
        })
    )
  );

  @Effect()
  resetCartDetailsOnSiteContextChange$: Observable<
    CartActions.ResetCartDetails | CartActions.ResetMultiCartDetails
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    mergeMap(() => {
      return [
        new CartActions.ResetCartDetails(),
        new CartActions.ResetMultiCartDetails(),
      ];
    })
  );

  @Effect()
  addEmail$: Observable<
    | CartActions.AddEmailToCartSuccess
    | CartActions.AddEmailToCartFail
    | CartActions.AddEmailToMultiCartFail
    | CartActions.AddEmailToMultiCartSuccess
  > = this.actions$.pipe(
    ofType(CartActions.ADD_EMAIL_TO_CART),
    map((action: CartActions.AddEmailToCart) => action.payload),
    mergeMap(payload =>
      this.cartConnector
        .addEmail(payload.userId, payload.cartId, payload.email)
        .pipe(
          mergeMap(() => {
            return [
              new CartActions.AddEmailToCartSuccess({
                userId: payload.userId,
                cartId: payload.cartId,
              }),
              new CartActions.AddEmailToMultiCartSuccess({
                userId: payload.userId,
                cartId: payload.cartId,
              }),
            ];
          }),
          catchError(error =>
            from([
              new CartActions.AddEmailToCartFail(makeErrorSerializable(error)),
              new CartActions.AddEmailToMultiCartFail({
                error: makeErrorSerializable(error),
                userId: payload.userId,
                cartId: payload.cartId,
              }),
            ])
          )
        )
    )
  );

  @Effect()
  deleteCart$: Observable<any> = this.actions$.pipe(
    ofType(CartActions.DELETE_CART),
    map((action: CartActions.DeleteCart) => action.payload),
    exhaustMap(payload =>
      this.cartConnector.delete(payload.userId, payload.cartId).pipe(
        map(() => {
          return new CartActions.ClearCart();
        }),
        catchError(error =>
          of(new CartActions.DeleteCartFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private cartData: CartDataService
  ) {}

  private isMissingData(payload: { userId: string; cartId: string }) {
    return payload.userId === undefined || payload.cartId === undefined;
  }
}
