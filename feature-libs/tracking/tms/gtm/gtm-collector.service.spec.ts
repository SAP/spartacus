import { TestBed } from '@angular/core/testing';
import { LoginEvent } from '@spartacus/core';
import { TmsCollectorConfig, WindowObject } from '@spartacus/tracking/tms/core';
import { GtmCollectorService } from './gtm-collector.service';

const config: TmsCollectorConfig = {};
describe('GtmCollectorService', () => {
  let service: GtmCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtmCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should initialize the data layer properly', () => {
      const windowObject: WindowObject = {
        ...window,
      };
      expect(windowObject.dataLayer).toBeFalsy();
      service.init(config, windowObject);
      expect(windowObject.dataLayer).toEqual([]);
    });
  });

  describe('pushEvent', () => {
    it('should push the given event to the data layer', () => {
      const windowObject: WindowObject = {
        ...window,
      };
      const event = new LoginEvent();

      service.init(config, windowObject);
      service.pushEvent(config, windowObject, event);

      expect(windowObject.dataLayer).toEqual([event]);
    });
  });
});
