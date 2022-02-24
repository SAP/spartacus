import { TestBed } from '@angular/core/testing';
import { LoadCartEvent } from '@spartacus/cart/base/root';
import {
  createFrom,
  CxEvent,
  DeleteUserAddressEvent,
  EventService,
  UpdateUserAddressEvent,
} from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { CheckoutDeliveryModesFacade } from '../facade/checkout-delivery-modes.facade';
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

class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  clearCheckoutDeliveryMode = createSpy().and.returnValue(of());
}

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutDeliveryModeEventListener`, () => {
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryModeEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: CheckoutDeliveryModesFacade,
          useClass: MockCheckoutDeliveryModesFacade,
        },
      ],
    });

    TestBed.inject(CheckoutDeliveryModeEventListener);
    checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
    eventService = TestBed.inject(EventService);
  });

  describe(`onUserAddressChange`, () => {
    it(`UpdateUserAddressEvent should call clearCheckoutDeliveryMode() and dispatch CheckoutResetDeliveryModesEvent`, () => {
      mockEventStream$.next(new UpdateUserAddressEvent());

      expect(
        checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetDeliveryModesEvent
      );
    });

    it(`DeleteUserAddressEvent should call clearCheckoutDeliveryMode() and dispatch CheckoutResetDeliveryModesEvent`, () => {
      mockEventStream$.next(new DeleteUserAddressEvent());

      expect(
        checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetDeliveryModesEvent
      );
    });
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
