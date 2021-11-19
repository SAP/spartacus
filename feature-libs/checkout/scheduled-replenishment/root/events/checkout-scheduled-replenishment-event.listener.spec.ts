import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ResetCheckoutQueryEvent } from '@spartacus/checkout/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { CheckoutScheduledReplenishmentEventListener } from './checkout-scheduled-replenishment-event.listener';
import { ReplenishmentOrderScheduledEvent } from './checkout-scheduled-replenishment.events';

const mockEventStream$ = new Subject<CxEvent>();
class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
}

describe(`CheckoutScheduledReplenishmentEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutScheduledReplenishmentEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutScheduledReplenishmentEventListener);
    eventService = TestBed.inject(EventService);
  });

  describe(`onReplenishmentOrder`, () => {
    it(`ReplenishmentOrderScheduledEvent should dispatch ResetCheckoutQueryEvent`, () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new ReplenishmentOrderScheduledEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });
});
