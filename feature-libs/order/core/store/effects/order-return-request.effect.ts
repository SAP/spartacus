import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  normalizeHttpError,
  ReturnRequest,
  ReturnRequestList,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderConnector } from '../../connectors/order.connector';
import { OrderActions } from '../actions/index';

@Injectable()
export class OrderReturnRequestEffect {
  @Effect()
  createReturnRequest$: Observable<OrderActions.OrderReturnRequestAction> = this.actions$.pipe(
    ofType(OrderActions.CREATE_ORDER_RETURN_REQUEST),
    map((action: OrderActions.CreateOrderReturnRequest) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .return(payload.userId, payload.returnRequestInput)
        .pipe(
          map(
            (returnRequest: ReturnRequest) =>
              new OrderActions.CreateOrderReturnRequestSuccess(returnRequest)
          ),
          catchError((error) =>
            of(
              new OrderActions.CreateOrderReturnRequestFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  loadReturnRequest$: Observable<OrderActions.OrderReturnRequestAction> = this.actions$.pipe(
    ofType(OrderActions.LOAD_ORDER_RETURN_REQUEST),
    map((action: OrderActions.LoadOrderReturnRequest) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .getReturnRequestDetail(payload.userId, payload.returnRequestCode)
        .pipe(
          map(
            (returnRequest: ReturnRequest) =>
              new OrderActions.LoadOrderReturnRequestSuccess(returnRequest)
          ),
          catchError((error) =>
            of(
              new OrderActions.LoadOrderReturnRequestFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  cancelReturnRequest$: Observable<OrderActions.OrderReturnRequestAction> = this.actions$.pipe(
    ofType(OrderActions.CANCEL_ORDER_RETURN_REQUEST),
    map((action: OrderActions.CancelOrderReturnRequest) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .cancelReturnRequest(
          payload.userId,
          payload.returnRequestCode,
          payload.returnRequestModification
        )
        .pipe(
          map(() => new OrderActions.CancelOrderReturnRequestSuccess()),
          catchError((error) =>
            of(
              new OrderActions.CancelOrderReturnRequestFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  loadReturnRequestList$: Observable<OrderActions.OrderReturnRequestAction> = this.actions$.pipe(
    ofType(OrderActions.LOAD_ORDER_RETURN_REQUEST_LIST),
    map((action: OrderActions.LoadOrderReturnRequestList) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .getReturnRequestList(
          payload.userId,
          payload.pageSize,
          payload.currentPage,
          payload.sort
        )
        .pipe(
          map(
            (returnRequestList: ReturnRequestList) =>
              new OrderActions.LoadOrderReturnRequestListSuccess(
                returnRequestList
              )
          ),
          catchError((error) =>
            of(
              new OrderActions.LoadOrderReturnRequestListFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private orderConnector: OrderConnector
  ) {}
}
