import { TestBed } from '@angular/core/testing';
import {
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from '@spartacus/checkout/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { PaymentTypeSetEvent } from './checkout-b2b.events';
import { CheckoutPaymentTypeEventListener } from './checkout-payment-type-event.listener';
import createSpy = jasmine.createSpy;

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
    it(`should dispatch ResetDeliveryModesEvent`, () => {
      mockEventStream$.next(new PaymentTypeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
    });

    it(`should dispatch ResetCheckoutQueryEvent`, () => {
      mockEventStream$.next(new PaymentTypeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });
});
