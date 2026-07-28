import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutPaymentDetailsCreatedEvent,
  CheckoutPaymentDetailsSetEvent,
  CheckoutQueryFacade,
  CheckoutQueryResetEvent,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  CardType,
  EventService,
  OCC_USER_ID_CURRENT,
  PaymentDetails,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CheckoutPaymentConnector } from '../connectors/checkout-payment/checkout-payment.connector';
import { CheckoutPaymentService } from './checkout-payment.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';

const mockCardTypes: CardType[] = [
  {
    code: 'VISA',
    name: 'Visa',
  },
  {
    code: 'MASTERCARD',
    name: 'MasterCart',
  },
];
const mockPaymentInfo: PaymentDetails = {
  id: 'mockPaymentId',
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = vi.fn().mockReturnValue(of(mockCartId));
  isGuestCart = vi.fn().mockReturnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockReturnValue(EMPTY);
  dispatch = vi.fn();
}

class MockCheckoutPaymentConnector
  implements Partial<CheckoutPaymentConnector>
{
  getPaymentCardTypes = vi.fn().mockReturnValue(of(mockCardTypes));
  createPaymentDetails = vi.fn().mockReturnValue(of(mockPaymentInfo));
  setPaymentDetails = vi.fn().mockReturnValue(of('set'));
  deletePaymentDetails = vi.fn().mockReturnValue(of('deleted'));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = vi.fn().mockReturnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

describe(`CheckoutPaymentService`, () => {
  let service: CheckoutPaymentService;
  let connector: CheckoutPaymentConnector;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPaymentService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: CheckoutPaymentConnector,
          useClass: MockCheckoutPaymentConnector,
        },
        { provide: CheckoutQueryFacade, useClass: MockCheckoutQueryFacade },
      ],
    });

    service = TestBed.inject(CheckoutPaymentService);
    connector = TestBed.inject(CheckoutPaymentConnector);
    checkoutQuery = TestBed.inject(CheckoutQueryFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject CheckoutPaymentService`, inject(
    [CheckoutPaymentService],
    (checkoutPaymentService: CheckoutPaymentService) => {
      expect(checkoutPaymentService).toBeTruthy();
    }
  ));

  describe(`getPaymentCardTypesState`, () => {
    it(`should call the checkoutPaymentConnector.getPaymentCardTypes()`, async () => {
      const state = await firstValueFrom(service.getPaymentCardTypesState());
      expect(connector.getPaymentCardTypes).toHaveBeenCalled();
      expect(state).toEqual({
        loading: false,
        error: false,
        data: mockCardTypes,
      });
    });
  });

  describe(`getPaymentCardTypes`, () => {
    it(`should call facade's getPaymentCardTypesState()`, async () => {
      vi.spyOn(service, 'getPaymentCardTypesState').mockReturnValue(
        of({
          loading: false,
          error: false,
          data: mockCardTypes,
        })
      );

      const result = await firstValueFrom(service.getPaymentCardTypes());
      expect(result).toEqual(mockCardTypes);
      expect(service.getPaymentCardTypesState).toHaveBeenCalled();
    });

    it(`should return an empty array if query's data is falsy`, async () => {
      vi.spyOn(service, 'getPaymentCardTypesState').mockReturnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      const result = await firstValueFrom(service.getPaymentCardTypes());
      expect(result).toEqual([]);
    });
  });

  describe(`getPaymentDetailsState`, () => {
    it(`should return the delivery modes`, async () => {
      checkoutQuery.getCheckoutDetailsState = vi.fn().mockReturnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            paymentInfo: mockPaymentInfo,
          },
        })
      );

      const result = await firstValueFrom(service.getPaymentDetailsState());
      expect(result).toEqual(<QueryState<PaymentDetails | undefined>>{
        loading: false,
        error: false,
        data: mockPaymentInfo,
      });
    });
  });

  describe(`createPaymentDetails`, () => {
    it(`should call checkoutPaymentConnector.create`, () => {
      service.createPaymentDetails(mockPaymentInfo);

      expect(connector.createPaymentDetails).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockPaymentInfo
      );
    });

    it(`should dispatch CheckoutPaymentDetailsCreatedEvent event`, () => {
      service.createPaymentDetails(mockPaymentInfo);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          paymentDetails: mockPaymentInfo,
        },
        CheckoutPaymentDetailsCreatedEvent
      );
    });
  });

  describe(`setPaymentDetails`, () => {
    it(`should throw an error if the payment details ID is not present`, async () => {
      await expect(firstValueFrom(service.setPaymentDetails({}))).rejects.toEqual(
        new Error('Checkout conditions not met')
      );
    });

    it(`should call checkoutPaymentConnector.set`, () => {
      service.setPaymentDetails(mockPaymentInfo);

      expect(connector.setPaymentDetails).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockPaymentInfo.id
      );
    });

    it(`should dispatch CheckoutPaymentDetailsSetEvent event`, () => {
      service.setPaymentDetails(mockPaymentInfo);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          paymentDetailsId: mockPaymentInfo.id,
        },
        CheckoutPaymentDetailsSetEvent
      );
    });
  });

  describe(`deletePaymentDetails`, () => {
    it(`should call checkoutPaymentConnector.deletePaymentDetails`, () => {
      service.deletePaymentDetails();

      expect(connector.deletePaymentDetails).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
    });

    it(`should dispatch CheckoutQueryResetEvent event`, () => {
      service.deletePaymentDetails();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });
  });
});
