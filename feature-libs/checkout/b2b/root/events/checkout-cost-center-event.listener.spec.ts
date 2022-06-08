import { TestBed } from '@angular/core/testing';
import {
  CheckoutQueryResetEvent,
  CheckoutSupportedDeliveryModesQueryResetEvent,
} from '@spartacus/checkout/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { CheckoutCostCenterSetEvent } from './checkout-b2b.events';
import { CheckoutCostCenterEventListener } from './checkout-cost-center-event.listener';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';
const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutCostCenterEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutCostCenterEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutCostCenterEventListener);
    eventService = TestBed.inject(EventService);
  });

  describe(`onCostCenterSet`, () => {
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(CheckoutCostCenterSetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          code: 'test-cost-center',
        })
      );
    });

    it(`CheckoutCostCenterSetEvent should dispatch CheckoutSupportedDeliveryModesQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        CheckoutSupportedDeliveryModesQueryResetEvent
      );
    });

    it(`CheckoutCostCenterSetEvent should dispatch CheckoutQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });
  });
});
