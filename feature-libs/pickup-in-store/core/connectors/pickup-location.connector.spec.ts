import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PointOfService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

import { PickupLocationAdapter } from './pickup-location.adapter';
import { PickupLocationConnector } from './pickup-location.connector';
import createSpy = jasmine.createSpy;

export class MockPickupLocationConnector {
  getStoreDetails(_storeName: string): Observable<PointOfService> {
    return of({});
  }
  setPickupOptionDelivery(
    _cartId: string,
    _entryNumber: number,
    _userId: string,
    _requestPayload: any
  ): Observable<any> {
    return of({});
  }
  setPickupOptionInStore(
    _cartId: string,
    _entryNumber: number,
    _userId: string,
    _requestPayload: any
  ): Observable<any> {
    return of({});
  }
}

export class MockPickupLocationConnectorWithError {
  getStoreDetails(_storeName: string): Observable<PointOfService> {
    const error = new HttpErrorResponse({ error: 'error' });
    return new Observable((subscriber) => subscriber.error(error));
  }
}

describe('Pickup Location Connector', () => {
  let service: PickupLocationConnector;
  let adapter: PickupLocationAdapter;

  const MockPickupLocationAdapter = {
    getStoreDetails: createSpy(),
    setDeliveryOption: createSpy(),
    setPickupOptionInStore: createSpy(),
    setPickupOptionDelivery: createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: PickupLocationAdapter, useValue: MockPickupLocationAdapter },
      ],
    });

    service = TestBed.inject(PickupLocationConnector);
    adapter = TestBed.inject(PickupLocationAdapter);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getStoreDetails from connector should call adapter getStoreDetails ', () => {
    service.getStoreDetails('storeName');
    expect(adapter.getStoreDetails).toHaveBeenCalledWith('storeName');
  });
  it('setPickupOptionInStore from connector should call adapter setPickupOptionInStore ', () => {
    const name = 'storeName';
    const quantity = 1;

    service.setPickupOptionInStore('cartId', 1, 'userId', name, quantity);
    expect(adapter.setPickupOptionInStore).toHaveBeenCalledWith(
      'cartId',
      1,
      'userId',
      name,
      quantity
    );
  });

  it('setPickupOptionDelivery from connector should call adapter setPickupOptionDelivery ', () => {
    const name = 'storeName';

    const productCode = 'productCode';

    const quantity = 1;

    const cartId = 'cartID';
    const entryNumber = 1;
    const userId = 'userID';

    service.setPickupOptionDelivery(
      cartId,
      entryNumber,
      userId,
      name,
      productCode,
      quantity
    );
    expect(adapter.setPickupOptionDelivery).toHaveBeenCalledWith(
      cartId,
      entryNumber,
      userId,
      name,
      productCode,
      quantity
    );
  });
});
