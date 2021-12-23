import { inject, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
} from '@spartacus/checkout/base/root';
import {
  Address,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
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
  let store: MockStore;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryAddressService,
        provideMockStore(),
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
    store = TestBed.inject(MockStore);
    checkoutQuery = TestBed.inject(CheckoutQueryFacade);
    eventService = TestBed.inject(EventService);
    userIdService = TestBed.inject(UserIdService);
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

    it(`should call facade's setDeliveryAddress()`, () => {
      spyOn(service, 'setDeliveryAddress').and.stub();
      service.createAndSetAddress(mockAddress);

      expect(service.setDeliveryAddress).toHaveBeenCalledWith(mockAddress);
    });

    // TODO:#deprecation-checkout Replace with event testing once we remove ngrx store.
    it(`should dispatch UserActions.LoadUserAddresses`, () => {
      spyOn(store, 'dispatch').and.stub();
      service.createAndSetAddress(mockAddress);

      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserAddresses(mockUserId)
      );
    });

    // TODO:#deprecation-checkout Replace with event testing once we remove ngrx store.
    it(`should NOT dispatch UserActions.LoadUserAddresses when the use is anonymous`, () => {
      userIdService.takeUserId = createSpy().and.returnValue(
        of(OCC_USER_ID_ANONYMOUS)
      );
      spyOn(store, 'dispatch').and.stub();

      service.createAndSetAddress(mockAddress);

      expect(store.dispatch).not.toHaveBeenCalled();
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

    it(`should dispatch DeliveryAddressSetEvent`, () => {
      service.setDeliveryAddress(mockAddress);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, address: mockAddress },
        DeliveryAddressSetEvent
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

    it(`should dispatch DeliveryAddressClearedEvent`, () => {
      service.clearCheckoutDeliveryAddress();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        DeliveryAddressClearedEvent
      );
    });
  });
});
