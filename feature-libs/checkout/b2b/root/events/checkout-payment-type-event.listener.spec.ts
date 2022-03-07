import { TestBed } from '@angular/core/testing';
import {
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from '@spartacus/checkout/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { PaymentTypeSetEvent } from './checkout-b2b.events';
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

  describe(`onPaymentTypeChange`, () => {
    it(`should dispatch CheckoutResetDeliveryModesEvent`, () => {
      mockEventStream$.next(
        createFrom(PaymentTypeSetEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          paymentTypeCode: 'test-type-code',
        })
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId },
        CheckoutResetDeliveryModesEvent
      );
    });

    it(`should dispatch CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(new PaymentTypeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
  });
});
