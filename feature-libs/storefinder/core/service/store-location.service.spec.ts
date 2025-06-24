import { inject, TestBed } from '@angular/core/testing';
import { PointOfService } from '@spartacus/core';
import { StoreLocationService } from './store-location.service';

const location: PointOfService = {
  geoPoint: {
    latitude: 35.528984,
    longitude: 139.700168,
  },
};

describe('StoreLocationService', () => {
  let service: StoreLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreLocationService],
    });
    service = TestBed.inject(StoreLocationService);
  });

  it('should inject StoreLocationService', inject(
    [StoreLocationService],
    (storeLocationService: StoreLocationService) => {
      expect(storeLocationService).toBeTruthy();
    }
  ));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return store latitude', () => {
    expect(service.getStoreLatitude(location)).toBe(35.528984);
  });

  it('should return store longitude', () => {
    expect(service.getStoreLongitude(location)).toBe(139.700168);
  });

  it('should return url for navigation', () => {
    expect(service.getDirections(location)).toBe(
      'https://www.google.com/maps/dir/Current+Location/35.528984,139.700168'
    );
  });
});
