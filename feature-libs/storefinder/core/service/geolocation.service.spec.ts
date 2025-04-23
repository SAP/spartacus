import { inject, TestBed } from '@angular/core/testing';
import { PointOfService } from '@spartacus/core';
import { GeolocationService } from './geolocation.service';

const location: PointOfService = {
  geoPoint: {
    latitude: 35.528984,
    longitude: 139.700168,
  },
};

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationService],
    });
    service = TestBed.inject(GeolocationService);
  });

  it('should inject GeolocationService', inject(
    [GeolocationService],
    (geolocationService: GeolocationService) => {
      expect(geolocationService).toBeTruthy();
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
