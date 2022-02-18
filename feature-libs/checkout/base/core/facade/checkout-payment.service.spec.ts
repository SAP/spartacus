import { inject, TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CardType,
  PaymentDetails,
} from '@spartacus/cart/base/root';
import {
  CheckoutPaymentDetailsCreatedEvent,
  CheckoutPaymentDetailsSetEvent,
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  EventService,
  LoadUserPaymentMethodsEvent,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentConnector } from '../connectors/checkout-payment/checkout-payment.connector';
import { CheckoutPaymentService } from './checkout-payment.service';
import createSpy = jasmine.createSpy;

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
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(of());
  dispatch = createSpy();
}

class MockCheckoutPaymentConnector
  implements Partial<CheckoutPaymentConnector>
{
  getCardTypes = createSpy().and.returnValue(of(mockCardTypes));
  createPaymentDetails = createSpy().and.returnValue(of(mockPaymentInfo));
  setPaymentDetails = createSpy().and.returnValue(of('set'));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

describe(`CheckoutPaymentService`, () => {
  let service: CheckoutPaymentService;
  let connector: CheckoutPaymentConnector;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;
  let userIdService: UserIdService;

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
    userIdService = TestBed.inject(UserIdService);
  });

  it(`should inject CheckoutPaymentService`, inject(
    [CheckoutPaymentService],
    (checkoutPaymentService: CheckoutPaymentService) => {
      expect(checkoutPaymentService).toBeTruthy();
    }
  ));

  describe(`getCardTypesState`, () => {
    it(`should call the checkoutPaymentConnector.getCardTypes()`, (done) => {
      service
        .getCardTypesState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(connector.getCardTypes).toHaveBeenCalled();
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockCardTypes,
          });
          done();
        });
    });
  });

  describe(`getCardTypes`, () => {
    it(`should call facade's getCardTypesState()`, (done) => {
      spyOn(service, 'getCardTypesState').and.returnValue(
        of({
          loading: false,
          error: false,
          data: mockCardTypes,
        })
      );

      service
        .getCardTypes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockCardTypes);
          expect(service.getCardTypesState).toHaveBeenCalled();
          done();
        });
    });

    it(`should return an empty array if query's data is falsy`, (done) => {
      spyOn(service, 'getCardTypesState').and.returnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      service
        .getCardTypes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual([]);
          done();
        });
    });
  });

  describe(`getPaymentDetailsState`, () => {
    it(`should return the delivery modes`, (done) => {
      checkoutQuery.getCheckoutDetailsState = createSpy().and.returnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            paymentInfo: mockPaymentInfo,
          },
        })
      );

      service
        .getPaymentDetailsState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(<QueryState<PaymentDetails | undefined>>{
            loading: false,
            error: false,
            data: mockPaymentInfo,
          });
          done();
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

    it(`should dispatch LoadUserPaymentMethodsEvent`, () => {
      service.createPaymentDetails(mockPaymentInfo);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId },
        LoadUserPaymentMethodsEvent
      );
    });

    it(`should NOT dispatch LoadUserPaymentMethodsEvent when the user is anonymous`, () => {
      userIdService.takeUserId = createSpy().and.returnValue(
        of(OCC_USER_ID_ANONYMOUS)
      );

      service.createPaymentDetails(mockPaymentInfo);

      expect(eventService.dispatch).not.toHaveBeenCalledWith(
        { userId: mockUserId },
        LoadUserPaymentMethodsEvent
      );
    });
  });

  describe(`setPaymentDetails`, () => {
    it(`should throw an error if the payment details ID is not present`, (done) => {
      service
        .setPaymentDetails({})
        .pipe(take(1))
        .subscribe({
          error: (error) => {
            expect(error).toEqual(new Error('Checkout conditions not met'));
            done();
          },
        });
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
});
