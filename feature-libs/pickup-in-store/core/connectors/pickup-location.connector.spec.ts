import { TestBed } from '@angular/core/testing';
import { PickupLocationAdapter } from './pickup-location.adapter';
import { PickupLocationConnector } from './pickup-location.connector';
import createSpy = jasmine.createSpy;

describe('PickupLocationConnector', () => {
  let service: PickupLocationConnector;
  let adapter: PickupLocationAdapter;

  const MockPickupLocationAdapter = {
    getStoreDetails: createSpy(),
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

  it('getStoreDetails should call getStoreDetails on the adapter', () => {
    service.getStoreDetails('storeName');
    expect(adapter.getStoreDetails).toHaveBeenCalledWith('storeName');
  });
});
