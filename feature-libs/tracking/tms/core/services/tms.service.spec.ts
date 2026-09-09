import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  CxEvent,
  EventService,
  LoginEvent,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { vi } from 'vitest';
import { TmsCollectorConfig, TmsConfig } from '../config/tms-config';
import { TmsCollector, WindowObject } from '../model/tms.model';
import { TmsService } from './tms.service';

const loginEvent = createFrom(LoginEvent, {});
class GtmCollectorMock implements Partial<TmsCollector> {
  init(_config: TmsCollectorConfig, _windowObject: WindowObject): void {}
  pushEvent<T extends CxEvent>(
    _config: TmsCollectorConfig,
    _windowObject: WindowObject,
    _event: T | any
  ): void {}
  map<T extends CxEvent>(event: T): T | object {
    return event;
  }
}
class AepCollectorMock extends GtmCollectorMock {}
class WindowObjectMock {
  isBrowser(): boolean {
    return true;
  }
}

class MockEventService {
  get(): Observable<LoginEvent> {
    return of(loginEvent);
  }
}

const tmsConfig: TmsConfig = {
  tagManager: {
    gtm: {
      collector: GtmCollectorMock,
      events: [LoginEvent],
    },
    aep: {
      collector: AepCollectorMock,
      events: [LoginEvent],
    },
  },
};

describe('TmsService', () => {
  let service: TmsService;
  let gtmCollector: GtmCollectorMock;
  let aepCollector: AepCollectorMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TmsConfig, useValue: tmsConfig },
        { provide: EventService, useClass: MockEventService },
        { provide: WindowRef, useClass: WindowObjectMock },
        GtmCollectorMock,
        AepCollectorMock,
      ],
    });

    service = TestBed.inject(TmsService);
    gtmCollector = TestBed.inject(GtmCollectorMock);
    aepCollector = TestBed.inject(AepCollectorMock);

    vi.spyOn(gtmCollector, 'init');
    vi.spyOn(gtmCollector, 'map');
    vi.spyOn(gtmCollector, 'pushEvent');
    vi.spyOn(aepCollector, 'init');
    vi.spyOn(aepCollector, 'map');
    vi.spyOn(aepCollector, 'pushEvent');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the init function', () => {
    service.collect();
    expect(gtmCollector.init).toHaveBeenCalledWith(
      tmsConfig.tagManager.gtm,
      undefined
    );
    expect(aepCollector.init).toHaveBeenCalledWith(
      tmsConfig.tagManager.aep,
      undefined
    );
  });

  it('should invoke the pushEvent function', () => {
    service.collect();
    expect(gtmCollector.pushEvent).toHaveBeenCalledWith(
      tmsConfig.tagManager.gtm,
      undefined,
      loginEvent
    );
    expect(aepCollector.pushEvent).toHaveBeenCalledWith(
      tmsConfig.tagManager.aep,
      undefined,
      loginEvent
    );
  });
});
