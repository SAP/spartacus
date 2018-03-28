import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

import * as fromActions from '../actions/delivery-modes.action';
import { OccCartService } from '../../../occ/cart/cart.service';
import { CartService } from '../../../cart/services';

@Injectable()
export class DeliveryModesEffects {
  @Effect()
  loadSupportedDeliveryModes$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_DELIVERY_MODES)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload => {
        if (payload === undefined || payload.userId === undefined) {
          payload = {
            userId: this.cartService.userId,
            cartId: this.cartService.cart.code
          };
        }
        if (payload.userId === undefined || payload.cartId === undefined) {
          return of(new fromActions.LoadDeliveryModesFail({}));
        }

        return this.occCartService
          .getSupportedDeliveryModes(payload.userId, payload.cartId)
          .pipe(
            map(data => new fromActions.LoadDeliveryModesSuccess(data)),
            catchError(error =>
              of(new fromActions.LoadDeliveryModesFail(error))
            )
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occCartService: OccCartService,
    private cartService: CartService
  ) {}
}
