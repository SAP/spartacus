import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { normalizeHttpError } from '@spartacus/core';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { PickupLocationConnector } from '../../connectors';
import {
  GetStoreDetailsById,
  SetStoreDetailsFailure,
  SetStoreDetailsSuccess,
  SetPickupOptionDelivery,
  SetPickupOptionDeliverySuccess,
  SetPickupOptionInStore,
  SetPickupOptionInStoreSuccess,
} from '../actions/pickup-location.action';
import { PickupLocationEffect } from './pickup-location.effect';
import {
  MockPickupLocationConnector,
  MockPickupLocationConnectorWithError,
} from '../../connectors/pickup-location.connector.spec';

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

  it('should call the connection on the GET_STORE_DETAILS action and create SetStoreDetailsSuccess action', () => {
    spyOn(pickupLocationConnector, 'getStoreDetails').and.callThrough();
    const action = GetStoreDetailsById({ payload: 'storeId' });
    const actionSuccess = SetStoreDetailsSuccess({ payload: {} });
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(pickupLocationEffects.storeDetails$).toBeObservable(expected);
  });

  it('should call the connection on the SET_PICKUP_OPTION_DELIVERY action and create SetPickupOptionDeliverySuccess action', () => {
    const cartId = 'cartId';
    const entryNumber = 1;
    const userId = 'userId';
    const name = '';
    const productCode = 'code';
    const quantity = 1;
    spyOn(pickupLocationConnector, 'setPickupOptionDelivery').and.callThrough();
    const action = SetPickupOptionDelivery({
      payload: { cartId, entryNumber, userId, name, productCode, quantity },
    });
    const actionSuccess = SetPickupOptionDeliverySuccess();
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(pickupLocationEffects.setPickupOptionDelivery$).toBeObservable(
      expected
    );
  });
  it('should call the connection on the SET_PICKUP_OPTION_In_Store action and create SetPickupOptionInStoreSuccess action', () => {
    const cartId = 'cartId';
    const entryNumber = 1;
    const userId = 'userId';
    const name = 'storeName';
    const quantity = 1;

    spyOn(pickupLocationConnector, 'setPickupOptionDelivery').and.callThrough();
    const action = SetPickupOptionInStore({
      payload: { cartId, entryNumber, userId, name, quantity },
    });
    const actionSuccess = SetPickupOptionInStoreSuccess();
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(pickupLocationEffects.setPickupOptionInStore$).toBeObservable(
      expected
    );
  });
});

describe('PickupLocationEffect with Error', () => {
  let pickupLocationEffects: PickupLocationEffect;
  let actions$: Observable<any>;
  let pickupLocationConnector: PickupLocationConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],

      providers: [
        {
          provide: PickupLocationConnector,
          useClass: MockPickupLocationConnectorWithError,
        },
        PickupLocationEffect,

        provideMockActions(() => actions$),
      ],
    });

    pickupLocationEffects = TestBed.inject(PickupLocationEffect);
    pickupLocationConnector = TestBed.inject(PickupLocationConnector);
  });

  it('should call the connection on the GET_STORE_DETAILS action and create SetStoreDetailsFailure action', () => {
    spyOn(pickupLocationConnector, 'getStoreDetails').and.callThrough();
    const action = GetStoreDetailsById({ payload: 'storeId' });
    const error = new HttpErrorResponse({ error: 'error' });

    const actionFailure = SetStoreDetailsFailure({
      payload: normalizeHttpError(error),
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionFailure });
    expect(pickupLocationEffects.storeDetails$).toBeObservable(expected);
  });
});
