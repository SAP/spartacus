import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { CurrentLocationService } from './current-location.service';
import { MockWinRef } from 'core-libs/storefront/shared/test/mock-window-ref';

export class MockWindowRef extends MockWinRef {
  private _nativeWindow = {
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
              toJSON: () => {},
            } as GeolocationCoordinates,
            timestamp: 0,
            toJSON: () => {},
          } as GeolocationPosition),
      },
    },
  } as Window;
  override get nativeWindow(): Window {
    return this._nativeWindow;
  }
}

describe('CurrentLocationService', () => {
  let service: CurrentLocationService;
  let windowRef: WindowRef;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      providers: [
        CurrentLocationService,
        {
          provide: WindowRef,
          useClass: MockWindowRef,
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
      const getCurrentPosSpy = vi.spyOn(
        (windowRef.nativeWindow).navigator.geolocation,
        'getCurrentPosition'
      );

      const successCallback: PositionCallback = vi.fn();
      const errorCallback: PositionErrorCallback = () => {};
      const options: PositionOptions = {};

      service.getCurrentLocation(successCallback, errorCallback, options);

      expect(getCurrentPosSpy).toHaveBeenCalledWith(
        successCallback,
        errorCallback,
        options
      );
      expect(successCallback).toHaveBeenCalled();
    });
  });

  describe('without native window', () => {
    beforeEach(() => {
      configureTestingModule().overrideProvider(WindowRef, { useValue: {} });
      injectProviders();
    });

    it('should do nothing if the native window is undefined', () => {
      const successCallback: PositionCallback = vi.fn();
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
    (
      new MockWindowRef().nativeWindow as Window
    ).navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }
}
