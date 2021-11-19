import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Cart,
  HttpErrorModel,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
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
const mockJaloError: Partial<HttpErrorModel> = {
  details: [{ type: 'JaloObjectNoLongerValidError' }],
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

    it(`should unsuccessfully backOff on Jalo error and put the error in the state`, fakeAsync(() => {
      spyOn(connector, 'getCheckoutDetails').and.returnValue(
        throwError(mockJaloError)
      );

      let resultState: QueryState<CheckoutState | undefined> | undefined;
      const subscription = service
        .getCheckoutDetailsState()
        .subscribe((result) => (resultState = result));

      tick(4200);

      expect(resultState).toEqual({
        loading: false,
        error: <Error>mockJaloError,
        data: undefined,
      });
      subscription.unsubscribe();
    }));

    xit(`should successfully backOff on Jalo error and recover after the 2nd attempt`, fakeAsync(() => {
      spyOn(connector, 'getCheckoutDetails').and.returnValues(
        // first attempt
        throwError(mockJaloError),
        // second attempt
        throwError(mockJaloError),
        // third time the charm
        of(mockCheckoutState)
      );

      let resultState: QueryState<CheckoutState | undefined> | undefined;
      const subscription = service
        .getCheckoutDetailsState()
        .subscribe((result) => {
          return (resultState = result);
        });

      // 1*1*300 = 300
      tick(300);
      expect(resultState).toEqual({
        loading: true,
        error: false,
        data: undefined,
      });

      // 2*2*300 = 1200
      tick(1200);
      expect(resultState).toEqual({
        loading: false,
        error: false,
        data: mockCheckoutState,
      });
      subscription.unsubscribe();
    }));
  });
});
