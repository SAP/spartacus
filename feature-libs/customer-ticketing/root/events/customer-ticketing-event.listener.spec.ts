import { TestBed } from '@angular/core/testing';
import {
  CurrencySetEvent,
  CxEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { Subject } from 'rxjs';
import { CustomerTicketingEventListener } from './customer-ticketing-event.listener';
import {
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
} from './customer-ticketing.events';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe('CustomerTicketingEventListener', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerTicketingEventListener,
        { provide: EventService, useClass: MockEventService },
      ],
    });

    TestBed.inject(CustomerTicketingEventListener);
    eventService = TestBed.inject(EventService);
  });

  describe('onGetTicketQueryReload', () => {
    it('LanguageSetEvent should dispatch GetTicketQueryReloadEvent', () => {
      mockEventStream$.next(new LanguageSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        GetTicketQueryReloadEvent
      );
    });

    it('CurrencySetEvent should dispatch GetTicketQueryReloadEvent', () => {
      mockEventStream$.next(new CurrencySetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        GetTicketQueryReloadEvent
      );
    });
  });

  describe('onGetTicketQueryReset', () => {
    it('LogoutEvent should dispatch GetTicketQueryResetEvent', () => {
      mockEventStream$.next(new LogoutEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        GetTicketQueryResetEvent
      );
    });

    it('LoginEvent should dispatch GetTicketQueryResetEvent', () => {
      mockEventStream$.next(new LoginEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        GetTicketQueryResetEvent
      );
    });
  });
});
