import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutQueryService } from './checkout-query.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockCheckoutState: CheckoutState = {
  deliveryAddress: { id: 'mockAddressId' },
  deliveryMode: { code: 'mockDeliveryModeCore' },
  paymentInfo: { id: 'mockPaymentId' },
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = vi.fn().mockReturnValue(of(mockCartId));
  isGuestCart = vi.fn().mockReturnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockCheckoutConnector implements Partial<CheckoutConnector> {
  getCheckoutDetails = vi.fn().mockReturnValue(of(mockCheckoutState));
}

describe(`CheckoutQueryService`, () => {
  let service: CheckoutQueryService;
  let connector: CheckoutConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutQueryService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: CheckoutConnector,
          useClass: MockCheckoutConnector,
        },
      ],
    });

    service = TestBed.inject(CheckoutQueryService);
    connector = TestBed.inject(CheckoutConnector);
  });

  it(`should inject CheckoutQueryService`, inject(
    [CheckoutQueryService],
    (checkoutQueryService: CheckoutQueryService) => {
      expect(checkoutQueryService).toBeTruthy();
    }
  ));

  describe(`getCheckoutDetailsState`, () => {
    it(`should checkoutConnector.getCheckoutDetails`, async () => {
      const result = await firstValueFrom(service.getCheckoutDetailsState());
      expect(connector.getCheckoutDetails).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
      expect(result).toEqual(<QueryState<CheckoutState | undefined>>{
        loading: false,
        error: false,
        data: mockCheckoutState,
      });
    });
  });
});
