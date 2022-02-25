import { TestBed } from '@angular/core/testing';
import {
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from '@spartacus/checkout/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { CostCenterSetEvent } from './checkout-b2b.events';
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

  describe(`onCostCenterChange`, () => {
    it(`should dispatch CheckoutResetDeliveryModesEvent`, () => {
      mockEventStream$.next(
        createFrom(CostCenterSetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          code: 'test-cost-center',
        })
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        CheckoutResetDeliveryModesEvent
      );
    });

    it(`should dispatch CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(new CostCenterSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
  });
});
