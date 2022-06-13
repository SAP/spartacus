import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, LoadCartEvent } from '@spartacus/cart/base/root';
import {
  createFrom,
  CurrencySetEvent,
  CxEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { Subject } from 'rxjs';
import { CheckoutDeliveryModeEventListener } from './checkout-delivery-mode-event.listener';
import {
  CheckoutDeliveryModeClearedErrorEvent,
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  CheckoutQueryResetEvent,
  CheckoutSupportedDeliveryModesQueryReloadEvent,
  CheckoutSupportedDeliveryModesQueryResetEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';
const mockDeliveryModeCode = 'test-delivery-mode-code';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutDeliveryModeEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDeliveryModeEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutDeliveryModeEventListener);
    eventService = TestBed.inject(EventService);
    TestBed.inject(ActiveCartFacade);
  });

  describe(`onDeliveryModeSet`, () => {
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(CheckoutDeliveryModeSetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
          deliveryModeCode: mockDeliveryModeCode,
        })
      );
    });

    it(`CheckoutDeliveryModeSetEvent should dispatch CheckoutQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });

    it(`CheckoutDeliveryModeSetEvent should dispatch LoadCartEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        LoadCartEvent
      );
    });
  });

  describe(`onDeliveryModeCleared`, () => {
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(CheckoutDeliveryModeClearedEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        })
      );
    });

    it(`CheckoutDeliveryModeClearedEvent should dispatch CheckoutQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });

    it(`CheckoutDeliveryModeClearedEvent should dispatch LoadCartEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        LoadCartEvent
      );
    });
  });

  describe(`onDeliveryModeClearedError`, () => {
    it(`CheckoutDeliveryModeClearedErrorEvent should dispatch LoadCartEvent()`, () => {
      mockEventStream$.next(
        createFrom(CheckoutDeliveryModeClearedErrorEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        })
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        LoadCartEvent
      );
    });
  });

  describe(`onDeliveryModeReset`, () => {
    it(`CheckoutSupportedDeliveryModesQueryResetEvent should dispatch LoadCartEvent()`, () => {
      mockEventStream$.next(
        createFrom(CheckoutSupportedDeliveryModesQueryResetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
        })
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        LoadCartEvent
      );
    });
  });

  describe(`onGetSupportedDeliveryModesQueryReload`, () => {
    it(`LanguageSetEvent should dispatch CheckoutSupportedDeliveryModesQueryReloadEvent()`, () => {
      mockEventStream$.next(new LanguageSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutSupportedDeliveryModesQueryReloadEvent
      );
    });

    it(`LanguageSetEvent should dispatch CheckoutSupportedDeliveryModesQueryReloadEvent()`, () => {
      mockEventStream$.next(new CurrencySetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutSupportedDeliveryModesQueryReloadEvent
      );
    });
  });

  describe(`onGetSupportedDeliveryModesQueryReset`, () => {
    it(`LogoutEvent should dispatch CheckoutSupportedDeliveryModesQueryResetEvent()`, () => {
      mockEventStream$.next(new LogoutEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutSupportedDeliveryModesQueryResetEvent
      );
    });

    it(`LoginEvent should dispatch CheckoutSupportedDeliveryModesQueryResetEvent()`, () => {
      mockEventStream$.next(new LoginEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutSupportedDeliveryModesQueryResetEvent
      );
    });
  });
});
