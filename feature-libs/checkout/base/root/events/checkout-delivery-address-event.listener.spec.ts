import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  DeleteUserAddressEvent,
  EventService,
  UpdateUserAddressEvent,
} from '@spartacus/core';
import { Observable, of, Subject } from 'rxjs';
import { CheckoutDeliveryAddressFacade } from '../facade/checkout-delivery-address.facade';
import { CheckoutDeliveryAddressEventListener } from './checkout-delivery-address-event.listener';
import {
  ClearCheckoutDeliveryAddressEvent,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from './checkout.events';

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  clearCheckoutDeliveryAddress(): Observable<unknown> {
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

describe(`CheckoutDeliveryAddressEventListener`, () => {
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryAddressEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryAddressFacade,
        },
      ],
    });

    TestBed.inject(CheckoutDeliveryAddressEventListener);
    checkoutDeliveryAddressFacade = TestBed.inject(
      CheckoutDeliveryAddressFacade
    );
    eventService = TestBed.inject(EventService);
  });

  describe(`onUserAddressChange`, () => {
    it(`UpdateUserAddressEvent should call clearCheckoutDeliveryAddress() and dispatch ResetDeliveryModesEvent`, () => {
      spyOn(checkoutDeliveryAddressFacade, 'clearCheckoutDeliveryAddress');
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new UpdateUserAddressEvent());

      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
    });

    it(`DeleteUserAddressEvent should call clearCheckoutDeliveryAddress() and dispatch ResetDeliveryModesEvent`, () => {
      spyOn(checkoutDeliveryAddressFacade, 'clearCheckoutDeliveryAddress');
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new DeleteUserAddressEvent());

      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
    });
  });

  describe(`onDeliveryAddressChange`, () => {
    it(`DeliveryAddressSetEvent should dispatch ResetDeliveryModesEvent and ResetCheckoutQueryEvent`, () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new DeliveryAddressSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
    });

    it(`DeliveryAddressClearedEvent should dispatch ResetCheckoutQueryEvent`, () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new DeliveryAddressClearedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });

    it(`ClearCheckoutDeliveryAddressEvent should call clearCheckoutDeliveryAddress()`, () => {
      spyOn(checkoutDeliveryAddressFacade, 'clearCheckoutDeliveryAddress');
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new ClearCheckoutDeliveryAddressEvent());

      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
    });
  });
});
