import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subject } from 'rxjs';
import { CheckoutConfig } from '../config/checkout-config';
import { CheckoutPaymentEventListener } from './checkout-payment-event.listener';
import {
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
  ResetCheckoutQueryEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

const mockConfig: Required<CheckoutConfig> = {
  checkout: { express: false },
};
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
  let checkoutConfig: CheckoutConfig;

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
        { provide: CheckoutConfig, useValue: mockConfig },
      ],
    });

    TestBed.inject(CheckoutPaymentEventListener);
    eventService = TestBed.inject(EventService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    checkoutConfig = TestBed.inject(CheckoutConfig);
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

    describe(`global message`, () => {
      describe(`when express checkout is disabled`, () => {
        it(`PaymentDetailsSetEvent should add a global message`, () => {
          mockEventStream$.next(new PaymentDetailsSetEvent());

          expect(globalMessageService.add).toHaveBeenCalledWith(
            { key: 'paymentMethods.paymentMethodSelectedSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        });
      });

      describe(`when express checkout is enabled`, () => {
        it(`PaymentDetailsSetEvent should NOT add a global message`, () => {
          (checkoutConfig as Required<CheckoutConfig>).checkout.express = true;
          mockEventStream$.next(new PaymentDetailsSetEvent());

          expect(globalMessageService.add).not.toHaveBeenCalled();
        });
      });
    });
  });
});
