import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  createFrom,
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LoadUserAddressesEvent,
  OCC_USER_ID_ANONYMOUS,
  UpdateUserAddressEvent,
} from '@spartacus/core';
import { EMPTY, of, Subject } from 'rxjs';
import { CheckoutDeliveryAddressFacade } from '../facade/checkout-delivery-address.facade';
import { CheckoutDeliveryAddressEventListener } from './checkout-delivery-address-event.listener';
import {
  CheckoutDeliveryAddressClearedEvent,
  CheckoutDeliveryAddressCreatedEvent,
  CheckoutDeliveryAddressSetEvent,
  CheckoutQueryResetEvent,
  CheckoutSupportedDeliveryModesQueryResetEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  clearCheckoutDeliveryAddress = createSpy().and.returnValue(EMPTY);
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
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(UpdateUserAddressEvent, {
          userId: mockUserId,
          address: {},
          addressId: 'test-address-id',
        })
      );
    });

    it(`UpdateUserAddressEvent should call clearCheckoutDeliveryAddress()`, () => {
      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
    });

    it(`UpdateUserAddressEvent should dispatch CheckoutSupportedDeliveryModesQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { cartId: mockCartId, userId: mockUserId },
        CheckoutSupportedDeliveryModesQueryResetEvent
      );
    });

    it(`DeleteUserAddressEvent should call clearCheckoutDeliveryAddress() and dispatch CheckoutSupportedDeliveryModesQueryResetEvent`, () => {
      expect(
        checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
      ).toHaveBeenCalled();
    });

    it(`DeleteUserAddressEvent dispatch CheckoutSupportedDeliveryModesQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { cartId: mockCartId, userId: mockUserId },
        CheckoutSupportedDeliveryModesQueryResetEvent
      );
    });
  });

  describe(`onDeliveryAddressCreated`, () => {
    describe(`when user is NOT anonymous`, () => {
      beforeEach(() => {
        mockEventStream$.next(
          createFrom(CheckoutDeliveryAddressCreatedEvent, {
            userId: mockUserId,
            cartId: mockCartId,
            address: {},
          })
        );
      });

      it(`CheckoutDeliveryAddressCreatedEvent should dispatch CheckoutSupportedDeliveryModesQueryResetEvent`, () => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          { userId: mockUserId, cartId: mockCartId },
          CheckoutSupportedDeliveryModesQueryResetEvent
        );
      });

      it(`CheckoutDeliveryAddressCreatedEvent should dispatch CheckoutQueryResetEvent`, () => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          CheckoutQueryResetEvent
        );
      });

      it(`CheckoutDeliveryAddressCreatedEvent should dispatch LoadUserAddressesEvent`, () => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          { userId: mockUserId },
          LoadUserAddressesEvent
        );
      });

      it(`CheckoutDeliveryAddressCreatedEvent should add a global message`, () => {
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'addressForm.userAddressAddSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });
    });

    describe(`when user is anonymous`, () => {
      beforeEach(() => {
        mockEventStream$.next(
          createFrom(CheckoutDeliveryAddressCreatedEvent, {
            userId: OCC_USER_ID_ANONYMOUS,
            cartId: mockCartId,
            address: {},
          })
        );
      });

      it(`CheckoutDeliveryAddressCreatedEvent should dispatch CheckoutSupportedDeliveryModesQueryResetEvent`, () => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          { userId: OCC_USER_ID_ANONYMOUS, cartId: mockCartId },
          CheckoutSupportedDeliveryModesQueryResetEvent
        );
      });

      it(`CheckoutDeliveryAddressCreatedEvent should dispatch CheckoutQueryResetEvent`, () => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          CheckoutQueryResetEvent
        );
      });

      it(`CheckoutDeliveryAddressCreatedEvent should NOT dispatch LoadUserAddressesEvent`, () => {
        expect(eventService.dispatch).not.toHaveBeenCalledWith(
          { userId: OCC_USER_ID_ANONYMOUS },
          LoadUserAddressesEvent
        );
      });

      it(`CheckoutDeliveryAddressCreatedEvent should add a global message`, () => {
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'addressForm.userAddressAddSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });
    });
  });

  describe(`onDeliveryAddressSet`, () => {
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(CheckoutDeliveryAddressSetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          address: {},
        })
      );
    });

    it(`CheckoutDeliveryAddressSetEvent should dispatch CheckoutSupportedDeliveryModesQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        CheckoutSupportedDeliveryModesQueryResetEvent
      );
    });

    it(`CheckoutDeliveryAddressSetEvent should dispatch  CheckoutQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });
  });

  describe(`onDeliveryAddressCleared`, () => {
    it(`CheckoutDeliveryAddressClearedEvent should dispatch CheckoutQueryResetEvent`, () => {
      mockEventStream$.next(new CheckoutDeliveryAddressClearedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });
  });
});
