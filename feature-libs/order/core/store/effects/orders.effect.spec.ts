import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  normalizeHttpError,
  OrderHistoryList,
  SiteContextActions,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import {
  OrderAdapter,
  OrderConnector,
  ReplenishmentOrderAdapter,
  ReplenishmentOrderConnector,
} from '../../connectors/index';
import { OrderActions } from '../actions/index';
import * as fromOrdersEffect from './orders.effect';

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

const mockError = 'test-error';

describe('Orders effect', () => {
  let ordersEffect: fromOrdersEffect.OrdersEffect;
  let orderConnector: OrderConnector;
  let replenishmentOrderConnector: ReplenishmentOrderConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderConnector,
        ReplenishmentOrderConnector,
        fromOrdersEffect.OrdersEffect,
        { provide: OrderAdapter, useValue: {} },
        { provide: ReplenishmentOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    ordersEffect = TestBed.inject(fromOrdersEffect.OrdersEffect);
    orderConnector = TestBed.inject(OrderConnector);
    replenishmentOrderConnector = TestBed.inject(ReplenishmentOrderConnector);
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

        expect(ordersEffect.loadUserOrders$).toBeObservable(expected);
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

        expect(ordersEffect.loadUserOrders$).toBeObservable(expected);
      });
    });

    describe('Order History for a Replenishment Order Details', () => {
      it('should load user Orders for replenishment order details', () => {
        spyOn(
          replenishmentOrderConnector,
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
          replenishmentOrderConnector,
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
