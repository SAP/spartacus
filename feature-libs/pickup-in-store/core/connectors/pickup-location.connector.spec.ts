import { TestBed } from '@angular/core/testing';

import { PickupLocationAdapter } from './pickup-location.adapter';
import { PickupLocationConnector } from './pickup-location.connector';
import createSpy = jasmine.createSpy;

describe('Pickup Location Connector', () => {
  let service: PickupLocationConnector;
  let adapter: PickupLocationAdapter;

  const MockStockAdapter = {
    getStoreDetails: createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: PickupLocationAdapter, useValue: MockStockAdapter },
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
});
