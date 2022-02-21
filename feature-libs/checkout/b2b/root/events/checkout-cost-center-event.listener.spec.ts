import { TestBed } from '@angular/core/testing';
import {
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from '@spartacus/checkout/base/root';
import { CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { CostCenterSetEvent } from './checkout-b2b.events';
import { CheckoutCostCenterEventListener } from './checkout-cost-center-event.listener';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

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
    it(`should dispatch CheckoutResetDeliveryModesEvent`, () => {
      mockEventStream$.next(new CostCenterSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetDeliveryModesEvent
      );
    });

    it(`should dispatch CheckoutResetQueryEvent`, () => {
      mockEventStream$.next(new CostCenterSetEvent());

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        CheckoutResetQueryEvent
      );
    });
  });
});
