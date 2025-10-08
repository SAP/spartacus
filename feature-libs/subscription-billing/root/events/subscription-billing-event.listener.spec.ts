import { Subject } from 'rxjs';
import createSpy = jasmine.createSpy;
import {
  CurrencySetEvent,
  CxEvent,
  EventService,
  LanguageSetEvent,
} from '@spartacus/core';
import { SubscriptionBillingEventListener } from './subscription-billing-event.listener';
import { TestBed } from '@angular/core/testing';
import {
  GetSubscriptionByCodeReloadEvent,
  GetSubscriptionListReloadEvent,
} from './subscription-billing.events';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe('SubscriptionBillingEventListener', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubscriptionBillingEventListener,
        { provide: EventService, useClass: MockEventService },
      ],
    });

    TestBed.inject(SubscriptionBillingEventListener);
    eventService = TestBed.inject(EventService);
  });

  function assertServiceDispatchForEvent(event: CxEvent, dispatchedEvent: any) {
    mockEventStream$.next(event);
    expect(eventService.dispatch).toHaveBeenCalledWith({}, dispatchedEvent);
  }

  describe('onGetSubscriptionByCodeReloadEvent', () => {
    it('LanguageSetEvent should dispatch GetSubscriptionByCodeReloadEvent', () => {
      assertServiceDispatchForEvent(
        new LanguageSetEvent(),
        GetSubscriptionByCodeReloadEvent
      );
    });

    it('CurrencySetEvent should dispatch GetSubscriptionByCodeReloadEvent', () => {
      assertServiceDispatchForEvent(
        new CurrencySetEvent(),
        GetSubscriptionByCodeReloadEvent
      );
    });
  });
  describe('onGetSubscriptionListReloadEvent', () => {
    it('LanguageSetEvent should dispatch GetSubscriptionListReloadEvent', () => {
      assertServiceDispatchForEvent(
        new LanguageSetEvent(),
        GetSubscriptionListReloadEvent
      );
    });

    it('CurrencySetEvent should dispatch GetSubscriptionListReloadEvent', () => {
      assertServiceDispatchForEvent(
        new CurrencySetEvent(),
        GetSubscriptionListReloadEvent
      );
    });
  });
});
