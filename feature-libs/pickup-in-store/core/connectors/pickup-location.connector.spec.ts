import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CartModification } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

import { PickupLocationAdapter } from './pickup-location.adapter';
import { PickupLocationConnector } from './pickup-location.connector';
import createSpy = jasmine.createSpy;

export class MockPickupLocationConnector {
  getStoreDetails(_storeName: string): Observable<PointOfService> {
    return of({});
  }
  setPickupOptionToDelivery(
    _cartId: string,
    _entryNumber: number,
    _userId: string,
    _requestPayload: any
  ): Observable<CartModification> {
    return of({});
  }
  setPickupOptionToPickupInStore(
    _cartId: string,
    _entryNumber: number,
    _userId: string,
    _requestPayload: any
  ): Observable<CartModification> {
    return of({});
  }
}

export class MockPickupLocationConnectorWithError {
  getStoreDetails(_storeName: string): Observable<PointOfService> {
    const error = new HttpErrorResponse({ error: 'error' });
    return new Observable((subscriber) => subscriber.error(error));
  }
}

class MockPickupLocationAdapter implements PickupLocationAdapter {
  getStoreDetails = createSpy();
  setPickupOptionToDelivery = createSpy();
  setPickupOptionToPickupInStore = createSpy();
}

const cartId = 'cartId';
const entryNumber = 0;
const userId = 'userId';
const quantity = 1;
const storeName = 'storeName';
const productCode = 'productCode';

describe('PickupLocationConnector', () => {
  let service: PickupLocationConnector;
  let adapter: PickupLocationAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PickupLocationAdapter, useClass: MockPickupLocationAdapter },
      ],
    });

    service = TestBed.inject(PickupLocationConnector);
    adapter = TestBed.inject(PickupLocationAdapter);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getStoreDetails from connector should call adapter getStoreDetails', () => {
    service.getStoreDetails('storeName');
    expect(adapter.getStoreDetails).toHaveBeenCalledWith('storeName');
  });

  it('setPickupOptionToDelivery from connector should call adapter setPickupOptionToDelivery', () => {
    service.setPickupOptionToDelivery(
      cartId,
      entryNumber,
      userId,
      productCode,
      quantity
    );
    expect(adapter.setPickupOptionToDelivery).toHaveBeenCalledWith(
      cartId,
      entryNumber,
      userId,
      productCode,
      quantity
    );
  });

  it('setPickupOptionToPickupInStore from connector should call adapter setPickupOptionToPickupInStore', () => {
    service.setPickupOptionToPickupInStore(
      cartId,
      entryNumber,
      userId,
      storeName,
      quantity
    );
    expect(adapter.setPickupOptionToPickupInStore).toHaveBeenCalledWith(
      cartId,
      entryNumber,
      userId,
      storeName,
      quantity
    );
  });
});
