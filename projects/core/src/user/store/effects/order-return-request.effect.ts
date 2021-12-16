import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReturnRequest, ReturnRequestList } from '../../../model/order.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Injectable()
export class OrderReturnRequestEffect {
  
  createReturnRequest$: Observable<UserActions.OrderReturnRequestAction> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.CREATE_ORDER_RETURN_REQUEST),
    map((action: UserActions.CreateOrderReturnRequest) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .return(payload.userId, payload.returnRequestInput)
        .pipe(
          map(
            (returnRequest: ReturnRequest) =>
              new UserActions.CreateOrderReturnRequestSuccess(returnRequest)
          ),
          catchError((error) =>
            of(
              new UserActions.CreateOrderReturnRequestFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  ));

  
  loadReturnRequest$: Observable<UserActions.OrderReturnRequestAction> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.LOAD_ORDER_RETURN_REQUEST),
    map((action: UserActions.LoadOrderReturnRequest) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .getReturnRequestDetail(payload.userId, payload.returnRequestCode)
        .pipe(
          map(
            (returnRequest: ReturnRequest) =>
              new UserActions.LoadOrderReturnRequestSuccess(returnRequest)
          ),
          catchError((error) =>
            of(
              new UserActions.LoadOrderReturnRequestFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  ));

  
  cancelReturnRequest$: Observable<UserActions.OrderReturnRequestAction> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.CANCEL_ORDER_RETURN_REQUEST),
    map((action: UserActions.CancelOrderReturnRequest) => action.payload),
    switchMap((payload) => {
      return this.orderConnector
        .cancelReturnRequest(
          payload.userId,
          payload.returnRequestCode,
          payload.returnRequestModification
        )
        .pipe(
          map(() => new UserActions.CancelOrderReturnRequestSuccess()),
          catchError((error) =>
            of(
              new UserActions.CancelOrderReturnRequestFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  ));

  
  loadReturnRequestList$: Observable<UserActions.OrderReturnRequestAction> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.LOAD_ORDER_RETURN_REQUEST_LIST),
    map((action: UserActions.LoadOrderReturnRequestList) => action.payload),
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
              new UserActions.LoadOrderReturnRequestListSuccess(
                returnRequestList
              )
          ),
          catchError((error) =>
            of(
              new UserActions.LoadOrderReturnRequestListFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  ));

  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector
  ) {}
}
