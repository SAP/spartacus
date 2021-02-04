import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  CxEvent,
  EventService,
  LoginEvent,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { TmsConfig } from '../config/tms-config';
import { WindowLike } from '../model/tms.model';
import { TmsService } from './tms.service';

const event = createFrom(LoginEvent, {});
class MockEventService {
  get(): Observable<LoginEvent> {
    return of(event);
  }
}

const tmsConfig: TmsConfig = {
  tagManager: {
    gtm: {
      eventMapper: (event) => event,
      pushStrategy: <T extends CxEvent>(_event: T, _winLike: WindowLike) => {},
      debug: false,
      events: [LoginEvent],
    },
    aep: {
      eventMapper: (event) => event,
      pushStrategy: <T extends CxEvent>(_event: T, _winLike: WindowLike) => {},
      debug: false,
      events: [LoginEvent],
    },
  },
};

describe('TmsService', () => {
  let service: TmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TmsConfig, useValue: tmsConfig },
        { provide: EventService, useClass: MockEventService },
        { provide: WindowRef, useValue: {} },
      ],
    });

    service = TestBed.inject(TmsService);

    spyOn(tmsConfig.tagManager.gtm, 'pushStrategy').and.callThrough();
    spyOn(tmsConfig.tagManager.aep, 'pushStrategy').and.callThrough();
    spyOn(tmsConfig.tagManager.gtm, 'eventMapper').and.callThrough();
    spyOn(tmsConfig.tagManager.aep, 'eventMapper').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should invoke the provided pushStrategy() function', () => {
    service.collect();
    expect(tmsConfig.tagManager.gtm.pushStrategy).toHaveBeenCalledWith(
      event,
      undefined
    );
    expect(tmsConfig.tagManager.aep.pushStrategy).toHaveBeenCalledWith(
      event,
      undefined
    );
  });

  it('should invoke the provided eventMapper() function', () => {
    service.collect();
    expect(tmsConfig.tagManager.gtm.eventMapper).toHaveBeenCalledWith(event);
    expect(tmsConfig.tagManager.aep.eventMapper).toHaveBeenCalledWith(event);
  });
});
