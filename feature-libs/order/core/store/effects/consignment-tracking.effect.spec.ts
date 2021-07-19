import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { OccConfig } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderAdapter } from '../../connectors/order.adapter';
import { OrderConnector } from '../../connectors/order.connector';
import { OrderActions } from '../actions/index';
import { ConsignmentTrackingEffects } from './consignment-tracking.effect';

const mockTracking: ConsignmentTracking = {};

const mockTrackingParams = {
  userId: '123',
  orderCode: '00000386',
  consignmentCode: 'a00000386',
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('Consignment Tracking effect', () => {
  let trackingEffect: ConsignmentTrackingEffects;
  let userOrderConnector: OrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderConnector,
        ConsignmentTrackingEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: OrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    trackingEffect = TestBed.inject(ConsignmentTrackingEffects);
    userOrderConnector = TestBed.inject(OrderConnector);
  });

  describe('loadConsignmentTracking$', () => {
    it('should load consignment tracking', () => {
      spyOn(userOrderConnector, 'getConsignmentTracking').and.returnValue(
        of(mockTracking)
      );
      const action = new OrderActions.LoadConsignmentTracking(
        mockTrackingParams
      );

      const completion = new OrderActions.LoadConsignmentTrackingSuccess(
        mockTracking
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(trackingEffect.loadConsignmentTracking$).toBeObservable(expected);
    });

    it('should handle failures for load consignment tracking', () => {
      spyOn(userOrderConnector, 'getConsignmentTracking').and.returnValue(
        throwError('Error')
      );

      const action = new OrderActions.LoadConsignmentTracking(
        mockTrackingParams
      );

      const completion = new OrderActions.LoadConsignmentTrackingFail(
        undefined
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(trackingEffect.loadConsignmentTracking$).toBeObservable(expected);
    });
  });
});
