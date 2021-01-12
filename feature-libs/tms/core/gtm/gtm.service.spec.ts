import { TestBed } from '@angular/core/testing';
import { createFrom, EventService, TmsEvent, WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { GoogleTagManagerService } from './gtm.service';

class MockWindowRef {
  get nativeWindow() {
    return {};
  }
}

class MockEventService {
  get(): Observable<TmsEvent> {
    return of();
  }
}

describe('AnonymousConsentsService', () => {
  let service: GoogleTagManagerService;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: EventService, useClass: MockEventService },
      ],
    });

    service = TestBed.inject(GoogleTagManagerService);
    eventService = TestBed.inject(EventService);
    spyOnProperty(service, 'window').and.returnValue({ dataLayer: [] });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when a TmsEvent is fired', () => {
    it('should be collected', () => {
      const testEvent = createFrom(TmsEvent, {
        event: 'TestEvent',
        payload: { test: 'data' },
      });
      spyOn(eventService, 'get').and.returnValue(
        of(createFrom(TmsEvent, testEvent))
      );

      service.collect();
      expect(eventService.get).toHaveBeenCalledTimes(1);
      expect(service.window.dataLayer).toEqual([testEvent]);
    });
  });
});
