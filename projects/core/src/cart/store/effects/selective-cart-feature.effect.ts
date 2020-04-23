import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartConfigService } from '../../services/cart-config.service';
import { isSelectiveCart } from '../../utils/utils';
import { CartActions } from '../actions/index';

@Injectable()
export class SelectiveCartFeatureEffect {
  @Effect()
  enableSelectiveCart$: Observable<never> = this.actions$.pipe(
    ofType(CartActions.LOAD_CART_SUCCESS),
    switchMap((action: CartActions.LoadCartSuccess) => {
      if (isSelectiveCart(action.payload.cartId)) {
        this.cartConfigService.enableSelectiveCart();
      }
      return EMPTY;
    })
  );

  @Effect()
  disableSelectiveCart$: Observable<never> = this.actions$.pipe(
    ofType(CartActions.LOAD_CART_FAIL),
    switchMap((action: CartActions.LoadCartFail) => {
      try {
        const error = JSON.parse(action.payload.error.error);
        const selectiveCartNotFound = error.errors.find(
          (err) => err.reason === 'notFound' && isSelectiveCart(err.subject)
        );
        if (selectiveCartNotFound) {
          this.cartConfigService.disableSelectiveCart();
        }
      } catch {}

      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private cartConfigService: CartConfigService
  ) {}
}
