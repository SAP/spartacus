import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, LoadCartEvent } from '@spartacus/cart/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { CheckoutDeliveryModeEventListener } from './checkout-delivery-mode-event.listener';
import {
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutDeliveryModeEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryModeEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutDeliveryModeEventListener);
    eventService = TestBed.inject(EventService);
    TestBed.inject(ActiveCartFacade);
  });

  describe(`onDeliveryModeChange`, () => {
    it(`CheckoutDeliveryModeSetEvent should dispatch CheckoutResetQueryEvent()`, () => {
      mockEventStream$.next(new CheckoutDeliveryModeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
    it(`CheckoutDeliveryModeClearedEvent should dispatch CheckoutResetQueryEvent()`, () => {
      mockEventStream$.next(new CheckoutDeliveryModeClearedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
  });

  describe(`onDeliveryModeReset`, () => {
    it(`CheckoutResetDeliveryModesEvent should dispatch LoadCartEvent()`, () => {
      mockEventStream$.next(
        createFrom(CheckoutResetDeliveryModesEvent, {
          userId: mockUserId,
          cartId: mockCartId,
        })
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        LoadCartEvent
      );
    });
  });
});
