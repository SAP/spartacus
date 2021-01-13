import { TestBed } from '@angular/core/testing';
import { createFrom, CxEvent, EventService, WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { TmsConfig } from '../config/tms-config';
import { GoogleTagManagerService } from './gtm.service';

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
    gtm: {
      events: [CxEvent],
    },
  },
};

describe('GoogleTagManagerService', () => {
  let service: GoogleTagManagerService;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: EventService, useClass: MockEventService },
        { provide: TmsConfig, useValue: mockConfig },
      ],
    });

    service = TestBed.inject(GoogleTagManagerService);
    eventService = TestBed.inject(EventService);
    spyOnProperty(service, 'window').and.returnValue({ dataLayer: [] });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when an event is fired', () => {
    it('should be collected', () => {
      const testEvent = createFrom(CxEvent, {});
      spyOn(eventService, 'get').and.returnValue(of(testEvent));

      service.collect();
      expect(eventService.get).toHaveBeenCalledTimes(1);
      expect(service.window.dataLayer).toEqual([testEvent]);
    });
  });
});
