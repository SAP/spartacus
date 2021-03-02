import { TestBed } from '@angular/core/testing';
import { LoginEvent, ScriptLoader } from '@spartacus/core';
import { TmsCollectorConfig, WindowObject } from '@spartacus/tracking/tms/core';
import { GtmCollectorService } from './gtm-collector.service';

class MockScriptLoader implements Partial<ScriptLoader> {
  embedScript(_options: object): void {}
}

const scriptName = 'xxx.js?id=xxx';
const config: TmsCollectorConfig = {
  script: { url: scriptName },
};

describe('GtmCollectorService', () => {
  let service: GtmCollectorService;
  let scriptLoader: ScriptLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ScriptLoader, useClass: MockScriptLoader }],
    });
    service = TestBed.inject(GtmCollectorService);
    scriptLoader = TestBed.inject(ScriptLoader);
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
      spyOn(scriptLoader, 'embedScript').and.stub();
      const windowObject = {} as WindowObject;
      service.init(config, windowObject);
      expect(scriptLoader.embedScript).toHaveBeenCalledTimes(1);
      expect(scriptLoader.embedScript).toHaveBeenCalledWith({
        src: `${scriptName}&l=dataLayer`,
      });
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
