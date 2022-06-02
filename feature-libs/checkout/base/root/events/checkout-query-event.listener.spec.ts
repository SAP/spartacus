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
  CheckoutReloadQueryEvent,
  CheckoutResetQueryEvent,
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

  describe(`onGetQueryReload`, () => {
    it(`LanguageSetEvent should dispatch CheckoutReloadQueryEvent()`, () => {
      mockEventStream$.next(new LanguageSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutReloadQueryEvent
      );
    });

    it(`LanguageSetEvent should dispatch CheckoutReloadQueryEvent()`, () => {
      mockEventStream$.next(new CurrencySetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutReloadQueryEvent
      );
    });
  });

  describe(`onGetQueryReset`, () => {
    it(`LogoutEvent should dispatch CheckoutResetQueryEvent()`, () => {
      mockEventStream$.next(new LogoutEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`LoginEvent should dispatch CheckoutResetQueryEvent()`, () => {
      mockEventStream$.next(new LoginEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`SaveCartSuccessEvent should dispatch CheckoutResetQueryEvent()`, () => {
      mockEventStream$.next(new SaveCartSuccessEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`RestoreSavedCartSuccessEvent should dispatch CheckoutResetQueryEvent()`, () => {
      mockEventStream$.next(new RestoreSavedCartSuccessEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`MergeCartSuccessEvent should dispatch CheckoutResetQueryEvent()`, () => {
      mockEventStream$.next(new MergeCartSuccessEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });

    it(`OrderPlacedEvent should dispatch CheckoutResetQueryEvent()`, () => {
      mockEventStream$.next(new OrderPlacedEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
  });
});
