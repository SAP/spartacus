import { AbstractType, Type } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { PaymentTypeSetEvent } from '@spartacus/checkout/b2b/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  B2BPaymentTypeEnum,
  Cart,
  EventService,
  HttpErrorModel,
  OCC_USER_ID_CURRENT,
  PaymentType,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { defer, Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentTypeConnector } from '../connectors/checkout-payment-type/checkout-payment-type.connector';
import { CheckoutPaymentTypeService } from './checkout-payment-type.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockB2bPaymentType = B2BPaymentTypeEnum.ACCOUNT_PAYMENT;
const mockPaymentType: PaymentType = {
  code: mockB2bPaymentType,
};
const mockPurchaseOrderNumber = 'purchaseOrderNumber';
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

class MockEventService implements Partial<EventService> {
  get<T>(_eventType: AbstractType<T>): Observable<T> {
    return of();
  }
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
}

class MockCheckoutPaymentTypeConnector
  implements Partial<CheckoutPaymentTypeConnector>
{
  getPaymentTypes(): Observable<PaymentType[]> {
    return of([mockPaymentType]);
  }
  setPaymentType(
    _userId: string,
    _cartId: string,
    _typeCode: string,
    _purchaseOrderNumber?: string
  ): Observable<unknown> {
    return of('setPaymentType');
  }
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

describe(`CheckoutPaymentTypeService`, () => {
  let service: CheckoutPaymentTypeService;
  let connector: CheckoutPaymentTypeConnector;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPaymentTypeService,
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: CheckoutPaymentTypeConnector,
          useClass: MockCheckoutPaymentTypeConnector,
        },
        { provide: CheckoutQueryFacade, useClass: MockCheckoutQueryFacade },
      ],
    });

    service = TestBed.inject(CheckoutPaymentTypeService);
    connector = TestBed.inject(CheckoutPaymentTypeConnector);
    checkoutQuery = TestBed.inject(CheckoutQueryFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject CheckoutPaymentTypeService`, inject(
    [CheckoutPaymentTypeService],
    (checkoutPaymentTypeService: CheckoutPaymentTypeService) => {
      expect(checkoutPaymentTypeService).toBeTruthy();
    }
  ));

  describe(`getPaymentTypesState`, () => {
    it(`should call paymentTypeConnector.getPaymentTypes`, (done) => {
      spyOn(connector, 'getPaymentTypes').and.callThrough();

      service
        .getPaymentTypesState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual({
            loading: false,
            error: false,
            data: [mockPaymentType],
          });
          done();
        });
    });

    it(`should unsuccessfully backOff on Jalo error and put the error in the state`, fakeAsync(() => {
      spyOn(connector, 'getPaymentTypes').and.returnValue(
        throwError(mockJaloError)
      );

      let resultState: QueryState<PaymentType[] | undefined> | undefined;
      const subscription = service
        .getPaymentTypesState()
        .subscribe((result) => (resultState = result));

      // 1*1*300 + 2*2*300 + 3*3*300 = 4200ms
      tick(4200);

      expect(resultState).toEqual({
        loading: false,
        error: <Error>mockJaloError,
        data: undefined,
      });
      subscription.unsubscribe();
    }));

    it(`should successfully backOff on Jalo error and recover after the 2nd retry`, fakeAsync(() => {
      let calledTimes = -1;
      spyOn(connector, 'getPaymentTypes').and.returnValue(
        defer(() => {
          calledTimes++;
          if (calledTimes === 3) {
            return of([mockPaymentType]);
          }
          return throwError(mockJaloError);
        })
      );

      let resultState: QueryState<PaymentType[] | undefined> | undefined;
      const subscription = service
        .getPaymentTypesState()
        .subscribe((result) => (resultState = result));

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
        loading: true,
        error: false,
        data: undefined,
      });

      // 3*3*300 = 2700
      tick(2700);
      expect(resultState).toEqual({
        loading: false,
        error: false,
        data: [mockPaymentType],
      });
      subscription.unsubscribe();
    }));
  });

  describe(`getPaymentTypes`, () => {
    it(`should call facade's getPaymentTypesState()`, (done) => {
      spyOn(service, 'getPaymentTypesState').and.returnValue(
        of({
          loading: false,
          error: false,
          data: [mockPaymentType],
        })
      );

      service
        .getPaymentTypes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual([mockPaymentType]);
          done();
        });
    });

    it(`should return an empty array if query's data is falsy`, (done) => {
      spyOn(service, 'getPaymentTypesState').and.returnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      service
        .getPaymentTypes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual([]);
          done();
        });
    });
  });

  describe(`setPaymentType`, () => {
    it(`should call paymentTypeConnector.setPaymentType`, (done) => {
      spyOn(connector, 'setPaymentType').and.callThrough();

      service
        .setPaymentType(mockB2bPaymentType, mockPurchaseOrderNumber)
        .pipe(take(1))
        .subscribe(() => {
          expect(connector.setPaymentType).toHaveBeenCalledWith(
            mockUserId,
            mockCartId,
            mockPaymentType.code,
            mockPurchaseOrderNumber
          );
          done();
        });
    });

    it(`should call dispatch PaymentTypeSetEvent`, (done) => {
      spyOn(connector, 'setPaymentType').and.callThrough();
      spyOn(eventService, 'dispatch').and.stub();

      service
        .setPaymentType(mockB2bPaymentType, mockPurchaseOrderNumber)
        .pipe(take(1))
        .subscribe(() => {
          expect(eventService.dispatch).toHaveBeenCalledWith(
            {
              cartId: mockCartId,
              userId: mockUserId,
              paymentTypeCode: mockB2bPaymentType,
              purchaseOrderNumber: mockPurchaseOrderNumber,
            },
            PaymentTypeSetEvent
          );
          done();
        });
    });
  });

  describe(`getSelectedPaymentTypeState`, () => {
    it(`should return the payment type`, (done) => {
      spyOn(checkoutQuery, 'getCheckoutDetailsState').and.returnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            paymentType: mockPaymentType,
          },
        })
      );

      service
        .getSelectedPaymentTypeState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(<QueryState<PaymentType | undefined>>{
            loading: false,
            error: false,
            data: mockPaymentType,
          });
          done();
        });
    });
  });

  describe(`isAccountPayment`, () => {
    it(`should return true if the payment type is of type ACCOUNT_PAYMENT`, (done) => {
      spyOn(service, 'getSelectedPaymentTypeState').and.returnValue(
        of({
          loading: false,
          error: false,
          data: mockPaymentType,
        })
      );

      service
        .isAccountPayment()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeTruthy();
          done();
        });
    });

    it(`should return false if the payment type is NOT of type ACCOUNT_PAYMENT`, (done) => {
      spyOn(service, 'getSelectedPaymentTypeState').and.returnValue(
        of({
          loading: false,
          error: false,
          data: { code: B2BPaymentTypeEnum.CARD_PAYMENT },
        })
      );

      service
        .isAccountPayment()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeFalsy();
          done();
        });
    });
  });

  describe(`getPurchaseOrderNumberState`, () => {
    it(`should return PO number`, (done) => {
      spyOn(checkoutQuery, 'getCheckoutDetailsState').and.returnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            purchaseOrderNumber: mockPurchaseOrderNumber,
          },
        })
      );

      service
        .getPurchaseOrderNumberState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(<QueryState<string | undefined>>{
            loading: false,
            error: false,
            data: mockPurchaseOrderNumber,
          });
          done();
        });
    });
  });
});
