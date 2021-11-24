import { inject, TestBed } from '@angular/core/testing';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Cart,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutQueryService } from './checkout-query.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockCheckoutState: CheckoutState = {
  deliveryAddress: { id: 'mockAddressId' },
  deliveryMode: { code: 'mockDeliveryModeCore' },
  paymentInfo: { id: 'mockPaymentId' },
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

class MockCheckoutConnector implements Partial<CheckoutConnector> {
  getCheckoutDetails(
    _userId: string,
    _cartId: string
  ): Observable<CheckoutState> {
    return of(mockCheckoutState);
  }
}

describe(`CheckoutQueryService`, () => {
  let service: CheckoutQueryService;
  let connector: CheckoutConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutQueryService,
        { provide: ActiveCartService, useClass: MockActiveCartService },
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
      spyOn(connector, 'getCheckoutDetails').and.callThrough();

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
