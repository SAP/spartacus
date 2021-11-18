import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  CheckoutQueryFacade,
  CheckoutState,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Address,
  Cart,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutDeliveryAddressConnector } from '../connectors/delivery-address/checkout-delivery-address.connector';
import { CheckoutDeliveryAddressService } from './checkout-delivery-address.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockAddress: Partial<Address> = {
  id: 'test-address-id',
};

class MockActiveCartService implements Partial<ActiveCartService> {
  takeActiveCartId(): Observable<string> {
    return of(mockCartId);
  }
  isGuestCart(_cart?: Cart): boolean {
    return false;
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(_loggedIn = false): Observable<string> {
    return of(mockUserId);
  }
}

class MockEventService implements Partial<EventService> {
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
}

class MockCheckoutDeliveryAddressConnector
  implements Partial<CheckoutDeliveryAddressConnector>
{
  createAddress(
    _userId: string,
    _cartId: string,
    _address: Address
  ): Observable<Address> {
    return of(mockAddress);
  }

  setAddress(
    _userId: string,
    _cartId: string,
    _addressId: string
  ): Observable<unknown> {
    return of('setAddress');
  }

  clearCheckoutDeliveryAddress(
    _userId: string,
    _cartId: string
  ): Observable<unknown> {
    return of('clearCheckoutDeliveryAddress');
  }
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return of({ loading: false, error: false, data: undefined });
  }
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
        { provide: ActiveCartService, useClass: MockActiveCartService },
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
      spyOn(checkoutQuery, 'getCheckoutDetailsState').and.returnValue(
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
      spyOn(connector, 'createAddress').and.stub();

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

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should dispatch UserActions.LoadUserAddresses`, () => {
      spyOn(store, 'dispatch').and.stub();

      service.createAndSetAddress(mockAddress);

      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserAddresses(mockUserId)
      );
    });

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should NOT dispatch UserActions.LoadUserAddresses when the use is anonymous`, () => {
      spyOn(userIdService, 'takeUserId').and.returnValue(
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
      spyOn(connector, 'setAddress').and.stub();

      service.setDeliveryAddress(mockAddress);

      expect(connector.setAddress).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockAddress.id
      );
    });

    it(`should dispatch DeliveryAddressSetEvent`, () => {
      spyOn(eventService, 'dispatch').and.stub();

      service.setDeliveryAddress(mockAddress);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, address: mockAddress },
        DeliveryAddressSetEvent
      );
    });
  });

  describe(`clearCheckoutDeliveryAddress`, () => {
    it(`should call checkoutDeliveryConnector.clearCheckoutDeliveryAddress`, () => {
      spyOn(connector, 'clearCheckoutDeliveryAddress').and.stub();

      service.clearCheckoutDeliveryAddress();

      expect(connector.clearCheckoutDeliveryAddress).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
    });

    it(`should dispatch DeliveryAddressClearedEvent`, () => {
      spyOn(eventService, 'dispatch').and.stub();

      service.clearCheckoutDeliveryAddress();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        DeliveryAddressClearedEvent
      );
    });
  });
});
