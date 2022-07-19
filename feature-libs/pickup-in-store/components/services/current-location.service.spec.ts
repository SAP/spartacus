import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { CurrentLocationService } from './current-location.service';

export const MockWindowRef = {
  nativeWindow: {
    navigator: {
      geolocation: {
        getCurrentPosition: (
          successCallback: PositionCallback,
          _errorCallback?: PositionErrorCallback | null,
          _options?: PositionOptions
        ) =>
          successCallback({
            coords: {
              latitude: 0,
              longitude: 0,
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              speed: 0,
            },
            timestamp: 0,
          }),
      },
    },
  },
};

describe('CurrentLocationService', () => {
  let service: CurrentLocationService;
  let windowRef: WindowRef;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      providers: [
        CurrentLocationService,
        {
          provide: WindowRef,
          useValue: MockWindowRef,
        },
      ],
    });

  const injectProviders = () => {
    service = TestBed.inject(CurrentLocationService);
    windowRef = TestBed.inject(WindowRef);
  };

  describe('with native window', () => {
    beforeEach(() => {
      configureTestingModule();
      injectProviders();
    });

    it('should get the current location from the browser API', () => {
      spyOn(
        (windowRef.nativeWindow as Window).navigator.geolocation,
        'getCurrentPosition'
      ).and.callThrough();

      const successCallback: PositionCallback = jasmine.createSpy();
      const errorCallback: PositionErrorCallback = () => {};
      const options: PositionOptions = {};

      service.getCurrentLocation(successCallback, errorCallback, options);

      expect(
        (windowRef.nativeWindow as Window).navigator.geolocation
          .getCurrentPosition
      ).toHaveBeenCalledWith(successCallback, errorCallback, options);
      expect(successCallback).toHaveBeenCalled();
    });
  });

  describe('without native window', () => {
    beforeEach(() => {
      configureTestingModule().overrideProvider(WindowRef, { useValue: {} });
      injectProviders();
    });

    it('should do nothing if the native window is undefined', () => {
      const successCallback: PositionCallback = jasmine.createSpy();
      const errorCallback: PositionErrorCallback = () => {};
      const options: PositionOptions = {};

      service.getCurrentLocation(successCallback, errorCallback, options);
      expect(successCallback).not.toHaveBeenCalled();
    });
  });
});

export class MockCurrentLocationService {
  getCurrentLocation(
    successCallback: PositionCallback,
    errorCallback?: PositionErrorCallback | null,
    options?: PositionOptions
  ): void {
    MockWindowRef.nativeWindow.navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }
}
