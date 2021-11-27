import { TestBed } from '@angular/core/testing';
import {
  ClearCheckoutDeliveryAddressEvent,
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from '@spartacus/checkout/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { CostCenterSetEvent } from './checkout-b2b.events';
import { CheckoutCostCenterEventListener } from './checkout-cost-center-event.listener';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

const mockCartId = 'mockCartId';
const mockUserId = 'mockUserId';
const mockCode = 'mockCode';

describe(`CheckoutCostCenterEventListener`, () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutCostCenterEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutCostCenterEventListener);
    eventService = TestBed.inject(EventService);
  });

  describe(`onCostCenterChange`, () => {
    it(`should dispatch ResetDeliveryModesEvent`, () => {
      mockEventStream$.next(new CostCenterSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetDeliveryModesEvent
      );
    });

    it(`should dispatch ClearCheckoutDeliveryAddressEvent`, () => {
      const event = createFrom(CostCenterSetEvent, {
        code: mockCode,
        cartId: mockCartId,
        userId: mockUserId,
      });
      mockEventStream$.next(event);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { cartId: mockCartId, userId: mockUserId },
        ClearCheckoutDeliveryAddressEvent
      );
    });

    it(`should dispatch ResetCheckoutQueryEvent`, () => {
      mockEventStream$.next(new CostCenterSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        ResetCheckoutQueryEvent
      );
    });
  });
});
