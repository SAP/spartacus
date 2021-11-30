import { inject, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  CheckoutQueryFacade,
  CheckoutState,
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  CardType,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  PaymentDetails,
  QueryState,
  UserActions,
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

class MockActiveCartService implements Partial<ActiveCartService> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(false);
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
  let store: MockStore;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPaymentService,
        provideMockStore(),
        { provide: ActiveCartService, useClass: MockActiveCartService },
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
    store = TestBed.inject(MockStore);
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

    it(`should dispatch PaymentDetailsCreatedEvent event`, () => {
      service.createPaymentDetails(mockPaymentInfo);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          paymentDetails: mockPaymentInfo,
        },
        PaymentDetailsCreatedEvent
      );
    });

    // TODO:#deprecation-checkout Replace with event testing once we remove ngrx store.
    it(`should dispatch UserActions.LoadUserPaymentMethods`, () => {
      spyOn(store, 'dispatch').and.stub();

      service.createPaymentDetails(mockPaymentInfo);

      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserPaymentMethods(mockUserId)
      );
    });

    // TODO:#deprecation-checkout Replace with event testing once we remove ngrx store.
    it(`should NOT dispatch UserActions.LoadUserPaymentMethods when the use is anonymous`, () => {
      userIdService.takeUserId = createSpy().and.returnValue(
        of(OCC_USER_ID_ANONYMOUS)
      );
      spyOn(store, 'dispatch').and.stub();

      service.createPaymentDetails(mockPaymentInfo);

      expect(store.dispatch).not.toHaveBeenCalled();
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

    it(`should dispatch PaymentDetailsSetEvent event`, () => {
      service.setPaymentDetails(mockPaymentInfo);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          paymentDetailsId: mockPaymentInfo.id,
        },
        PaymentDetailsSetEvent
      );
    });
  });
});
