import { TestBed } from '@angular/core/testing';
import { PaymentDetails } from '@spartacus/cart/base/root';
import {
  createFrom,
  CurrencySetEvent,
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageSetEvent,
  LoadUserPaymentMethodsEvent,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { Subject } from 'rxjs';
import { CheckoutPaymentEventListener } from './checkout-payment-event.listener';
import {
  CheckoutPaymentDetailsCreatedEvent,
  CheckoutPaymentDetailsSetEvent,
  CheckoutReloadPaymentCardTypesEvent,
  CheckoutResetQueryEvent,
} from './checkout.events';
import createSpy = jasmine.createSpy;

const mockPaymentInfo: PaymentDetails = {
  id: 'mockPaymentId',
};
const mockUserId = 'test-user-id';

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

  describe(`onPaymentCreated`, () => {
    describe(`when user is NOT anonymous`, () => {
      beforeEach(() => {
        mockEventStream$.next(
          createFrom(CheckoutPaymentDetailsCreatedEvent, {
            userId: mockUserId,
            paymentDetails: mockPaymentInfo,
          })
        );
      });

      it(`CheckoutPaymentDetailsCreatedEvent should dispatch CheckoutResetQueryEvent `, () => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          CheckoutResetQueryEvent
        );
      });

      it(`CheckoutPaymentDetailsCreatedEvent should dispatch LoadUserPaymentMethodsEvent`, () => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          { userId: mockUserId },
          LoadUserPaymentMethodsEvent
        );
      });
    });

    describe(`when user is anonymous`, () => {
      beforeEach(() => {
        mockEventStream$.next(
          createFrom(CheckoutPaymentDetailsCreatedEvent, {
            userId: OCC_USER_ID_ANONYMOUS,
            paymentDetails: mockPaymentInfo,
          })
        );
      });

      it(`CheckoutPaymentDetailsCreatedEvent should dispatch CheckoutResetQueryEvent `, () => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          CheckoutResetQueryEvent
        );
      });

      it(`CheckoutPaymentDetailsCreatedEvent should dispatch LoadUserPaymentMethodsEvent`, () => {
        expect(eventService.dispatch).not.toHaveBeenCalledWith(
          { userId: OCC_USER_ID_ANONYMOUS },
          LoadUserPaymentMethodsEvent
        );
      });

      it(`CheckoutPaymentDetailsCreatedEvent should add a global message`, () => {
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'paymentForm.paymentAddedSuccessfully' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });
    });
  });

  describe(`onPaymentSet`, () => {
    it(`CheckoutPaymentDetailsSetEvent should dispatch CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(new CheckoutPaymentDetailsSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
  });

  describe(`onGetCardTypesQueryReload`, () => {
    it(`LanguageSetEvent should dispatch CheckoutReloadPaymentCardTypesEvent()`, () => {
      mockEventStream$.next(new LanguageSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutReloadPaymentCardTypesEvent
      );
    });

    it(`LanguageSetEvent should dispatch CheckoutReloadPaymentCardTypesEvent()`, () => {
      mockEventStream$.next(new CurrencySetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutReloadPaymentCardTypesEvent
      );
    });
  });
});
