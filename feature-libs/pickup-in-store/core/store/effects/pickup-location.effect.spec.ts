import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { normalizeHttpError, PointOfService } from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import { PickupLocationConnector } from '../../connectors';
import {
  GetStoreDetailsById,
  SetStoreDetailsFailure,
  SetStoreDetailsSuccess,
} from '../actions/pickup-location.action';
import { PickupLocationEffect } from './pickup-location.effect';
import { cold, hot } from 'jasmine-marbles';
import { HttpErrorResponse } from '@angular/common/http';
class MockPickupLocationConnector {
  getStoreDetails = (_storeName: string): Observable<PointOfService> => of({});
}
describe('PickupLocationEffect', () => {
  let pickupLocationEffects: PickupLocationEffect;
  let actions$: Observable<any>;
  let pickupLocationConnector: PickupLocationConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],

      providers: [
        {
          provide: PickupLocationConnector,
          useClass: MockPickupLocationConnector,
        },
        PickupLocationEffect,

        provideMockActions(() => actions$),
      ],
    });

    pickupLocationEffects = TestBed.inject(PickupLocationEffect);
    pickupLocationConnector = TestBed.inject(PickupLocationConnector);
  });
  it('should call the connector on the get store details action and create a success action', () => {
    spyOn(pickupLocationConnector, 'getStoreDetails').and.callThrough();
    const action = GetStoreDetailsById({ payload: 'storeName' });
    const actionSuccess = SetStoreDetailsSuccess({ payload: {} });
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(pickupLocationEffects.storeDetails$).toBeObservable(expected);
    expect(pickupLocationConnector.getStoreDetails).toHaveBeenCalledWith(
      'storeName'
    );
  });
  it('should call the connector on the get store details action and create a failure action', () => {
    const error = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: 'Error',
    });
    spyOn(pickupLocationConnector, 'getStoreDetails').and.returnValue(
      throwError(error)
    );
    const action = GetStoreDetailsById({ payload: 'storeName' });
    const actionFailure = SetStoreDetailsFailure({
      payload: normalizeHttpError(error),
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionFailure });
    expect(pickupLocationEffects.storeDetails$).toBeObservable(expected);
  });
});
