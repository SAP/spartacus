import { AbstractType, Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
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
  OCC_USER_ID_CURRENT,
  PaymentType,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
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

  describe(`getPaymentTypes`, () => {
    it(`should call paymentTypeConnector.getPaymentTypes`, (done) => {
      spyOn(connector, 'getPaymentTypes').and.callThrough();

      service
        .getPaymentTypes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual([mockPaymentType]);
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
