import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoggerService, normalizeHttpError, OccConfig } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OrderHistoryAdapter, OrderHistoryConnector } from '../../connectors';
import { OrderActions } from '../actions';
import { ConsignmentTrackingByIdEffects } from './consignment-tracking-by-id.effect';
const mockTracking: ConsignmentTracking = { trackingID: 'track1' };

const mockTrackingParams = {
  userId: 'user',
  orderCode: 'order1',
  consignmentCode: 'cons1',
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
describe('Consignment Tracking By Id effect', () => {
  let effect: ConsignmentTrackingByIdEffects;
  let orderHistoryConnector: OrderHistoryConnector;
  let actions$: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderHistoryConnector,
        ConsignmentTrackingByIdEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: OrderHistoryAdapter, useValue: {} },
        provideMockActions(() => actions$),
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    actions$ = TestBed.inject(Actions);
    effect = TestBed.inject(ConsignmentTrackingByIdEffects);
    orderHistoryConnector = TestBed.inject(OrderHistoryConnector);
  });

  describe('loadConsignmentTrackingById$', () => {
    it('should load consignment tracking by id', () => {
      spyOn(orderHistoryConnector, 'getConsignmentTracking').and.returnValue(
        of(mockTracking)
      );
      const action = new OrderActions.LoadConsignmentTrackingById(
        mockTrackingParams
      );

      const completion = new OrderActions.LoadConsignmentTrackingByIdSuccess({
        orderCode: mockTrackingParams.orderCode,
        consignmentCode: mockTrackingParams.consignmentCode,
        consignmentTracking: mockTracking,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effect.loadConsignmentTrackingById$).toBeObservable(expected);
    });

    it('should handle failures for load consignment tracking by id', () => {
      spyOn(orderHistoryConnector, 'getConsignmentTracking').and.returnValue(
        throwError('Error')
      );

      const action = new OrderActions.LoadConsignmentTrackingById(
        mockTrackingParams
      );

      const completion = new OrderActions.LoadConsignmentTrackingByIdFail({
        orderCode: mockTrackingParams.orderCode,
        consignmentCode: mockTrackingParams.consignmentCode,
        error: normalizeHttpError('Error', new MockLoggerService()),
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadConsignmentTrackingById$).toBeObservable(expected);
    });
  });
});
