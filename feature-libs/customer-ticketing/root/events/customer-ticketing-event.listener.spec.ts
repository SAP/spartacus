import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  CurrencySetEvent,
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
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
  NewMessageEvent,
  TicketClosedEvent,
  TicketReopenedEvent,
  UploadAttachmentSuccessEvent,
} from './customer-ticketing.events';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe('CustomerTicketingEventListener', () => {
  let eventService: EventService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerTicketingEventListener,
        { provide: EventService, useClass: MockEventService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    TestBed.inject(CustomerTicketingEventListener);
    eventService = TestBed.inject(EventService);
    globalMessageService = TestBed.inject(GlobalMessageService);
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

  describe('newTicketEvent', () => {
    it('TicketClosedEvent should trigger requestClosed global message and dispatch GetTicketQueryResetEvent', () => {
      mockEventStream$.next(createFrom(TicketClosedEvent, {}));

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'customerTicketingDetails.requestClosed' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );

      assertServiceDispatchForEvent(
        new TicketClosedEvent(),
        GetTicketQueryResetEvent
      );
    });

    it('TicketReopenedEvent should trigger requestReopened global message and dispatch GetTicketQueryReloadEvent', () => {
      mockEventStream$.next(createFrom(TicketReopenedEvent, {}));

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'customerTicketingDetails.requestReopened' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );

      assertServiceDispatchForEvent(
        new TicketReopenedEvent(),
        GetTicketQueryReloadEvent
      );
    });

    it('NewMessageEvent should dispatch GetTicketQueryReloadEvent', () => {
      assertServiceDispatchForEvent(
        new NewMessageEvent(),
        GetTicketQueryReloadEvent
      );
    });
  });

  it('should dipatch GetTicketQueryReloadEvent when UploadAttachmentSuccessEvent is triggered', () => {
    assertServiceDispatchForEvent(
      new UploadAttachmentSuccessEvent(),
      GetTicketQueryReloadEvent
    );
  });
});
