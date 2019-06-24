import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { CartVoucherConnector } from '../../connectors/voucher/cart-voucher.connector';
import * as fromActions from './../actions/cart-voucher.action';

@Injectable()
export class CartVoucherEffects {
  constructor(
    private actions$: Actions,
    private cartVoucherConnector: CartVoucherConnector,
    private messageService: GlobalMessageService
  ) {}

  @Effect()
  addCartVoucher$: Observable<
    fromActions.CartVoucherAction
  > = this.actions$.pipe(
    ofType(fromActions.ADD_CART_VOUCHER),
    map((action: fromActions.AddCartVoucher) => action.payload),
    mergeMap(payload => {
      return this.cartVoucherConnector
        .add(payload.userId, payload.cartId, payload.voucherId)
        .pipe(
          map(() => {
            this.messageService.add(
              {
                key: 'voucher.applyVoucherSuccess',
                params: { voucherCode: payload.voucherId },
              },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
            return new fromActions.AddCartVoucherSuccess();
          }),
          catchError(error => of(new fromActions.AddCartVoucherFail(error)))
        );
    })
  );

  @Effect()
  removeCartVoucher$: Observable<
    fromActions.CartVoucherAction
  > = this.actions$.pipe(
    ofType(fromActions.REMOVE_CART_VOUCHER),
    map((action: fromActions.RemoveCartVoucher) => action.payload),
    mergeMap(payload => {
      return this.cartVoucherConnector
        .remove(payload.userId, payload.cartId, payload.voucherId)
        .pipe(
          map(() => {
            this.messageService.add(
              {
                key: 'voucher.removeVoucherSuccess',
                params: { voucherCode: payload.voucherId },
              },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
            return new fromActions.RemoveCartVoucherSuccess();
          }),
          catchError(error => of(new fromActions.RemoveCartVoucherFail(error)))
        );
    })
  );
}
