import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  DeleteUserAddressEvent,
  EventService,
  UpdateUserAddressEvent,
} from '@spartacus/core';
import { Observable, of, Subject } from 'rxjs';
import { CheckoutDeliveryModesFacade } from '../facade/checkout-delivery-modes.facade';
import { CheckoutDeliveryModeEventListener } from './checkout-delivery-mode-event.listener';
import {
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from './checkout.events';

class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  clearCheckoutDeliveryMode(): Observable<unknown> {
    return of();
  }
}

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
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
    it(`UpdateUserAddressEvent should call clearCheckoutDeliveryMode() and dispatch ResetDeliveryModesEvent`, () => {
      spyOn(checkoutDeliveryModesFacade, 'clearCheckoutDeliveryMode');
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new UpdateUserAddressEvent());

      expect(
        checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
    });

    it(`DeleteUserAddressEvent should call clearCheckoutDeliveryMode() and dispatch ResetDeliveryModesEvent`, () => {
      spyOn(checkoutDeliveryModesFacade, 'clearCheckoutDeliveryMode');
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new DeleteUserAddressEvent());

      expect(
        checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
    });
  });

  describe(`onDeliveryAddressChange`, () => {
    it(`DeliveryAddressSetEvent should call clearCheckoutDeliveryMode()`, () => {
      spyOn(checkoutDeliveryModesFacade, 'clearCheckoutDeliveryMode');

      mockEventStream$.next(new DeliveryAddressSetEvent());

      expect(
        checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
      ).toHaveBeenCalled();
    });
  });

  describe(`onDeliveryModeChange`, () => {
    it(`DeliveryModeSetEvent should dispatch ResetCheckoutQueryEvent()`, () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new DeliveryModeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });

  describe(`onDeliveryModeChange`, () => {
    it(`DeliveryModeSetEvent should dispatch ResetCheckoutQueryEvent()`, () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new DeliveryModeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
    it(`DeliveryModeClearedEvent should dispatch ResetCheckoutQueryEvent()`, () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new DeliveryModeClearedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });
});
