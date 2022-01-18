import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  DeleteUserAddressEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  UpdateUserAddressEvent,
} from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { CheckoutDeliveryAddressFacade } from '../facade/checkout-delivery-address.facade';
import { CheckoutDeliveryAddressEventListener } from './checkout-delivery-address-event.listener';
import {
  ClearCheckoutDeliveryAddressEvent,
  DeliveryAddressClearedEvent,
  DeliveryAddressCreatedEvent,
  DeliveryAddressSetEvent,
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  clearCheckoutDeliveryAddress = createSpy().and.returnValue(of());
}

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe(`CheckoutDeliveryAddressEventListener`, () => {
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let eventService: EventService;
  let globalMessageService: GlobalMessageService;

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
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });

    TestBed.inject(CheckoutDeliveryAddressEventListener);
    checkoutDeliveryAddressFacade = TestBed.inject(
      CheckoutDeliveryAddressFacade
    );
    eventService = TestBed.inject(EventService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe(`onUserAddressChange`, () => {
    it(`UpdateUserAddressEvent should call clearCheckoutDeliveryAddress() and dispatch ResetDeliveryModesEvent`, () => {
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
      mockEventStream$.next(new DeliveryAddressClearedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });

    it(`ClearCheckoutDeliveryAddressEvent should call clearCheckoutDeliveryAddress()`, () => {
      mockEventStream$.next(new ClearCheckoutDeliveryAddressEvent());

      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
    });

    describe(`global message`, () => {
      it(`DeliveryAddressCreatedEvent should add a global message`, () => {
        mockEventStream$.next(new DeliveryAddressCreatedEvent());

        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'addressForm.userAddressAddSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );

        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          ResetDeliveryModesEvent
        );
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          ResetDeliveryModesEvent
        );
      });
    });
  });
});
