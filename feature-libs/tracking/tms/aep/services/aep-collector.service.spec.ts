import { TestBed } from '@angular/core/testing';
import { LoginEvent, ScriptLoader } from '@spartacus/core';
import { WindowObject } from '@spartacus/tracking/tms/core';
import '../config/default-aep.config';
import { AepCollectorConfig } from '../config/default-aep.config';
import { AepCollectorService } from './aep-collector.service';

class MockScriptLoader implements Partial<ScriptLoader> {
  embedScript(_options: object): void {}
}

const scriptName = 'xxx.js';
const config: AepCollectorConfig = {
  scriptUrl: scriptName,
};

describe('AepCollectorService', () => {
  let service: AepCollectorService;
  let scriptLoader: ScriptLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ScriptLoader, useClass: MockScriptLoader }],
    });
    service = TestBed.inject(AepCollectorService);
    scriptLoader = TestBed.inject(ScriptLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should initialize the data layer properly', () => {
      const windowObject = {} as WindowObject;
      expect(windowObject.digitalData).toBeFalsy();
      service.init(config, windowObject);
      expect(windowObject.digitalData).toBeTruthy();
    });

    it('should embed the script tag', () => {
      spyOn(scriptLoader, 'embedScript').and.stub();
      const windowObject = {} as WindowObject;
      service.init(config, windowObject);
      expect(scriptLoader.embedScript).toHaveBeenCalledTimes(1);
      expect(scriptLoader.embedScript).toHaveBeenCalledWith({
        src: scriptName,
      });
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
