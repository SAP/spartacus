import { TestBed } from '@angular/core/testing';
import { CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { CheckoutPaymentEventListener } from './checkout-payment-event.listener';
import {
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
  ResetCheckoutQueryEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutPaymentEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPaymentEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutPaymentEventListener);
    eventService = TestBed.inject(EventService);
  });

  describe(`onPaymentChange`, () => {
    it(`should dispatch ResetCheckoutQueryEvent`, () => {
      mockEventStream$.next(new PaymentDetailsCreatedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });

    it(`PaymentDetailsSetEvent dispatch ResetCheckoutQueryEvent`, () => {
      mockEventStream$.next(new PaymentDetailsSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });
});
