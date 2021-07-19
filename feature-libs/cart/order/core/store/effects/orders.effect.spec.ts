import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { OrderHistoryList } from '@spartacus/cart/order/root';
import { normalizeHttpError, SiteContextActions } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import {
  OrderAdapter,
  OrderConnector,
  ReplenishmentOrderAdapter,
  ReplenishmentOrderConnector,
} from '../../connectors/index';
import { OrderActions } from '../actions/index';
import * as fromUserOrdersEffect from './orders.effect';

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

const mockError = 'test-error';

describe('User Orders effect', () => {
  let userOrdersEffect: fromUserOrdersEffect.OrdersEffect;
  let orderConnector: OrderConnector;
  let userReplenishmentOrderConnector: ReplenishmentOrderConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromUserOrdersEffect.OrdersEffect,
        { provide: OrderAdapter, useValue: {} },
        { provide: ReplenishmentOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    userOrdersEffect = TestBed.inject(fromUserOrdersEffect.OrdersEffect);
    orderConnector = TestBed.inject(OrderConnector);
    userReplenishmentOrderConnector = TestBed.inject(
      ReplenishmentOrderConnector
    );
  });

  describe('loadUserOrders$', () => {
    describe('Order History', () => {
      it('should load user Orders', () => {
        spyOn(orderConnector, 'getHistory').and.returnValue(of(mockUserOrders));

        const action = new OrderActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
        });

        const completion = new OrderActions.LoadUserOrdersSuccess(
          mockUserOrders
        );
        actions$ = hot('-a', { a: action });

        const expected = cold('-b', { b: completion });

        expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
      });

      it('should handle failures for load user Orders', () => {
        spyOn(orderConnector, 'getHistory').and.returnValue(
          throwError(mockError)
        );

        const action = new OrderActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
        });

        const completion = new OrderActions.LoadUserOrdersFail(
          normalizeHttpError(mockError)
        );
        actions$ = hot('-a', { a: action });

        const expected = cold('-b', { b: completion });

        expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
      });
    });

    describe('Order History for a Replenishment Order Details', () => {
      it('should load user Orders for replenishment order details', () => {
        spyOn(
          userReplenishmentOrderConnector,
          'loadReplenishmentDetailsHistory'
        ).and.returnValue(of(mockUserOrders));

        const action = new OrderActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
          replenishmentOrderCode: 'test-repl-code',
        });

        const completion = new OrderActions.LoadUserOrdersSuccess(
          mockUserOrders
        );
        actions$ = hot('-a', { a: action });

        const expected = cold('-b', { b: completion });

        expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
      });

      it('should handle failures for load user Orders for replenishment order details', () => {
        spyOn(
          userReplenishmentOrderConnector,
          'loadReplenishmentDetailsHistory'
        ).and.returnValue(throwError(mockError));

        const action = new OrderActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
          replenishmentOrderCode: 'test-repl-code',
        });

        const completion = new OrderActions.LoadUserOrdersFail(
          normalizeHttpError(mockError)
        );
        actions$ = hot('-a', { a: action });

        const expected = cold('-b', { b: completion });

        expect(userOrdersEffect.loadUserOrders$).toBeObservable(expected);
      });
    });
  });

  describe('resetUserOrders$', () => {
    it('should return a reset action', () => {
      const action = new SiteContextActions.LanguageChange({
        previous: 'previous',
        current: 'current',
      });

      const completion = new OrderActions.ClearUserOrders();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.resetUserOrders$).toBeObservable(expected);
    });
  });
});
