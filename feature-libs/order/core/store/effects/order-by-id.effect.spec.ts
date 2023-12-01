import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  LoggerService,
  MockLoggerService,
  normalizeHttpError,
  OccConfig,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderHistoryAdapter, OrderHistoryConnector } from '../../connectors';
import { OrderActions } from '../actions';
import { OrderByIdEffect } from './order-by-id.effect';
const mockOrder: Order = { code: 'order1', status: 'shipped' };

const mockOrderParams = {
  userId: 'user',
  code: 'order1',
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('Order By Id effect', () => {
  let effect: OrderByIdEffect;
  let orderHistoryConnector: OrderHistoryConnector;
  let actions$: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderHistoryConnector,
        OrderByIdEffect,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: OrderHistoryAdapter, useValue: {} },
        provideMockActions(() => actions$),
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    actions$ = TestBed.inject(Actions);
    effect = TestBed.inject(OrderByIdEffect);
    orderHistoryConnector = TestBed.inject(OrderHistoryConnector);
  });

  describe('loadOrderById$', () => {
    it('should load order by id', () => {
      spyOn(orderHistoryConnector, 'get').and.returnValue(of(mockOrder));
      const action = new OrderActions.LoadOrderById(mockOrderParams);

      const completion = new OrderActions.LoadOrderByIdSuccess(mockOrder);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effect.loadOrderById$).toBeObservable(expected);
    });

    it('should handle failures for load order by id', () => {
      spyOn(orderHistoryConnector, 'get').and.returnValue(throwError('Error'));

      const action = new OrderActions.LoadOrderById(mockOrderParams);

      const completion = new OrderActions.LoadOrderByIdFail({
        code: mockOrderParams.code,
        error: normalizeHttpError('Error', new MockLoggerService()),
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadOrderById$).toBeObservable(expected);
    });
  });
});
