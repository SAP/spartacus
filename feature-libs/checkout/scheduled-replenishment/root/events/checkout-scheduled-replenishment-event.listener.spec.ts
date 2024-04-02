import { TestBed } from '@angular/core/testing';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { CheckoutQueryResetEvent } from '@spartacus/checkout/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderScheduledEvent,
} from '@spartacus/order/root';
import { Subject } from 'rxjs';
import { CheckoutScheduledReplenishmentEventListener } from './checkout-scheduled-replenishment-event.listener';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';
const mockReplenishmentOrder: ReplenishmentOrder = {
  code: 'test-order-code',
};

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
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(ReplenishmentOrderScheduledEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
          replenishmentOrder: mockReplenishmentOrder,
        })
      );
    });

    it(`ReplenishmentOrderScheduledEvent should dispatch RemoveCartEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        RemoveCartEvent
      );
    });

    it(`ReplenishmentOrderScheduledEvent should dispatch CheckoutQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });
  });
});
