import { TestBed } from '@angular/core/testing';
import {
  CheckoutResetQueryEvent,
  CheckoutSupportedDeliveryModesQueryResetEvent,
} from '@spartacus/checkout/base/root';
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
import {
  CheckoutPaymentTypeSetEvent,
  CheckoutReloadPaymentTypesEvent,
  CheckoutResetPaymentTypesEvent,
} from './checkout-b2b.events';
import { CheckoutPaymentTypeEventListener } from './checkout-payment-type-event.listener';
import createSpy = jasmine.createSpy;

const mockUserId = 'test-user-id';
const mockCartId = 'test-cart-id';
const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutPaymentTypeEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPaymentTypeEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutPaymentTypeEventListener);
    eventService = TestBed.inject(EventService);
  });

  describe(`onPaymentTypeSet`, () => {
    beforeEach(() => {
      mockEventStream$.next(
        createFrom(CheckoutPaymentTypeSetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          paymentTypeCode: 'test-type-code',
        })
      );
    });

    it(`CheckoutPaymentTypeSetEvent should dispatch CheckoutSupportedDeliveryModesQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        CheckoutSupportedDeliveryModesQueryResetEvent
      );
    });

    it(`CheckoutPaymentTypeSetEvent should dispatch CheckoutResetQueryEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
  });

  describe(`onGetPaymentTypesQueryReload`, () => {
    it(`LanguageSetEvent should dispatch CheckoutReloadPaymentTypesEvent()`, () => {
      mockEventStream$.next(new LanguageSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutReloadPaymentTypesEvent
      );
    });

    it(`LanguageSetEvent should dispatch CheckoutReloadPaymentTypesEvent()`, () => {
      mockEventStream$.next(new CurrencySetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutReloadPaymentTypesEvent
      );
    });
  });

  describe(`onGetPaymentTypesQueryReset`, () => {
    it(`LogoutEvent should dispatch CheckoutResetPaymentTypesEvent()`, () => {
      mockEventStream$.next(new LogoutEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetPaymentTypesEvent
      );
    });

    it(`LoginEvent should dispatch CheckoutResetPaymentTypesEvent()`, () => {
      mockEventStream$.next(new LoginEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetPaymentTypesEvent
      );
    });
  });
});
