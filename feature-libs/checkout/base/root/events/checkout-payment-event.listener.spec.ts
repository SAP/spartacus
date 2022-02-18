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
  CheckoutPaymentDetailsCreatedEvent,
  CheckoutPaymentDetailsSetEvent,
  CheckoutResetQueryEvent,
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
    it(`should dispatch CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(new CheckoutPaymentDetailsCreatedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`CheckoutPaymentDetailsSetEvent should dispatch CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(new CheckoutPaymentDetailsSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    describe(`global message`, () => {
      it(`CheckoutPaymentDetailsCreatedEvent should add a global message`, () => {
        mockEventStream$.next(new CheckoutPaymentDetailsCreatedEvent());

        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'paymentForm.paymentAddedSuccessfully' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });
    });
  });
});
