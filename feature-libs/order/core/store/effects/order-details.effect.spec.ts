import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { GlobalMessageService, Order } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderAdapter } from '../../connectors/order.adapter';
import { OrderConnector } from '../../connectors/order.connector';
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
  let orderConnector: OrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderConnector,
        fromOrderDetailsEffect.OrderDetailsEffect,
        { provide: OrderAdapter, useValue: {} },
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
    orderConnector = TestBed.inject(OrderConnector);
  });

  describe('loadOrderDetails$', () => {
    it('should load order details', () => {
      spyOn(orderConnector, 'get').and.returnValue(of(mockOrderDetails));
      const action = new OrderActions.LoadOrderDetails(mockOrderDetailsParams);

      const completion = new OrderActions.LoadOrderDetailsSuccess(
        mockOrderDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.loadOrderDetails$).toBeObservable(expected);
    });

    it('should handle failures for load order details', () => {
      spyOn(orderConnector, 'get').and.returnValue(throwError('Error'));

      const action = new OrderActions.LoadOrderDetails(mockOrderDetailsParams);

      const completion = new OrderActions.LoadOrderDetailsFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.loadOrderDetails$).toBeObservable(expected);
    });
  });

  describe('cancelOrder$', () => {
    it('should cancel an order', () => {
      spyOn(orderConnector, 'cancel').and.returnValue(of({}));

      const action = new OrderActions.CancelOrder(mockCancelOrderParams);

      const completion = new OrderActions.CancelOrderSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.cancelOrder$).toBeObservable(expected);
    });

    it('should handle failures for cancel an order', () => {
      spyOn(orderConnector, 'cancel').and.returnValue(throwError('Error'));

      const action = new OrderActions.CancelOrder(mockCancelOrderParams);

      const completion = new OrderActions.CancelOrderFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.cancelOrder$).toBeObservable(expected);
    });
  });
});
