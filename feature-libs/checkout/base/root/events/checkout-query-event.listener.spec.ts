import { TestBed } from '@angular/core/testing';
import { MergeCartSuccessEvent } from '@spartacus/cart/base/root';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CurrencySetEvent,
  CxEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subject } from 'rxjs';
import { CheckoutQueryEventListener } from './checkout-query-event.listener';
import {
  CheckoutQueryReloadEvent,
  CheckoutQueryResetEvent,
} from './checkout.events';

import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutQueryEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutQueryEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutQueryEventListener);
    eventService = TestBed.inject(EventService);
  });

  describe(`onCheckoutQueryReload`, () => {
    it(`LanguageSetEvent should dispatch CheckoutQueryReloadEvent()`, () => {
      mockEventStream$.next(new LanguageSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryReloadEvent
      );
    });

    it(`LanguageSetEvent should dispatch CheckoutQueryReloadEvent()`, () => {
      mockEventStream$.next(new CurrencySetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryReloadEvent
      );
    });
  });

  describe(`onCheckoutQueryReset`, () => {
    it(`LogoutEvent should dispatch CheckoutQueryResetEvent()`, () => {
      mockEventStream$.next(new LogoutEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });

    it(`LoginEvent should dispatch CheckoutQueryResetEvent()`, () => {
      mockEventStream$.next(new LoginEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });

    it(`SaveCartSuccessEvent should dispatch CheckoutQueryResetEvent()`, () => {
      mockEventStream$.next(new SaveCartSuccessEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });

    it(`RestoreSavedCartSuccessEvent should dispatch CheckoutQueryResetEvent()`, () => {
      mockEventStream$.next(new RestoreSavedCartSuccessEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });

    it(`MergeCartSuccessEvent should dispatch CheckoutQueryResetEvent()`, () => {
      mockEventStream$.next(new MergeCartSuccessEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });

    it(`OrderPlacedEvent should dispatch CheckoutQueryResetEvent()`, () => {
      mockEventStream$.next(new OrderPlacedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutQueryResetEvent
      );
    });
  });
});
