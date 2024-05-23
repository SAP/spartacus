import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  LoggerService,
  normalizeHttpError,
  SiteContextActions,
} from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import {
  OrderHistoryAdapter,
  OrderHistoryConnector,
  ReplenishmentOrderHistoryAdapter,
  ReplenishmentOrderHistoryConnector,
} from '../../connectors/index';
import { OrderActions } from '../actions/index';
import * as fromOrdersEffect from './orders.effect';

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

const mockError = 'test-error';

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('Orders effect', () => {
  let ordersEffect: fromOrdersEffect.OrdersEffect;
  let orderHistoryConnector: OrderHistoryConnector;
  let replenishmentOrderHistoryConnector: ReplenishmentOrderHistoryConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderHistoryConnector,
        ReplenishmentOrderHistoryConnector,
        fromOrdersEffect.OrdersEffect,
        { provide: OrderHistoryAdapter, useValue: {} },
        { provide: ReplenishmentOrderHistoryAdapter, useValue: {} },
        { provide: LoggerService, useClass: MockLoggerService },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    ordersEffect = TestBed.inject(fromOrdersEffect.OrdersEffect);
    orderHistoryConnector = TestBed.inject(OrderHistoryConnector);
    replenishmentOrderHistoryConnector = TestBed.inject(
      ReplenishmentOrderHistoryConnector
    );
  });

  describe('loadUserOrders$', () => {
    describe('Order History', () => {
      it('should load user Orders', () => {
        spyOn(orderHistoryConnector, 'getHistory').and.returnValue(
          of(mockUserOrders)
        );

        const action = new OrderActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
        });

        const completion = new OrderActions.LoadUserOrdersSuccess(
          mockUserOrders
        );
        actions$ = hot('-a', { a: action });

        const expected = cold('-b', { b: completion });

        expect(ordersEffect.loadUserOrders$).toBeObservable(expected);
      });

      it('should handle failures for load user Orders', () => {
        spyOn(orderHistoryConnector, 'getHistory').and.returnValue(
          throwError(() => mockError)
        );

        const action = new OrderActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
        });

        const completion = new OrderActions.LoadUserOrdersFail(
          normalizeHttpError(mockError, new MockLoggerService())
        );
        actions$ = hot('-a', { a: action });

        const expected = cold('-b', { b: completion });

        expect(ordersEffect.loadUserOrders$).toBeObservable(expected);
      });
    });

    describe('Order History for a Replenishment Order Details', () => {
      it('should load user Orders for replenishment order details', () => {
        spyOn(
          replenishmentOrderHistoryConnector,
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

        expect(ordersEffect.loadUserOrders$).toBeObservable(expected);
      });

      it('should handle failures for load user Orders for replenishment order details', () => {
        spyOn(
          replenishmentOrderHistoryConnector,
          'loadReplenishmentDetailsHistory'
        ).and.returnValue(throwError(() => mockError));

        const action = new OrderActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
          replenishmentOrderCode: 'test-repl-code',
        });

        const completion = new OrderActions.LoadUserOrdersFail(
          normalizeHttpError(mockError, new MockLoggerService())
        );
        actions$ = hot('-a', { a: action });

        const expected = cold('-b', { b: completion });

        expect(ordersEffect.loadUserOrders$).toBeObservable(expected);
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

      expect(ordersEffect.resetUserOrders$).toBeObservable(expected);
    });
  });
});
