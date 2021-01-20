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
import { AdobeLaunchService } from './adobe-launch.service';

class MockWindowRef {
  get nativeWindow() {
    return {};
  }
}

class MockEventService implements Partial<EventService> {
  get<TmsEvent>(): Observable<TmsEvent> {
    return of();
  }
}

const mockConfig: TmsConfig = {
  tms: {
    adobeLaunch: {
      events: [CxEvent],
    },
  },
};

describe('AdobeLaunchService', () => {
  let service: AdobeLaunchService;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: EventService, useClass: MockEventService },
        { provide: TmsConfig, useValue: mockConfig },
      ],
    });

    service = TestBed.inject(AdobeLaunchService);
    eventService = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when an event is fired', () => {
    it('should be collected', () => {
      const testEvent = createFrom(LoginEvent, {
        test: 'xxx',
      });
      spyOn(eventService, 'get').and.returnValue(of(testEvent));

      service.collect();
      expect(eventService.get).toHaveBeenCalledTimes(1);
      expect(service.window.dataLayer).toEqual({
        [LoginEvent.type]: testEvent,
      });
    });
  });
});
