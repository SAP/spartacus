import { Injectable } from '@angular/core';

import * as fromActions from './../actions/cart.action';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Cart } from '../../models/cart-types.model';
import { OccCartService } from '../../../newocc/cart/cart.service';

@Injectable()
export class CartEffects {
  @Effect()
  createCart$: Observable<any> = this.actions$
    .ofType(fromActions.CREATE_CART)
    .pipe(
      map((action: fromActions.CreateCart) => action.payload),
      mergeMap(userId => {
        return this.cartService.createCart(userId).pipe(
          map((cart: Cart) => {
            return new fromActions.CreateCartSuccess(cart);
          }),
          catchError(error => of(new fromActions.CreateCartFail(error)))
        );
      })
    );

  constructor(private actions$: Actions, private cartService: OccCartService) {}
}
