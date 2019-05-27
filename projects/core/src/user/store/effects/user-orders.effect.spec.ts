import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of, throwError } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import { CLEAR_MISCS_DATA } from '../actions';
import { USER_ORDERS } from '../user-state';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { LoaderResetAction } from '../../../state';

import * as fromUserOrdersEffect from './user-orders.effect';
import { OrderHistoryList } from '../../../model/order.model';
import { UserOrderConnector } from '../../connectors/order/order.connector';
import { UserOrderAdapter } from '../../connectors/order/order.adapter';

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

describe('User Orders effect', () => {
  let userOrdersEffect: fromUserOrdersEffect.UserOrdersEffect;
  let orderConnector: UserOrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromUserOrdersEffect.UserOrdersEffect,
        { provide: UserOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.get(Actions);
    userOrdersEffect = TestBed.get(fromUserOrdersEffect.UserOrdersEffect);
    orderConnector = TestBed.get(UserOrderConnector);
  });

  describe('loadUserOrders$', () => {
    it('should load user Orders', () => {
      spyOn(orderConnector, 'getHistory').and.returnValue(of(mockUserOrders));
      const action = new fromUserOrdersAction.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new fromUserOrdersAction.LoadUserOrdersSuccess(
        mockUserOrders
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
    });

    it('should handle failures for load user Orders', () => {
      spyOn(orderConnector, 'getHistory').and.returnValue(throwError('Error'));

      const action = new fromUserOrdersAction.LoadUserOrders({
        userId: 'test@sap.com',
        pageSize: 5,
      });

      const completion = new fromUserOrdersAction.LoadUserOrdersFail('Error');

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
    });
  });

  describe('resetUserOrders$', () => {
    it('should return a reset action', () => {
      const action: Action = {
        type: CLEAR_MISCS_DATA,
      };

      const completion = new LoaderResetAction(USER_ORDERS);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.resetUserOrders$).toBeObservable(expected);
    });
  });
});
