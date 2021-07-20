import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import { OccConfig } from '../../../occ/config/occ-config';
import { UserOrderAdapter } from '../../connectors/order/user-order.adapter';
import { UserOrderConnector } from '../../connectors/order/user-order.connector';
import { UserActions } from '../actions/index';
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
  let userOrderConnector: UserOrderConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConsignmentTrackingEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: UserOrderAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    trackingEffect = TestBed.inject(ConsignmentTrackingEffects);
    userOrderConnector = TestBed.inject(UserOrderConnector);
  });

  describe('loadConsignmentTracking$', () => {
    it('should load consignment tracking', () => {
      spyOn(userOrderConnector, 'getConsignmentTracking').and.returnValue(
        of(mockTracking)
      );
      const action = new UserActions.LoadConsignmentTracking(
        mockTrackingParams
      );

      const completion = new UserActions.LoadConsignmentTrackingSuccess(
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

      const action = new UserActions.LoadConsignmentTracking(
        mockTrackingParams
      );

      const completion = new UserActions.LoadConsignmentTrackingFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(trackingEffect.loadConsignmentTracking$).toBeObservable(expected);
    });
  });
});
