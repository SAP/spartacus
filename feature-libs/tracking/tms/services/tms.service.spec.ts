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

const winLikeMock = {} as WindowLike;
const event = createFrom(LoginEvent, {});
class MockEventService {
  get(): Observable<LoginEvent> {
    return of(event);
  }
}

const tmsConfig: TmsConfig = {
  tms: {
    gtm: {
      eventMapper: (event) => event,
      pushStrategy: <T extends CxEvent>(_event: T, _winRef: WindowLike) => {},
      debug: false,
      events: [LoginEvent],
    },
    adobeLaunch: {
      eventMapper: (event) => event,
      pushStrategy: <T extends CxEvent>(_event: T, _winRef: WindowLike) => {},
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
        { provide: WindowRef, useValue: winLikeMock },
      ],
    });

    service = TestBed.inject(TmsService);

    spyOn(tmsConfig.tms.gtm, 'pushStrategy').and.callThrough();
    spyOn(tmsConfig.tms.adobeLaunch, 'pushStrategy').and.callThrough();
    spyOn(tmsConfig.tms.gtm, 'eventMapper').and.callThrough();
    spyOn(tmsConfig.tms.adobeLaunch, 'eventMapper').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should invoke the provided pushStrategy() function', () => {
    service.collect();
    expect(tmsConfig.tms.gtm.pushStrategy).toHaveBeenCalledWith(
      event,
      winLikeMock
    );
    expect(tmsConfig.tms.adobeLaunch.pushStrategy).toHaveBeenCalledWith(
      event,
      winLikeMock
    );
  });

  it('should invoke the provided eventMapper() function', () => {
    service.collect();
    expect(tmsConfig.tms.gtm.eventMapper).toHaveBeenCalledWith(event);
    expect(tmsConfig.tms.adobeLaunch.eventMapper).toHaveBeenCalledWith(event);
  });
});
