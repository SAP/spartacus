import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import * as fromOrderDetailsEffect from './order-details.effect';
import * as fromOrderDetailsAction from '../actions/order-details.action';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { Order } from '../../../model/order.model';
import { OrderConnector } from '../../connectors/order/order.connector';
import { OrderAdapter } from '../../connectors/order/order.adapter';

const mockOrderDetails: Order = {};

const mockOrderDetailsParams = {
  userId: 'user15355363988711@ydev.hybris.com',
  orderCode: '00000386',
};

describe('Order Details effect', () => {
  let orderDetailsEffect: fromOrderDetailsEffect.OrderDetailsEffect;
  let orderConnector: OrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromOrderDetailsEffect.OrderDetailsEffect,
        { provide: OrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.get(Actions);
    orderDetailsEffect = TestBed.get(fromOrderDetailsEffect.OrderDetailsEffect);
    orderConnector = TestBed.get(OrderConnector);
  });

  describe('loadOrderDetails$', () => {
    it('should load order details', () => {
      spyOn(orderConnector, 'get').and.returnValue(of(mockOrderDetails));
      const action = new fromOrderDetailsAction.LoadOrderDetails(
        mockOrderDetailsParams
      );

      const completion = new fromOrderDetailsAction.LoadOrderDetailsSuccess(
        mockOrderDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.loadOrderDetails$).toBeObservable(expected);
    });

    it('should handle failures for load order details', () => {
      spyOn(orderConnector, 'get').and.returnValue(throwError('Error'));

      const action = new fromOrderDetailsAction.LoadOrderDetails(
        mockOrderDetailsParams
      );

      const completion = new fromOrderDetailsAction.LoadOrderDetailsFail(
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(orderDetailsEffect.loadOrderDetails$).toBeObservable(expected);
    });
  });
});
