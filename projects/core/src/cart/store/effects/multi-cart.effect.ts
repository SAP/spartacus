import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartActions } from '../actions/index';

@Injectable()
export class MultiCartEffects {
  @Effect()
  setTempCart$ = this.actions$.pipe(
    ofType(CartActions.SET_TEMP_CART),
    map((action: CartActions.SetTempCart) => {
      return new CartActions.RemoveCart({ cartId: action.payload.tempCartId });
    })
  );

  // TODO(#7241): Remove when we drop ADD_VOUCHER process and we sort out checkout and cart dependencies
  @Effect()
  processesIncrement$: Observable<CartActions.CartProcessesIncrement> = this.actions$.pipe(
    ofType(CartActions.CART_ADD_VOUCHER),
    map((action: CartActions.CartAddVoucher) => action.payload),
    map((payload) => new CartActions.CartProcessesIncrement(payload.cartId))
  );

  constructor(private actions$: Actions) {}
}
