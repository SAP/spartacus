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
import { firstValueFrom } from 'rxjs';
import { CheckoutDeliveryModesConnector } from '../connectors/checkout-delivery-modes/checkout-delivery-modes.connector';
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

class MockCheckoutDeliveryModesConnector
  implements Partial<CheckoutDeliveryModesConnector>
{
  getSupportedModes = vi.fn().mockReturnValue(
    of(mockSupportedDeliveryModes)
  );
  setMode = vi.fn().mockReturnValue(of('setMode'));
  clearCheckoutDeliveryMode = vi.fn().mockReturnValue(
    of('clearCheckoutDeliveryMode')
  );
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = vi.fn().mockReturnValue(
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
    it(`should call the checkoutDeliveryModesConnector.getSupportedModes()`, async () => {
      const state = await firstValueFrom(service.getSupportedDeliveryModesState());
      expect(state).toEqual({
        loading: false,
        error: false,
        data: mockSupportedDeliveryModes,
      });
      expect(connector.getSupportedModes).toHaveBeenCalledWith(
        mockUserId,
        mockCartId
      );
    });
  });

  describe(`getSupportedDeliveryModes`, () => {
    it(`should call facade's getSupportedDeliveryModesState()`, async () => {
      vi.spyOn(service, 'getSupportedDeliveryModesState').mockReturnValue(
        of({
          loading: false,
          error: false,
          data: mockSupportedDeliveryModes,
        })
      );

      const result = await firstValueFrom(service.getSupportedDeliveryModes());
      expect(result).toEqual(mockSupportedDeliveryModes);
      expect(service.getSupportedDeliveryModesState).toHaveBeenCalled();
    });

    it(`should return an empty array if query's data is falsy`, async () => {
      vi.spyOn(service, 'getSupportedDeliveryModesState').mockReturnValue(
        of({
          loading: false,
          error: false,
          data: undefined,
        })
      );

      const result = await firstValueFrom(service.getSupportedDeliveryModes());
      expect(result).toEqual([]);
    });
  });

  describe(`getSelectedDeliveryModeState`, () => {
    it(`should return the delivery modes`, async () => {
      checkoutQuery.getCheckoutDetailsState = vi.fn().mockReturnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            deliveryMode: mockDeliveryMode,
          },
        })
      );

      const result = await firstValueFrom(service.getSelectedDeliveryModeState());
      expect(result).toEqual(<QueryState<DeliveryMode | undefined>>{
        loading: false,
        error: false,
        data: mockDeliveryMode,
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
      connector.clearCheckoutDeliveryMode = vi.fn().mockReturnValue(
        throwError(() => 'err')
      );

      service.clearCheckoutDeliveryMode();

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        CheckoutDeliveryModeClearedErrorEvent
      );
    });
  });
});
