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
  GetTicketAssociatedObjectsQueryResetEvent,
  GetTicketCategoryQueryResetEvent,
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

  function assertServiceDispatchForEvent(event: CxEvent, dispatchedEvent: any) {
    mockEventStream$.next(event);
    expect(eventService.dispatch).toHaveBeenCalledWith({}, dispatchedEvent);
  }

  describe('onGetTicketQueryReload', () => {
    it('LanguageSetEvent should dispatch GetTicketQueryReloadEvent', () => {
      assertServiceDispatchForEvent(
        new LanguageSetEvent(),
        GetTicketQueryReloadEvent
      );
    });

    it('CurrencySetEvent should dispatch GetTicketQueryReloadEvent', () => {
      assertServiceDispatchForEvent(
        new CurrencySetEvent(),
        GetTicketQueryReloadEvent
      );
    });
  });

  describe('onLoginAndLogoutEvent', () => {
    it('LogoutEvent should dispatch GetTicketQueryResetEvent', () => {
      assertServiceDispatchForEvent(
        new LogoutEvent(),
        GetTicketQueryResetEvent
      );
    });

    it('LoginEvent should dispatch GetTicketQueryResetEvent', () => {
      assertServiceDispatchForEvent(new LoginEvent(), GetTicketQueryResetEvent);
    });
    it('LogoutEvent should dispatch GetTicketCategoryQueryReloadEvent', () => {
      assertServiceDispatchForEvent(
        new LogoutEvent(),
        GetTicketCategoryQueryResetEvent
      );
    });
    it('LoginEvent should dispatch GetTicketCategoryQueryResetEvent', () => {
      assertServiceDispatchForEvent(
        new LoginEvent(),
        GetTicketCategoryQueryResetEvent
      );
    });
    it('LogogoutEvent should dispatch GetTicketAssociatedObjectsQueryResetEvent', () => {
      assertServiceDispatchForEvent(
        new LogoutEvent(),
        GetTicketAssociatedObjectsQueryResetEvent
      );
    });
    it('LoginEvent should dispatch GetTicketAssociatedObjectsQueryResetEvent', () => {
      assertServiceDispatchForEvent(
        new LoginEvent(),
        GetTicketAssociatedObjectsQueryResetEvent
      );
    });
  });
});
