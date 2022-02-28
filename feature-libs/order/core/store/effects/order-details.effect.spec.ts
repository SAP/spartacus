import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { GlobalMessageService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderHistoryAdapter } from '../../connectors/order-history.adapter';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';
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

describe('Order Details effect', () => {
  let orderDetailsEffect: fromOrderDetailsEffect.OrderDetailsEffect;
  let orderHistoryConnector: OrderHistoryConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderHistoryConnector,
        fromOrderDetailsEffect.OrderDetailsEffect,
        { provide: OrderHistoryAdapter, useValue: {} },
        provideMockActions(() => actions$),
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
});
