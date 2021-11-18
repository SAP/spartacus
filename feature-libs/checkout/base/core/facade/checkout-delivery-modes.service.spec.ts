import { AbstractType, Type } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  CheckoutQueryFacade,
  CheckoutState,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Cart,
  CartActions,
  DeliveryMode,
  EventService,
  HttpErrorModel,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutDeliveryModesConnector } from '../connectors/delivery-modes/checkout-delivery-modes.connector';
import { CheckoutDeliveryModesService } from './checkout-delivery-modes.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockDeliveryModeCode = 'test-delivery-code-1';
const mockDeliveryMode: Partial<DeliveryMode> = {
  code: mockDeliveryModeCode,
};
const mockSupportedDeliveryModes: DeliveryMode[] = [
  mockDeliveryMode,
  {
    code: 'test-delivery-code-2',
  },
];
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

class MockCheckoutDeliveryModesConnector
  implements Partial<CheckoutDeliveryModesConnector>
{
  getSupportedModes(
    _userId: string,
    _cartId: string
  ): Observable<DeliveryMode[]> {
    return of(mockSupportedDeliveryModes);
  }
  setMode(
    _userId: string,
    _cartId: string,
    _deliveryModeId: string
  ): Observable<unknown> {
    return of('setMode');
  }
  clearCheckoutDeliveryMode(
    _userId: string,
    _cartId: string
  ): Observable<unknown> {
    return of('clearCheckoutDeliveryMode');
  }
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

describe(`CheckoutDeliveryModesService`, () => {
  let service: CheckoutDeliveryModesService;
  let connector: CheckoutDeliveryModesConnector;
  let store: MockStore;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryModesService,
        provideMockStore(),
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: CheckoutDeliveryModesConnector,
          useClass: MockCheckoutDeliveryModesConnector,
        },
        { provide: CheckoutQueryFacade, useClass: MockCheckoutQueryFacade },
      ],
    });

    service = TestBed.inject(CheckoutDeliveryModesService);
    connector = TestBed.inject(CheckoutDeliveryModesConnector);
    store = TestBed.inject(MockStore);
    checkoutQuery = TestBed.inject(CheckoutQueryFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject CheckoutDeliveryModesService`, inject(
    [CheckoutDeliveryModesService],
    (checkoutDeliveryModesService: CheckoutDeliveryModesService) => {
      expect(checkoutDeliveryModesService).toBeTruthy();
    }
  ));

  describe(`getSupportedDeliveryModesState`, () => {
    it(`should call the checkoutDeliveryModesConnector.getSupportedModes()`, (done) => {
      spyOn(connector, 'getSupportedModes').and.callThrough();

      service
        .getSupportedDeliveryModesState()
        .pipe(take(1))
        .subscribe((state) => {
          expect(state).toEqual({
            loading: false,
            error: false,
            data: mockSupportedDeliveryModes,
          });
          expect(connector.getSupportedModes).toHaveBeenCalledWith(
            mockUserId,
            mockCartId
          );
          done();
        });
    });

    it(`should unsuccessfully backOff on Jalo error and put the error in the state`, fakeAsync(() => {
      spyOn(connector, 'getSupportedModes').and.returnValue(
        throwError(mockJaloError)
      );

      let resultState: QueryState<DeliveryMode[] | undefined> | undefined;
      const subscription = service
        .getSupportedDeliveryModesState()
        .subscribe((result) => (resultState = result));

      tick(4200);

      expect(resultState).toEqual({
        loading: false,
        error: <Error>mockJaloError,
        data: undefined,
      });
      subscription.unsubscribe();
    }));

    it(`should successfully backOff on Jalo error and recover after the 2nd attempt`, fakeAsync(() => {
      spyOn(connector, 'getSupportedModes').and.returnValues(
        // first attempt
        throwError(mockJaloError),
        // second attempt
        throwError(mockJaloError),
        // third time the charm
        of(mockSupportedDeliveryModes)
      );

      let resultState: QueryState<DeliveryMode[] | undefined> | undefined;
      const subscription = service
        .getSupportedDeliveryModesState()
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
        loading: false,
        error: false,
        data: mockSupportedDeliveryModes,
      });
      subscription.unsubscribe();
    }));
  });

  describe(`getSupportedDeliveryModes`, () => {
    it(`should call facade's getSupportedDeliveryModesState()`, (done) => {
      spyOn(service, 'getSupportedDeliveryModesState').and.returnValue(
        of({
          loading: false,
          error: false,
          data: mockSupportedDeliveryModes,
        })
      );

      service
        .getSupportedDeliveryModes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockSupportedDeliveryModes);
          done();
        });
    });

    it(`should return an empty array if query's data is falsy`, (done) => {
      spyOn(service, 'getSupportedDeliveryModesState').and.returnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      service
        .getSupportedDeliveryModes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual([]);
          done();
        });
    });
  });

  describe(`getSelectedDeliveryModeState`, () => {
    it(`should return the delivery modes`, (done) => {
      spyOn(checkoutQuery, 'getCheckoutDetailsState').and.returnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            deliveryMode: mockDeliveryMode,
          },
        })
      );

      service
        .getSelectedDeliveryModeState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(<QueryState<DeliveryMode | undefined>>{
            loading: false,
            error: false,
            data: mockDeliveryMode,
          });
          done();
        });
    });
  });

  describe(`setDeliveryMode`, () => {
    it(`should call checkoutDeliveryModesConnector.setMode`, () => {
      spyOn(connector, 'setMode').and.stub();

      service.setDeliveryMode(mockDeliveryModeCode);

      expect(connector.setMode).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockDeliveryModeCode
      );
    });

    it(`should dispatch DeliveryModeSetEvent event`, () => {
      spyOn(eventService, 'dispatch').and.stub();

      service.setDeliveryMode(mockDeliveryModeCode);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          deliveryModeCode: mockDeliveryModeCode,
        },
        DeliveryModeSetEvent
      );
    });

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should dispatch CartActions.LoadCart`, () => {
      spyOn(store, 'dispatch').and.stub();

      service.setDeliveryMode(mockDeliveryModeCode);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadCart({ userId: mockUserId, cartId: mockCartId })
      );
    });
  });

  describe(`clearCheckoutDeliveryMode`, () => {
    it(`should call checkoutDeliveryModesConnector.clearCheckoutDeliveryMode`, () => {
      spyOn(connector, 'clearCheckoutDeliveryMode').and.stub();

      service.clearCheckoutDeliveryMode();

      expect(connector.clearCheckoutDeliveryMode).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
    });

    it(`should dispatch DeliveryModeClearedEvent event`, () => {
      spyOn(eventService, 'dispatch').and.stub();

      service.clearCheckoutDeliveryMode();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
        },
        DeliveryModeClearedEvent
      );
    });

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should dispatch CartActions.LoadCart`, () => {
      spyOn(store, 'dispatch').and.stub();

      service.clearCheckoutDeliveryMode();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadCart({ userId: mockUserId, cartId: mockCartId })
      );
    });

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should reload cart on error`, () => {
      spyOn(connector, 'clearCheckoutDeliveryMode').and.returnValue(
        throwError(mockJaloError)
      );
      spyOn(store, 'dispatch').and.stub();

      service.clearCheckoutDeliveryMode();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadCart({ userId: mockUserId, cartId: mockCartId })
      );
    });
  });
});
