import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OccOrderService } from '../../../occ/order/order.service';
import * as fromOrderDetailsAction from '../actions/order-details.action';
import { ProductImageConverterService } from '@spartacus/core';

@Injectable()
export class OrderDetailsEffect {
  constructor(
    private actions$: Actions,
    private occOrderService: OccOrderService,
    private productImageConverter: ProductImageConverterService
  ) {}

  @Effect()
  loadOrderDetails$: Observable<any> = this.actions$.pipe(
    ofType(fromOrderDetailsAction.LOAD_ORDER_DETAILS),
    map((action: fromOrderDetailsAction.LoadOrderDetails) => action.payload),
    switchMap(payload => {
      return this.occOrderService
        .getOrder(payload.userId, payload.orderCode)
        .pipe(
          map((order: any) => {
            if (order.consignments) {
              order.consignments.forEach(element => {
                element.entries.forEach(entry => {
                  this.productImageConverter.convertProduct(
                    entry.orderEntry.product
                  );
                });
              });
            }
            if (order.unconsignedEntries) {
              order.unconsignedEntries.forEach(entry => {
                this.productImageConverter.convertProduct(entry.product);
              });
            }
            return new fromOrderDetailsAction.LoadOrderDetailsSuccess(order);
          }),
          catchError(error =>
            of(new fromOrderDetailsAction.LoadOrderDetailsFail(error))
          )
        );
    })
  );
}
