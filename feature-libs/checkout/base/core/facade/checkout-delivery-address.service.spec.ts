import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressClearedEvent,
  CheckoutDeliveryAddressCreatedEvent,
  CheckoutDeliveryAddressSetEvent,
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  Address,
  EventService,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { config, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutDeliveryAddressConnector } from '../connectors/checkout-delivery-address/checkout-delivery-address.connector';
import { CheckoutDeliveryAddressService } from './checkout-delivery-address.service';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockAddress: Partial<Address> = {
  id: 'test-address-id',
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  dispatch = createSpy();
}

class MockCheckoutDeliveryAddressConnector
  implements Partial<CheckoutDeliveryAddressConnector>
{
  createAddress = createSpy().and.returnValue(of(mockAddress));
  setAddress = createSpy().and.returnValue(of('setAddress'));
  clearCheckoutDeliveryAddress = createSpy().and.returnValue(
    of('clearCheckoutDeliveryAddress')
  );
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

describe(`CheckoutDeliveryAddressService`, () => {
  let service: CheckoutDeliveryAddressService;
  let connector: CheckoutDeliveryAddressConnector;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;

  // TODO: CXSPA-4870 verify if can be avoided
  let originalOnUnhandledError: ((err: any) => void) | null;

  beforeAll(() => {
    // configure rxjs to not crash node instance with thrown errors
    // TODO: CXSPA-4870 verify if can be avoided
    originalOnUnhandledError = config.onUnhandledError;
    config.onUnhandledError = () => {};
  });

  afterAll(() => {
    // reset rxjs configuration
    // TODO: CXSPA-4870 verify if can be avoided
    config.onUnhandledError = originalOnUnhandledError;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryAddressService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: CheckoutDeliveryAddressConnector,
          useClass: MockCheckoutDeliveryAddressConnector,
        },
        { provide: CheckoutQueryFacade, useClass: MockCheckoutQueryFacade },
      ],
    });

    service = TestBed.inject(CheckoutDeliveryAddressService);
    connector = TestBed.inject(CheckoutDeliveryAddressConnector);
    checkoutQuery = TestBed.inject(CheckoutQueryFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject CheckoutDeliveryAddressService`, inject(
    [CheckoutDeliveryAddressService],
    (checkoutDeliveryAddressService: CheckoutDeliveryAddressService) => {
      expect(checkoutDeliveryAddressService).toBeTruthy();
    }
  ));

  describe(`getDeliveryAddress`, () => {
    it(`should return the address`, (done) => {
      checkoutQuery.getCheckoutDetailsState = createSpy().and.returnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            deliveryAddress: mockAddress,
          },
        })
      );

      service
        .getDeliveryAddressState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(<QueryState<Address | undefined>>{
            loading: false,
            error: false,
            data: mockAddress,
          });
          done();
        });
    });
  });

  describe(`createAndSetAddress`, () => {
    it(`should call checkoutDeliveryConnector.createAddress`, () => {
      service.createAndSetAddress(mockAddress);

      expect(connector.createAddress).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockAddress
      );
    });

    it(`should dispatch CheckoutDeliveryAddressCreatedEvent event`, () => {
      service.createAndSetAddress(mockAddress);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          address: mockAddress,
        },
        CheckoutDeliveryAddressCreatedEvent
      );
    });
  });

  describe(`setDeliveryAddress`, () => {
    it(`should throw an error if the address ID is not present`, (done) => {
      service
        .setDeliveryAddress({})
        .pipe(take(1))
        .subscribe({
          error: (error) => {
            expect(error).toEqual(new Error('Checkout conditions not met'));
            done();
          },
        });
    });

    it(`should call checkoutDeliveryConnector.setAddress`, () => {
      service.setDeliveryAddress(mockAddress);

      expect(connector.setAddress).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockAddress.id
      );
    });

    it(`should dispatch CheckoutDeliveryAddressSetEvent`, () => {
      service.setDeliveryAddress(mockAddress);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, address: mockAddress },
        CheckoutDeliveryAddressSetEvent
      );
    });
  });

  describe(`clearCheckoutDeliveryAddress`, () => {
    it(`should call checkoutDeliveryConnector.clearCheckoutDeliveryAddress`, () => {
      service.clearCheckoutDeliveryAddress();

      expect(connector.clearCheckoutDeliveryAddress).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
    });

    it(`should dispatch CheckoutDeliveryAddressClearedEvent`, () => {
      service.clearCheckoutDeliveryAddress();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        CheckoutDeliveryAddressClearedEvent
      );
    });
  });
});
