import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReturnRequest, ReturnRequestList } from '../../../model/order.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';
import { USER_RETURN_REQUESTS } from '../user-state';

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
          map((returnRequest: ReturnRequest) => {
            return new UserActions.CreateOrderReturnRequestSuccess(
              returnRequest
            );
          }),
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
  loadReturnRequestList$: Observable<
    UserActions.OrderReturnRequestAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_ORDER_RETURN_REQUESTS),
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
          map((returnRequestList: ReturnRequestList) => {
            return new UserActions.LoadOrderReturnRequestListSuccess(
              returnRequestList
            );
          }),
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

  @Effect()
  resetReturnRequestList$: Observable<Action> = this.actions$.pipe(
    ofType(
      UserActions.CLEAR_USER_MISCS_DATA,
      UserActions.CLEAR_ORDER_RETURN_REQUESTS
    ),
    map(() => {
      return new StateLoaderActions.LoaderResetAction(USER_RETURN_REQUESTS);
    })
  );

  constructor(
    private actions$: Actions,
    private orderConnector: UserOrderConnector
  ) {}
}
