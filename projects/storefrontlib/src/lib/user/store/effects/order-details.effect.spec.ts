import { OccConfig } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import * as fromOrderDetailsEffect from './order-details.effect';
import * as fromOrderDetailsAction from '../actions/order-details.action';
import { OccOrderService } from '../../../occ/order/order.service';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { ProductImageConverterService } from '@spartacus/core';

const mockOrderDetails = {
  order: {}
};

const mockOrderDetailsParams = {
  userId: 'user15355363988711@ydev.hybris.com',
  orderCode: '00000386'
};

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: ''
  }
};

describe('Order Details effect', () => {
  let orderDetailsEffect: fromOrderDetailsEffect.OrderDetailsEffect;
  let orderService: OccOrderService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrderService,
        fromOrderDetailsEffect.OrderDetailsEffect,
        ProductImageConverterService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$)
      ]
    });

    actions$ = TestBed.get(Actions);
    orderDetailsEffect = TestBed.get(fromOrderDetailsEffect.OrderDetailsEffect);
    orderService = TestBed.get(OccOrderService);
  });

  describe('loadOrderDetails$', () => {
    it('should load order details', () => {
      spyOn(orderService, 'getOrder').and.returnValue(of(mockOrderDetails));
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
      spyOn(orderService, 'getOrder').and.returnValue(throwError('Error'));

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
