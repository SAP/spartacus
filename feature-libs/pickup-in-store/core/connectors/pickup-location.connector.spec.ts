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
}

export class MockPickupLocationConnectorWithError {
  getStoreDetails(_storeName: string): Observable<PointOfService> {
    const error = new HttpErrorResponse({ error: 'error' });
    return new Observable((subscriber) => subscriber.error(error));
  }
}

class MockPickupLocationAdapter implements PickupLocationAdapter {
  getStoreDetails = createSpy();
}

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
});
