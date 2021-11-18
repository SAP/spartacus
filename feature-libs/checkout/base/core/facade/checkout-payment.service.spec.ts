import { AbstractType, Type } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
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
  Cart,
  EventService,
  HttpErrorModel,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  PaymentDetails,
  QueryState,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentConnector } from '../connectors/payment/checkout-payment.connector';
import { CheckoutPaymentService } from './checkout-payment.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockJaloError: Partial<HttpErrorModel> = {
  details: [{ type: 'JaloObjectNoLongerValidError' }],
};
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

class MockCheckoutPaymentConnector
  implements Partial<CheckoutPaymentConnector>
{
  getCardTypes(): Observable<CardType[]> {
    return of(mockCardTypes);
  }
  create(
    _userId: string,
    _cartId: string,
    _paymentDetails: PaymentDetails
  ): Observable<PaymentDetails> {
    return of(mockPaymentInfo);
  }
  set(
    _userId: string,
    _cartId: string,
    _paymentDetailsId: string
  ): Observable<unknown> {
    return of('set');
  }
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return of({ loading: false, error: false, data: undefined });
  }
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
      spyOn(connector, 'getCardTypes').and.callThrough();

      service
        .getCardTypesState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockCardTypes,
          });
          expect(connector.getCardTypes).toHaveBeenCalled();
          done();
        });
    });

    it(`should unsuccessfully backOff on Jalo error and put the error in the state`, fakeAsync(() => {
      spyOn(connector, 'getCardTypes').and.returnValue(
        throwError(mockJaloError)
      );

      let resultState: QueryState<CardType[] | undefined> | undefined;
      const subscription = service
        .getCardTypesState()
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
      spyOn(connector, 'getCardTypes').and.returnValues(
        // first attempt
        throwError(mockJaloError),
        // second attempt
        throwError(mockJaloError),
        // third time the charm
        of(mockCardTypes)
      );

      let resultState: QueryState<CardType[] | undefined> | undefined;
      const subscription = service.getCardTypesState().subscribe((result) => {
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
        data: mockCardTypes,
      });
      subscription.unsubscribe();
    }));
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
      spyOn(checkoutQuery, 'getCheckoutDetailsState').and.returnValue(
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
      spyOn(connector, 'create').and.stub();

      service.createPaymentDetails(mockPaymentInfo);

      expect(connector.create).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockPaymentInfo
      );
    });

    it(`should dispatch PaymentDetailsCreatedEvent event`, () => {
      spyOn(eventService, 'dispatch').and.stub();

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

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should dispatch UserActions.LoadUserPaymentMethods`, () => {
      spyOn(store, 'dispatch').and.stub();

      service.createPaymentDetails(mockPaymentInfo);

      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserPaymentMethods(mockUserId)
      );
    });

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should NOT dispatch UserActions.LoadUserPaymentMethods when the use is anonymous`, () => {
      spyOn(userIdService, 'takeUserId').and.returnValue(
        of(OCC_USER_ID_ANONYMOUS)
      );
      spyOn(store, 'dispatch').and.stub();

      service.createPaymentDetails(mockPaymentInfo);

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe(`setPaymentDetails`, () => {
    it(`should call checkoutPaymentConnector.set`, () => {
      spyOn(connector, 'set').and.stub();

      service.setPaymentDetails(mockPaymentInfo);

      expect(connector.set).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockPaymentInfo.id
      );
    });

    it(`should dispatch PaymentDetailsSetEvent event`, () => {
      spyOn(eventService, 'dispatch').and.stub();

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
