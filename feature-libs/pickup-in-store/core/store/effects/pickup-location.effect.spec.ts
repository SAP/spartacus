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
  MockPickupLocationConnector,
  MockPickupLocationConnectorWithError,
} from '../../connectors/pickup-location.connector.spec';
import {
  DeliveryModeSetPickupOptionToDeliverySuccess,
  GetStoreDetailsById,
  SetPickupOptionToDelivery,
  SetPickupOptionToDeliverySuccess,
  SetPickupOptionToPickupInStore,
  SetPickupOptionToPickupInStoreSuccess,
  SetStoreDetailsFailure,
  SetStoreDetailsSuccess,
} from '../actions/pickup-location.action';
import { PickupLocationEffect } from './pickup-location.effect';

const cartId = 'cartId';
const entryNumber = 1;
const userId = 'userId';
const productCode = 'code';
const storeName = 'storeName';
const quantity = 1;

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

  it('should call the connection on the SET_PICKUP_OPTION_TO_DELIVERY action and create SetPickupOptionDeliverySuccess action', () => {
    spyOn(
      pickupLocationConnector,
      'setPickupOptionToDelivery'
    ).and.callThrough();
    const action = SetPickupOptionToDelivery({
      payload: { cartId, entryNumber, userId, productCode, quantity },
    });
    const actionSuccess = SetPickupOptionToDeliverySuccess();
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(pickupLocationEffects.setPickupOptionToDelivery$).toBeObservable(
      expected
    );
  });

  it('should call the connection on the SET_PICKUP_OPTION_TO_DELIVERY action and create DeliveryModeSetPickupOptionToDeliverySuccess action', () => {
    spyOn(
      pickupLocationConnector,
      'setPickupOptionToDelivery'
    ).and.callThrough();
    const action = SetPickupOptionToDelivery({
      payload: {
        cartId,
        entryNumber,
        userId,
        productCode,
        quantity,
        page: 'CheckoutDeliveryMode',
      },
    });
    const actionSuccess = DeliveryModeSetPickupOptionToDeliverySuccess();
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(pickupLocationEffects.setPickupOptionToDelivery$).toBeObservable(
      expected
    );
  });

  it('should call the connection on the SET_PICKUP_OPTION_TO_PICKUP_IN_STORE action and create SetPickupOptionInStoreSuccess action', () => {
    spyOn(
      pickupLocationConnector,
      'setPickupOptionToPickupInStore'
    ).and.callThrough();
    const action = SetPickupOptionToPickupInStore({
      payload: { cartId, entryNumber, userId, storeName, quantity },
    });
    const actionSuccess = SetPickupOptionToPickupInStoreSuccess();
    actions$ = hot('-a', { a: action });
    const expected = cold('-(b)', { b: actionSuccess });
    expect(
      pickupLocationEffects.setPickupOptionToPickupInStore$
    ).toBeObservable(expected);
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
