import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoggerService, OccConfig } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderHistoryAdapter } from '../../connectors/order-history.adapter';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
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

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('Consignment Tracking effect', () => {
  let trackingEffect: ConsignmentTrackingEffects;
  let orderHistoryConnector: OrderHistoryConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderHistoryConnector,
        ConsignmentTrackingEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: OrderHistoryAdapter, useValue: {} },
        provideMockActions(() => actions$),
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });

    actions$ = TestBed.inject(Actions);
    trackingEffect = TestBed.inject(ConsignmentTrackingEffects);
    orderHistoryConnector = TestBed.inject(OrderHistoryConnector);
  });

  describe('loadConsignmentTracking$', () => {
    it('should load consignment tracking', () => {
      spyOn(orderHistoryConnector, 'getConsignmentTracking').and.returnValue(
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
      spyOn(orderHistoryConnector, 'getConsignmentTracking').and.returnValue(
        throwError(() => 'Error')
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
