import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, DeliveryMode } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryModeClearedErrorEvent,
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { EMPTY, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutDeliveryModesConnector } from '../connectors/checkout-delivery-modes/checkout-delivery-modes.connector';
import { CheckoutDeliveryModesService } from './checkout-delivery-modes.service';
import createSpy = jasmine.createSpy;

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

class MockCheckoutDeliveryModesConnector
  implements Partial<CheckoutDeliveryModesConnector>
{
  getSupportedModes = createSpy().and.returnValue(
    of(mockSupportedDeliveryModes)
  );
  setMode = createSpy().and.returnValue(of('setMode'));
  clearCheckoutDeliveryMode = createSpy().and.returnValue(
    of('clearCheckoutDeliveryMode')
  );
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

describe(`CheckoutDeliveryModesService`, () => {
  let service: CheckoutDeliveryModesService;
  let connector: CheckoutDeliveryModesConnector;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryModesService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
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
          expect(service.getSupportedDeliveryModesState).toHaveBeenCalled();
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
      checkoutQuery.getCheckoutDetailsState = createSpy().and.returnValue(
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
      service.setDeliveryMode(mockDeliveryModeCode);

      expect(connector.setMode).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockDeliveryModeCode
      );
    });

    it(`should dispatch CheckoutDeliveryModeSetEvent event`, () => {
      service.setDeliveryMode(mockDeliveryModeCode);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
          deliveryModeCode: mockDeliveryModeCode,
        },
        CheckoutDeliveryModeSetEvent
      );
    });
  });

  describe(`clearCheckoutDeliveryMode`, () => {
    it(`should call checkoutDeliveryModesConnector.clearCheckoutDeliveryMode`, () => {
      service.clearCheckoutDeliveryMode();

      expect(connector.clearCheckoutDeliveryMode).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
    });

    it(`should dispatch CheckoutDeliveryModeClearedEvent event`, () => {
      service.clearCheckoutDeliveryMode();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        },
        CheckoutDeliveryModeClearedEvent
      );
    });

    it(`should dispatch CheckoutDeliveryModeClearedErrorEvent event on error`, () => {
      connector.clearCheckoutDeliveryMode = createSpy().and.returnValue(
        throwError('err')
      );

      service.clearCheckoutDeliveryMode();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        CheckoutDeliveryModeClearedErrorEvent
      );
    });
  });
});
