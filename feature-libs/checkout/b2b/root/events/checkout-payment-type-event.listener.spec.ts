import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from '@spartacus/checkout/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { PaymentTypeSetEvent } from './checkout-b2b.events';
import { CheckoutPaymentTypeEventListener } from './checkout-payment-type-event.listener';

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return mockEventStream$.asObservable();
  }
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
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
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new PaymentTypeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
    });

    it(`should dispatch ResetCheckoutQueryEvent`, () => {
      spyOn(eventService, 'dispatch');

      mockEventStream$.next(new PaymentTypeSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });
});
