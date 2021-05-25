import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderHistoryList } from '../../../model/order.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import {
  UserOrderAdapter,
  UserOrderConnector,
  UserReplenishmentOrderAdapter,
  UserReplenishmentOrderConnector,
} from '../../connectors/index';
import { UserActions } from '../actions/index';
import * as fromUserOrdersEffect from './user-orders.effect';

const mockUserOrders: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

const mockError = 'test-error';

describe('User Orders effect', () => {
  let userOrdersEffect: fromUserOrdersEffect.UserOrdersEffect;
  let orderConnector: UserOrderConnector;
  let userReplenishmentOrderConnector: UserReplenishmentOrderConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromUserOrdersEffect.UserOrdersEffect,
        { provide: UserOrderAdapter, useValue: {} },
        { provide: UserReplenishmentOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    userOrdersEffect = TestBed.inject(fromUserOrdersEffect.UserOrdersEffect);
    orderConnector = TestBed.inject(UserOrderConnector);
    userReplenishmentOrderConnector = TestBed.inject(
      UserReplenishmentOrderConnector
    );
  });

  describe('loadUserOrders$', () => {
    describe('Order History', () => {
      it('should load user Orders', () => {
        spyOn(orderConnector, 'getHistory').and.returnValue(of(mockUserOrders));

        const action = new UserActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
        });

        const completion = new UserActions.LoadUserOrdersSuccess(
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

        const action = new UserActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
        });

        const completion = new UserActions.LoadUserOrdersFail(
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

        const action = new UserActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
          replenishmentOrderCode: 'test-repl-code',
        });

        const completion = new UserActions.LoadUserOrdersSuccess(
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

        const action = new UserActions.LoadUserOrders({
          userId: 'test@sap.com',
          pageSize: 5,
          replenishmentOrderCode: 'test-repl-code',
        });

        const completion = new UserActions.LoadUserOrdersFail(
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

      const completion = new UserActions.ClearUserOrders();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userOrdersEffect.resetUserOrders$).toBeObservable(expected);
    });
  });
});
