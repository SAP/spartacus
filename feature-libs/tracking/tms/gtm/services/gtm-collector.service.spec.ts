import { TestBed } from '@angular/core/testing';
import { LoginEvent, WindowRef } from '@spartacus/core';
import { WindowObject } from '@spartacus/tracking/tms/core';
import '../config/default-gtm.config';
import { GtmCollectorConfig } from '../config/default-gtm.config';
import { GtmCollectorService } from './gtm-collector.service';

const config: GtmCollectorConfig = {
  gtmId: 'xxx',
};

class MockWinRef {
  document = {
    getElementsByTagName(): object[] {
      return [{}];
    },
    createElement(): object {
      return {};
    },
  };
}

describe('GtmCollectorService', () => {
  let service: GtmCollectorService;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WindowRef, useClass: MockWinRef }],
    });
    service = TestBed.inject(GtmCollectorService);
    winRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should initialize the data layer properly', () => {
      const windowObject = {} as WindowObject;
      expect(windowObject.dataLayer).toBeFalsy();
      service.init(config, windowObject);
      expect(windowObject.dataLayer).toBeTruthy();
    });

    it('should push the default gtm.js event', () => {
      const windowObject = {} as WindowObject;
      service.init(config, windowObject);
      expect(windowObject.dataLayer.length).toEqual(1);
      expect(windowObject.dataLayer[0].event).toEqual('gtm.js');
    });

    it('should embed the script tag', () => {
      spyOn(winRef.document, 'getElementsByTagName').and.callThrough();
      spyOn(winRef.document, 'createElement').and.callThrough();
      const windowObject = {} as WindowObject;

      service.init(config, windowObject);

      expect(winRef.document.getElementsByTagName).toHaveBeenCalledWith(
        'script'
      );
      expect(winRef.document.createElement).toHaveBeenCalledWith('script');
    });
  });

  describe('pushEvent', () => {
    it('should push the given event to the data layer', () => {
      const event = new LoginEvent();

      const windowObject = {} as WindowObject;
      service.init(config, windowObject);
      service.pushEvent(config, windowObject, event);

      expect(windowObject.dataLayer.length).toEqual(2);
      expect(windowObject.dataLayer[1]).toEqual(event);
    });
  });
});
