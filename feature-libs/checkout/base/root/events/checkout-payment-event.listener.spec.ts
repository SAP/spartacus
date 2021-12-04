import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
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

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe(`CheckoutPaymentEventListener`, () => {
  let eventService: EventService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPaymentEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });

    TestBed.inject(CheckoutPaymentEventListener);
    eventService = TestBed.inject(EventService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe(`onPaymentChange`, () => {
    it(`should dispatch ResetCheckoutQueryEvent`, () => {
      mockEventStream$.next(new PaymentDetailsCreatedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });

    it(`PaymentDetailsSetEvent should dispatch ResetCheckoutQueryEvent`, () => {
      mockEventStream$.next(new PaymentDetailsSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });

    it(`PaymentDetailsSetEvent should add a global message`, () => {
      mockEventStream$.next(new PaymentDetailsSetEvent());

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'paymentMethods.paymentMethodSelectedSuccess' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });
});
