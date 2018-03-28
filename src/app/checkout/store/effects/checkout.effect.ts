import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { OccCartService } from '../../../occ/cart/cart.service';
import { CartService } from '../../../cart/services';

@Injectable()
export class CheckoutEffects {
  @Effect()
  addDeliveryAddress$: Observable<any> = this.actions$
    .ofType(fromActions.ADD_DELIVERY_ADDRESS)
    .pipe(
      map((action: fromActions.AddDeliveryAddress) => action.payload),
      mergeMap(payload =>
        this.occCartService
          .createAddressOnCart(payload.userId, payload.cartId, payload.address)
          .pipe(
            tap(address => {
              return this.occCartService.setDeliveryAddress(
                payload.userId,
                payload.cartId,
                address.id
              );
            }),
            map(address => new fromActions.AddDeliveryAddressSuccess(address)),
            catchError(error =>
              of(new fromActions.AddDeliveryAddressFail(error))
            )
          )
      )
    );

  @Effect()
  loadSupportedDeliveryModes$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_SUPPORTED_DELIVERY_MODES)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload => {
        return this.occCartService
          .getSupportedDeliveryModes(payload.userId, payload.cartId)
          .pipe(
            map(
              data => new fromActions.LoadSupportedDeliveryModesSuccess(data)
            ),
            catchError(error =>
              of(new fromActions.LoadSupportedDeliveryModesFail(error))
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
