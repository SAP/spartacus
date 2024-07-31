import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { Address, OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutBillingAddressConnector } from '../connectors/checkout-billing-address/checkout-billing-address.connector';
import { CheckoutBillingAddressService } from './checkout-billing-address.service';
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

class MockCheckoutBillingAddressConnector
  implements Partial<CheckoutBillingAddressConnector>
{
  setBillingAddress = createSpy().and.returnValue(of('setAddress'));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

describe(`CheckoutBillingAddressService`, () => {
  let service: CheckoutBillingAddressService;
  let connector: CheckoutBillingAddressConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutBillingAddressService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: CheckoutBillingAddressConnector,
          useClass: MockCheckoutBillingAddressConnector,
        },
        { provide: CheckoutQueryFacade, useClass: MockCheckoutQueryFacade },
      ],
    });

    service = TestBed.inject(CheckoutBillingAddressService);
    connector = TestBed.inject(CheckoutBillingAddressConnector);
  });

  it(`should inject CheckoutBillingAddressService`, inject(
    [CheckoutBillingAddressService],
    (checkoutBillingAddressService: CheckoutBillingAddressService) => {
      expect(checkoutBillingAddressService).toBeTruthy();
    }
  ));

  describe(`setBillingAddress`, () => {
    it(`should throw an error if the address is not present`, (done) => {
      service
        .setBillingAddress(undefined as unknown as Address)
        .pipe(take(1))
        .subscribe({
          error: (error) => {
            expect(error).toEqual(new Error('Checkout conditions not met'));
            done();
          },
        });
    });

    it(`should throw an error if the address object is empty`, (done) => {
      service
        .setBillingAddress({})
        .pipe(take(1))
        .subscribe({
          error: (error) => {
            expect(error).toEqual(new Error('Checkout conditions not met'));
            done();
          },
        });
    });

    it(`should call checkoutBillingConnector.setAddress`, () => {
      service.setBillingAddress(mockAddress);

      expect(connector.setBillingAddress).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockAddress
      );
    });
  });
});
