import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  createFrom,
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  UpdateUserAddressEvent,
} from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { CheckoutDeliveryAddressFacade } from '../facade/checkout-delivery-address.facade';
import { CheckoutDeliveryAddressEventListener } from './checkout-delivery-address-event.listener';
import {
  CheckoutClearDeliveryAddressEvent,
  CheckoutDeliveryAddressClearedEvent,
  CheckoutDeliveryAddressCreatedEvent,
  CheckoutDeliveryAddressSetEvent,
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';

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

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
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
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
      ],
    });

    TestBed.inject(CheckoutDeliveryAddressEventListener);
    checkoutDeliveryAddressFacade = TestBed.inject(
      CheckoutDeliveryAddressFacade
    );
    eventService = TestBed.inject(EventService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    TestBed.inject(ActiveCartFacade);
  });

  describe(`onUserAddressChange`, () => {
    it(`UpdateUserAddressEvent should call clearCheckoutDeliveryAddress() and dispatch CheckoutResetDeliveryModesEvent`, () => {
      mockEventStream$.next(
        createFrom(UpdateUserAddressEvent, {
          userId: mockUserId,
          address: {},
          addressId: 'test-address-id',
        })
      );

      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { cartId: mockCartId, userId: mockUserId },
        CheckoutResetDeliveryModesEvent
      );
    });

    it(`DeleteUserAddressEvent should call clearCheckoutDeliveryAddress() and dispatch CheckoutResetDeliveryModesEvent`, () => {
      mockEventStream$.next(
        createFrom(UpdateUserAddressEvent, {
          userId: mockUserId,
          address: {},
          addressId: 'test-address-id',
        })
      );

      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { cartId: mockCartId, userId: mockUserId },
        CheckoutResetDeliveryModesEvent
      );
    });
  });

  describe(`onDeliveryAddressChange`, () => {
    it(`CheckoutDeliveryAddressSetEvent should dispatch CheckoutResetDeliveryModesEvent and CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(
        createFrom(CheckoutDeliveryAddressSetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          address: {},
        })
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        CheckoutResetDeliveryModesEvent
      );
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`CheckoutDeliveryAddressClearedEvent should dispatch CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(new CheckoutDeliveryAddressClearedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`CheckoutClearDeliveryAddressEvent should call clearCheckoutDeliveryAddress()`, () => {
      mockEventStream$.next(new CheckoutClearDeliveryAddressEvent());

      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
    });

    describe(`global message`, () => {
      it(`CheckoutDeliveryAddressCreatedEvent should add a global message`, () => {
        mockEventStream$.next(
          createFrom(CheckoutDeliveryAddressCreatedEvent, {
            userId: mockUserId,
            cartId: mockCartId,
            address: {},
          })
        );

        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'addressForm.userAddressAddSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );

        expect(eventService.dispatch).toHaveBeenCalledWith(
          { userId: mockUserId, cartId: mockCartId },
          CheckoutResetDeliveryModesEvent
        );
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          CheckoutResetQueryEvent
        );
      });
    });
  });
});
