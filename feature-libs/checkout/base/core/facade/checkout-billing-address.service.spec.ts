import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { Address, OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CheckoutBillingAddressConnector } from '../connectors/checkout-billing-address/checkout-billing-address.connector';
import { CheckoutBillingAddressService } from './checkout-billing-address.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockAddress: Partial<Address> = {
  id: 'test-address-id',
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = vi.fn().mockReturnValue(of(mockCartId));
  isGuestCart = vi.fn().mockReturnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockCheckoutBillingAddressConnector
  implements Partial<CheckoutBillingAddressConnector>
{
  setBillingAddress = vi.fn().mockReturnValue(of('setAddress'));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = vi.fn().mockReturnValue(
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
    it(`should throw an error if the address is not present`, async () => {
      await expect(
        firstValueFrom(service.setBillingAddress(undefined as unknown as Address))
      ).rejects.toEqual(new Error('Checkout conditions not met'));
    });

    it(`should throw an error if the address object is empty`, async () => {
      await expect(
        firstValueFrom(service.setBillingAddress({}))
      ).rejects.toEqual(new Error('Checkout conditions not met'));
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
