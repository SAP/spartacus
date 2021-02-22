import { TestBed } from '@angular/core/testing';
import { LoginEvent } from '@spartacus/core';
import { TmsCollectorConfig, WindowObject } from '@spartacus/tracking/tms/core';
import { GaCollectorService } from './ga-collector.service';

const config: TmsCollectorConfig = {};

describe('GaCollectorService', () => {
  let service: GaCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should initialize the data layer properly', () => {
      const windowObject = {} as WindowObject;
      expect(windowObject.dataLayer).toBeFalsy();
      expect(windowObject.gtag).toBeFalsy();

      service.init(config, windowObject);
      expect(windowObject.dataLayer).toEqual([]);
      expect(windowObject.gtag).toBeTruthy();
    });
  });

  describe('pushEvent', () => {
    it('should push the given event to the data layer', () => {
      const event = new LoginEvent();

      const windowObject = {} as WindowObject;
      service.init(config, windowObject);
      service.pushEvent(config, windowObject, event);

      expect(windowObject.dataLayer[0][0]).toEqual(event);
    });
  });
});
