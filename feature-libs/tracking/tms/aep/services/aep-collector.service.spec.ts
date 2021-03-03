import { TestBed } from '@angular/core/testing';
import { LoginEvent } from '@spartacus/core';
import { TmsCollectorConfig, WindowObject } from '@spartacus/tracking/tms/core';
import { AepCollectorService } from './aep-collector.service';

const config: TmsCollectorConfig = {};

describe('AepCollectorService', () => {
  let service: AepCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AepCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should initialize the data layer properly', () => {
      const windowObject = {} as WindowObject;
      expect(windowObject.digitalData).toBeFalsy();
      service.init(config, windowObject);
      expect(windowObject.digitalData).toEqual({});
    });
  });

  describe('pushEvent', () => {
    it('should push the given event to the data layer', () => {
      const event = new LoginEvent();

      const windowObject = {} as WindowObject;
      service.init(config, windowObject);
      service.pushEvent(config, windowObject, event);

      expect(windowObject.digitalData).toEqual({ ...event });
    });
  });
});
