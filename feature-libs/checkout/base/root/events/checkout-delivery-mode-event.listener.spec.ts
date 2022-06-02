import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, LoadCartEvent } from '@spartacus/cart/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { CheckoutDeliveryModeEventListener } from './checkout-delivery-mode-event.listener';
import {
  CheckoutDeliveryModeClearedErrorEvent,
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';
const mockDeliveryModeCode = 'test-delivery-mode-code';

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

  describe(`onDeliveryModeSet`, () => {
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(CheckoutDeliveryModeSetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
          deliveryModeCode: mockDeliveryModeCode,
        })
      );
    });

    it(`CheckoutDeliveryModeSetEvent should dispatch CheckoutResetQueryEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`CheckoutDeliveryModeSetEvent should dispatch LoadCartEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        LoadCartEvent
      );
    });
  });

  describe(`onDeliveryModeCleared`, () => {
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(CheckoutDeliveryModeClearedEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        })
      );
    });

    it(`CheckoutDeliveryModeClearedEvent should dispatch CheckoutResetQueryEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`CheckoutDeliveryModeClearedEvent should dispatch LoadCartEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        LoadCartEvent
      );
    });
  });

  describe(`onDeliveryModeClearedError`, () => {
    it(`CheckoutDeliveryModeClearedErrorEvent should dispatch LoadCartEvent()`, () => {
      mockEventStream$.next(
        createFrom(CheckoutDeliveryModeClearedErrorEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        })
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        LoadCartEvent
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
