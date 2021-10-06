import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { Order } from '../../../model/order.model';
import { UserOrderAdapter } from '../../connectors/order/user-order.adapter';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';
import * as fromOrderDetailsEffect from './order-details.effect';
import { GlobalMessageService } from '@spartacus/core';

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
  let orderConnector: UserOrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromOrderDetailsEffect.OrderDetailsEffect,
        { provide: UserOrderAdapter, useValue: {} },
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
    orderConnector = TestBed.inject(UserOrderConnector);
  });

  describe('loadOrderDetails$', () => {
    it('should load order details', () => {
      spyOn(orderConnector, 'get').and.returnValue(of(mockOrderDetails));
      const action = new UserActions.LoadOrderDetails(mockOrderDetailsParams);

      const completion = new UserActions.LoadOrderDetailsSuccess(
        mockOrderDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.loadOrderDetails$).toBeObservable(expected);
    });

    it('should handle failures for load order details', () => {
      spyOn(orderConnector, 'get').and.returnValue(throwError('Error'));

      const action = new UserActions.LoadOrderDetails(mockOrderDetailsParams);

      const completion = new UserActions.LoadOrderDetailsFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.loadOrderDetails$).toBeObservable(expected);
    });
  });

  describe('cancelOrder$', () => {
    it('should cancel an order', () => {
      spyOn(orderConnector, 'cancel').and.returnValue(of({}));

      const action = new UserActions.CancelOrder(mockCancelOrderParams);

      const completion = new UserActions.CancelOrderSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.cancelOrder$).toBeObservable(expected);
    });

    it('should handle failures for cancel an order', () => {
      spyOn(orderConnector, 'cancel').and.returnValue(throwError('Error'));

      const action = new UserActions.CancelOrder(mockCancelOrderParams);

      const completion = new UserActions.CancelOrderFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.cancelOrder$).toBeObservable(expected);
    });
  });
});
