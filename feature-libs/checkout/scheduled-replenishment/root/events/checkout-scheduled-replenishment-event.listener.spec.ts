import { TestBed } from '@angular/core/testing';
import { CheckoutResetQueryEvent } from '@spartacus/checkout/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { ReplenishmentOrderScheduledEvent } from '@spartacus/order/root';
import { Subject } from 'rxjs';
import { CheckoutScheduledReplenishmentEventListener } from './checkout-scheduled-replenishment-event.listener';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();
class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
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
    it(`ReplenishmentOrderScheduledEvent should dispatch CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(new ReplenishmentOrderScheduledEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
  });
});
