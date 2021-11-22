import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CxEvent, EventService } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { CheckoutPaymentEventListener } from './checkout-payment-event.listener';
import {
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
  ResetCheckoutQueryEvent,
} from './checkout.events';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
}

describe('CheckoutPaymentEventListener', () => {
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

  describe('onPaymentChange', () => {
    it('should dispatch ResetCheckoutQueryEvent', () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new PaymentDetailsCreatedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });

    it('PaymentDetailsSetEvent dispatch ResetCheckoutQueryEvent', () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new PaymentDetailsSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });
});
