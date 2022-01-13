import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  DeleteUserAddressEvent,
  EventService,
  UpdateUserAddressEvent,
} from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { CheckoutDeliveryModesFacade } from '../facade/checkout-delivery-modes.facade';
import { CheckoutDeliveryModeEventListener } from './checkout-delivery-mode-event.listener';
import {
  CheckoutDeliveryAddressSetEvent,
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  ResetCheckoutDeliveryModesEvent,
  ResetCheckoutQueryEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

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
    it(`UpdateUserAddressEvent should call clearCheckoutDeliveryMode() and dispatch ResetCheckoutDeliveryModesEvent`, () => {
      mockEventStream$.next(new UpdateUserAddressEvent());

      expect(
        checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutDeliveryModesEvent
      );
    });

    it(`DeleteUserAddressEvent should call clearCheckoutDeliveryMode() and dispatch ResetCheckoutDeliveryModesEvent`, () => {
      mockEventStream$.next(new DeleteUserAddressEvent());

      expect(
        checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutDeliveryModesEvent
      );
    });
  });

  describe(`onDeliveryAddressChange`, () => {
    it(`CheckoutDeliveryAddressSetEvent should call clearCheckoutDeliveryMode()`, () => {
      mockEventStream$.next(new CheckoutDeliveryAddressSetEvent());

      expect(
        checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
      ).toHaveBeenCalled();
    });
  });

  describe(`onDeliveryModeChange`, () => {
    it(`CheckoutDeliveryModeSetEvent should dispatch ResetCheckoutQueryEvent()`, () => {
      mockEventStream$.next(new CheckoutDeliveryModeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });

  describe(`onDeliveryModeChange`, () => {
    it(`CheckoutDeliveryModeSetEvent should dispatch ResetCheckoutQueryEvent()`, () => {
      mockEventStream$.next(new CheckoutDeliveryModeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
    it(`CheckoutDeliveryModeClearedEvent should dispatch ResetCheckoutQueryEvent()`, () => {
      mockEventStream$.next(new CheckoutDeliveryModeClearedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });
});
