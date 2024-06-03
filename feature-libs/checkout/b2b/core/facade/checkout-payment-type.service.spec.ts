import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import {
  B2BPaymentTypeEnum,
  CheckoutPaymentTypeSetEvent,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentTypeConnector } from '../connectors/checkout-payment-type/checkout-payment-type.connector';
import { CheckoutPaymentTypeService } from './checkout-payment-type.service';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockB2bPaymentType = B2BPaymentTypeEnum.ACCOUNT_PAYMENT;
const mockPaymentType: PaymentType = {
  code: mockB2bPaymentType,
};
const mockPurchaseOrderNumber = 'purchaseOrderNumber';

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(EMPTY);
  dispatch = createSpy();
}

class MockCheckoutPaymentTypeConnector
  implements Partial<CheckoutPaymentTypeConnector>
{
  getPaymentTypes = createSpy().and.returnValue(of([mockPaymentType]));
  setPaymentType = createSpy().and.returnValue(of('setPaymentType'));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = createSpy().and.returnValue(
    of(of({ loading: false, error: false, data: undefined }))
  );
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
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
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
      service
        .getPaymentTypesState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(connector.getPaymentTypes).toHaveBeenCalled();
          expect(result).toEqual({
            loading: false,
            error: false,
            data: [mockPaymentType],
          });
          done();
        });
    });
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
          expect(service.getPaymentTypesState).toHaveBeenCalled();
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

    it(`should call dispatch CheckoutPaymentTypeSetEvent`, (done) => {
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
            CheckoutPaymentTypeSetEvent
          );
          done();
        });
    });
  });

  describe(`getSelectedPaymentTypeState`, () => {
    it(`should return the payment type`, (done) => {
      checkoutQuery.getCheckoutDetailsState = createSpy().and.returnValue(
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
      checkoutQuery.getCheckoutDetailsState = createSpy().and.returnValue(
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
