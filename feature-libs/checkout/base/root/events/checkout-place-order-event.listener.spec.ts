import { TestBed } from '@angular/core/testing';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Order, OrderPlacedEvent } from '@spartacus/order/root';
import { Subject } from 'rxjs';
import { CheckoutPlaceOrderEventListener } from './checkout-place-order-event.listener';
import { CheckoutQueryResetEvent } from './checkout.events';

import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';
const mockOrder: Order = {
  code: 'test-order-code',
};

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutPlaceOrderEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPlaceOrderEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutPlaceOrderEventListener);
    eventService = TestBed.inject(EventService);
  });

  describe(`onOrderPlaced`, () => {
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(OrderPlacedEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
          order: mockOrder,
        })
      );
    });

    it(`OrderPlacedEvent should dispatch CheckoutQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });

    it(`OrderPlacedEvent should dispatch RemoveCartEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        RemoveCartEvent
      );
    });
  });
});
