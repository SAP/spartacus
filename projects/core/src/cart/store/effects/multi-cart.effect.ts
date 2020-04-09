import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutActions } from '../../../checkout/store/actions';
import * as DeprecatedCartActions from '../actions/cart.action';
import { CartActions } from '../actions/index';

@Injectable()
export class MultiCartEffects {
  @Effect()
  setTempCart$ = this.actions$.pipe(
    ofType(CartActions.SET_TEMP_CART),
    map((action: CartActions.SetTempCart) => {
      return new CartActions.RemoveTempCart(action.payload);
    })
  );

  @Effect()
  removeCart$: Observable<CartActions.RemoveCart> = this.actions$.pipe(
    ofType(DeprecatedCartActions.DELETE_CART),
    map((action: DeprecatedCartActions.DeleteCart) => action.payload),
    map((payload) => new CartActions.RemoveCart(payload.cartId))
  );

  // TODO: Change actions to extend Increment action instead of doing extra dispatch in this effect
  // Change for 2.0 release
  @Effect()
  processesIncrement$: Observable<
    CartActions.CartProcessesIncrement
  > = this.actions$.pipe(
    ofType(
      CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE,
      CartActions.CART_ADD_VOUCHER
    ),
    map(
      (
        action:
          | CheckoutActions.ClearCheckoutDeliveryMode
          | CartActions.CartAddVoucher
      ) => action.payload
    ),
    map((payload) => new CartActions.CartProcessesIncrement(payload.cartId))
  );

  constructor(private actions$: Actions) {}
}
