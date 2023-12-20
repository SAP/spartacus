import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  GlobalMessageService,
  LoggerService,
  SiteContextActions,
  UserIdService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderHistoryAdapter } from '../../connectors/order-history.adapter';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import * as fromReducers from '../../store/reducers/index';
import { OrderActions } from '../actions/index';
import { ORDER_FEATURE, StateWithOrder } from '../order-state';
import * as fromOrderDetailsEffect from './order-details.effect';

const mockOrderDetails: Order = {};

const mockOrderDetailsParams = {
  userId: 'user15355363988711@ydev.hybris.com',
  orderCode: '00000386',
};

const mockCancelOrderParams = {
  userId: 'user15355363988711@ydev.hybris.com',
  orderCode: '00000386',
  cancelRequestInput: {},
};

class MockGlobalMessageService {
  add(): void {}
}

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

class MockUserIdService implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of('testUserId');
  }
}

describe('Order Details effect', () => {
  let orderDetailsEffect: fromOrderDetailsEffect.OrderDetailsEffect;
  let orderHistoryConnector: OrderHistoryConnector;
  let actions$: Observable<any>;
  let store: Store<StateWithOrder>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ORDER_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        OrderHistoryConnector,
        fromOrderDetailsEffect.OrderDetailsEffect,
        { provide: OrderHistoryAdapter, useValue: {} },
        { provide: UserIdService, useClass: MockUserIdService },
        provideMockActions(() => actions$),
        { provide: LoggerService, useClass: MockLoggerService },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });

    actions$ = TestBed.inject(Actions);
    orderDetailsEffect = TestBed.inject(
      fromOrderDetailsEffect.OrderDetailsEffect
    );
    orderHistoryConnector = TestBed.inject(OrderHistoryConnector);
    store = TestBed.inject(Store);
  });

  describe('loadOrderDetails$', () => {
    it('should load order details', () => {
      spyOn(orderHistoryConnector, 'get').and.returnValue(of(mockOrderDetails));
      const action = new OrderActions.LoadOrderDetails(mockOrderDetailsParams);

      const completion = new OrderActions.LoadOrderDetailsSuccess(
        mockOrderDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.loadOrderDetails$).toBeObservable(expected);
    });

    it('should handle failures for load order details', () => {
      spyOn(orderHistoryConnector, 'get').and.returnValue(throwError('Error'));

      const action = new OrderActions.LoadOrderDetails(mockOrderDetailsParams);

      const completion = new OrderActions.LoadOrderDetailsFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.loadOrderDetails$).toBeObservable(expected);
    });
  });

  describe('cancelOrder$', () => {
    it('should cancel an order', () => {
      spyOn(orderHistoryConnector, 'cancel').and.returnValue(of({}));

      const action = new OrderActions.CancelOrder(mockCancelOrderParams);

      const completion = new OrderActions.CancelOrderSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.cancelOrder$).toBeObservable(expected);
    });

    it('should handle failures for cancel an order', () => {
      spyOn(orderHistoryConnector, 'cancel').and.returnValue(
        throwError('Error')
      );

      const action = new OrderActions.CancelOrder(mockCancelOrderParams);

      const completion = new OrderActions.CancelOrderFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.cancelOrder$).toBeObservable(expected);
    });
  });

  describe('resetOrderDetails$', () => {
    it('should reload order details', () => {
      const mockOrder = { code: 'testOrder' };
      spyOn(orderHistoryConnector, 'get').and.returnValue(of(mockOrder));

      store.dispatch(new OrderActions.LoadOrderDetailsSuccess(mockOrder));

      const action = new SiteContextActions.CurrencyChange({
        previous: 'previous',
        current: 'current',
      });

      const resetOrderDetailsAction = new OrderActions.LoadOrderDetailsSuccess(
        mockOrder
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: resetOrderDetailsAction });

      expect(orderDetailsEffect.resetOrderDetails$).toBeObservable(expected);
    });
  });
});
