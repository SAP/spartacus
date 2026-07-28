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
import { firstValueFrom } from 'rxjs';
import { CheckoutPaymentTypeConnector } from '../connectors/checkout-payment-type/checkout-payment-type.connector';
import { CheckoutPaymentTypeService } from './checkout-payment-type.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockB2bPaymentType = B2BPaymentTypeEnum.ACCOUNT_PAYMENT;
const mockPaymentType: PaymentType = {
  code: mockB2bPaymentType,
};
const mockPurchaseOrderNumber = 'purchaseOrderNumber';

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = vi.fn().mockReturnValue(of(mockCartId));
  isGuestCart = vi.fn().mockReturnValue(of(false));
  getActive = vi.fn().mockReturnValue(
    of({ purchaseOrderNumber: 'cartpurchaseOrderNumber' })
  );
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockReturnValue(EMPTY);
  dispatch = vi.fn();
}

class MockCheckoutPaymentTypeConnector
  implements Partial<CheckoutPaymentTypeConnector>
{
  getPaymentTypes = vi.fn().mockReturnValue(of([mockPaymentType]));
  setPaymentType = vi.fn().mockReturnValue(of('setPaymentType'));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = vi.fn().mockReturnValue(
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
    it(`should call paymentTypeConnector.getPaymentTypes`, async () => {
      const result = await firstValueFrom(service.getPaymentTypesState());
      expect(connector.getPaymentTypes).toHaveBeenCalled();
      expect(result).toEqual({
        loading: false,
        error: false,
        data: [mockPaymentType],
      });
    });
  });

  describe(`getPaymentTypes`, () => {
    it(`should call facade's getPaymentTypesState()`, async () => {
      vi.spyOn(service, 'getPaymentTypesState').mockReturnValue(
        of({
          loading: false,
          error: false,
          data: [mockPaymentType],
        })
      );

      const result = await firstValueFrom(service.getPaymentTypes());
      expect(result).toEqual([mockPaymentType]);
      expect(service.getPaymentTypesState).toHaveBeenCalled();
    });

    it(`should return an empty array if query's data is falsy`, async () => {
      vi.spyOn(service, 'getPaymentTypesState').mockReturnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      const result = await firstValueFrom(service.getPaymentTypes());
      expect(result).toEqual([]);
    });
  });

  describe(`setPaymentType`, () => {
    it(`should call paymentTypeConnector.setPaymentType`, async () => {
      await firstValueFrom(service.setPaymentType(mockB2bPaymentType, mockPurchaseOrderNumber));
      expect(connector.setPaymentType).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockPaymentType.code,
        mockPurchaseOrderNumber
      );
    });

    it(`should call dispatch CheckoutPaymentTypeSetEvent`, async () => {
      await firstValueFrom(service.setPaymentType(mockB2bPaymentType, mockPurchaseOrderNumber));
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          cartId: mockCartId,
          userId: mockUserId,
          paymentTypeCode: mockB2bPaymentType,
          purchaseOrderNumber: mockPurchaseOrderNumber,
        },
        CheckoutPaymentTypeSetEvent
      );
    });
  });

  describe(`getSelectedPaymentTypeState`, () => {
    it(`should return the payment type`, async () => {
      checkoutQuery.getCheckoutDetailsState = vi.fn().mockReturnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            paymentType: mockPaymentType,
          },
        })
      );

      const result = await firstValueFrom(service.getSelectedPaymentTypeState());
      expect(result).toEqual(<QueryState<PaymentType | undefined>>{
        loading: false,
        error: false,
        data: mockPaymentType,
      });
    });
  });

  describe(`isAccountPayment`, () => {
    it(`should return true if the payment type is of type ACCOUNT_PAYMENT`, async () => {
      vi.spyOn(service, 'getSelectedPaymentTypeState').mockReturnValue(
        of({
          loading: false,
          error: false,
          data: mockPaymentType,
        })
      );

      const result = await firstValueFrom(service.isAccountPayment());
      expect(result).toBeTruthy();
    });

    it(`should return false if the payment type is NOT of type ACCOUNT_PAYMENT`, async () => {
      vi.spyOn(service, 'getSelectedPaymentTypeState').mockReturnValue(
        of({
          loading: false,
          error: false,
          data: { code: B2BPaymentTypeEnum.CARD_PAYMENT },
        })
      );

      const result = await firstValueFrom(service.isAccountPayment());
      expect(result).toBeFalsy();
    });
  });

  describe(`getPurchaseOrderNumberState`, () => {
    it(`should return PO number`, async () => {
      checkoutQuery.getCheckoutDetailsState = vi.fn().mockReturnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            purchaseOrderNumber: 'mockPurchaseOrderNumber',
          },
        })
      );

      const result = await firstValueFrom(service.getPurchaseOrderNumberState());
      expect(result).toEqual(<QueryState<string | undefined>>{
        loading: false,
        error: false,
        data: 'cartpurchaseOrderNumber',
      });
    });
  });
});
