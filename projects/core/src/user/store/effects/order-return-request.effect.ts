import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReturnRequest, ReturnRequestList } from '../../../model/order.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class OrderReturnRequestEffect {
  @Effect()
  createReturnRequest$: Observable<
    UserActions.OrderReturnRequestAction
  > = this.actions$.pipe(
    ofType(UserActions.CREATE_ORDER_RETURN_REQUEST),
    map((action: UserActions.CreateOrderReturnRequest) => action.payload),
    switchMap(payload => {
      return this.orderConnector
        .return(payload.userId, payload.returnRequestInput)
        .pipe(
          map(
            (returnRequest: ReturnRequest) =>
              new UserActions.CreateOrderReturnRequestSuccess(returnRequest)
          ),
          catchError(error =>
            of(
              new UserActions.CreateOrderReturnRequestFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  loadReturnRequest$: Observable<
    UserActions.OrderReturnRequestAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_ORDER_RETURN_REQUEST),
    map((action: UserActions.LoadOrderReturnRequest) => action.payload),
    switchMap(payload => {
      return this.orderConnector
        .getReturnRequestDetail(payload.userId, payload.returnRequestCode)
        .pipe(
          map(
            (returnRequest: ReturnRequest) =>
              new UserActions.LoadOrderReturnRequestSuccess(returnRequest)
          ),
          catchError(error =>
            of(
              new UserActions.LoadOrderReturnRequestFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  cancelReturnRequest$: Observable<
    UserActions.OrderReturnRequestAction
  > = this.actions$.pipe(
    ofType(UserActions.CANCEL_ORDER_RETURN_REQUEST),
    map((action: UserActions.CancelOrderReturnRequest) => action.payload),
    switchMap(payload => {
      return this.orderConnector
        .cancelReturnRequest(
          payload.userId,
          payload.returnRequestCode,
          payload.returnRequestModification
        )
        .pipe(
          map(_ => new UserActions.CancelOrderReturnRequestSuccess()),
          catchError(error =>
            of(
              new UserActions.CancelOrderReturnRequestFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  loadReturnRequestList$: Observable<
    UserActions.OrderReturnRequestAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_ORDER_RETURN_REQUEST_LIST),
    map((action: UserActions.LoadOrderReturnRequestList) => action.payload),
    switchMap(payload => {
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
          catchError(error =>
            of(
              new UserActions.LoadOrderReturnRequestListFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector
  ) {}
}
