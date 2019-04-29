import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import * as fromTrackingEffect from './consignment-tracking.effect';
import * as fromTrackingAction from '../actions/consignment-tracking.action';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { OccOrderService } from '../../occ/index';
import { OccConfig } from '../../../occ/config/occ-config';
import { ConsignmentTracking } from '../../model/consignment-tracking.model';

const mockTracking: ConsignmentTracking = {};

const mockTrackingParams = {
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

  site: {
    baseSite: '',
  },
};

describe('Consignment Tracking effect', () => {
  let trackingEffect: fromTrackingEffect.ConsignmentTrackingEffect;
  let orderService: OccOrderService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrderService,
        fromTrackingEffect.ConsignmentTrackingEffect,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.get(Actions);
    trackingEffect = TestBed.get(fromTrackingEffect.ConsignmentTrackingEffect);
    orderService = TestBed.get(OccOrderService);
  });

  describe('loadConsignmentTracking$', () => {
    it('should load consignment tracking', () => {
      spyOn(orderService, 'getConsignmentTracking').and.returnValue(
        of(mockTracking)
      );
      const action = new fromTrackingAction.LoadConsignmentTracking(
        mockTrackingParams
      );

      const completion = new fromTrackingAction.LoadConsignmentTrackingSuccess(
        mockTracking
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(trackingEffect.loadConsignmentTracking$).toBeObservable(expected);
    });

    it('should handle failures for load consignment tracking', () => {
      spyOn(orderService, 'getConsignmentTracking').and.returnValue(
        throwError('Error')
      );

      const action = new fromTrackingAction.LoadConsignmentTracking(
        mockTrackingParams
      );

      const completion = new fromTrackingAction.LoadConsignmentTrackingFail(
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(trackingEffect.loadConsignmentTracking$).toBeObservable(expected);
    });
  });
});
