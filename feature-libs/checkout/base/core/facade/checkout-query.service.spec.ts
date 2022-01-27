import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutQueryService } from './checkout-query.service';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockCheckoutState: CheckoutState = {
  deliveryAddress: { id: 'mockAddressId' },
  deliveryMode: { code: 'mockDeliveryModeCore' },
  paymentInfo: { id: 'mockPaymentId' },
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockCheckoutConnector implements Partial<CheckoutConnector> {
  getCheckoutDetails = createSpy().and.returnValue(of(mockCheckoutState));
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
    it(`should checkoutConnector.getCheckoutDetails`, (done) => {
      service
        .getCheckoutDetailsState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(connector.getCheckoutDetails).toHaveBeenCalledWith(
            mockUserId,
            mockCartId
          );
          expect(result).toEqual(<QueryState<CheckoutState | undefined>>{
            loading: false,
            error: false,
            data: mockCheckoutState,
          });
          done();
        });
    });
  });
});
