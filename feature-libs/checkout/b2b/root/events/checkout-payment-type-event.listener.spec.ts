import { TestBed } from '@angular/core/testing';
import {
  CheckoutQueryResetEvent,
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
  CheckoutPaymentTypesQueryReloadEvent,
  CheckoutPaymentTypesQueryResetEvent,
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

    it(`CheckoutPaymentTypeSetEvent should dispatch CheckoutQueryResetEvent`, () => {
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });
  });

  describe(`onGetPaymentTypesQueryReload`, () => {
    it(`LanguageSetEvent should dispatch CheckoutPaymentTypesQueryReloadEvent()`, () => {
      mockEventStream$.next(new LanguageSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutPaymentTypesQueryReloadEvent
      );
    });

    it(`LanguageSetEvent should dispatch CheckoutPaymentTypesQueryReloadEvent()`, () => {
      mockEventStream$.next(new CurrencySetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutPaymentTypesQueryReloadEvent
      );
    });
  });

  describe(`onGetPaymentTypesQueryReset`, () => {
    it(`LogoutEvent should dispatch CheckoutPaymentTypesQueryResetEvent()`, () => {
      mockEventStream$.next(new LogoutEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutPaymentTypesQueryResetEvent
      );
    });

    it(`LoginEvent should dispatch CheckoutPaymentTypesQueryResetEvent()`, () => {
      mockEventStream$.next(new LoginEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutPaymentTypesQueryResetEvent
      );
    });
  });
});
