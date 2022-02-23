import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, RemoveCartEvent } from '@spartacus/cart/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderScheduledEvent,
  ScheduleReplenishmentForm,
  UnnamedFacade,
} from '@spartacus/order/root';
import { of } from 'rxjs';
import { UnnamedReplenishmentOrderConnector } from '../connectors/unnamed-replenishment-order.connector';
import { UnnamedScheduledReplenishmentService } from './unnamed-scheduled-replenishment.service';

import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockReplenishmentOrder: ReplenishmentOrder = {
  replenishmentOrderCode: 'replenishmentOrderCode',
};
const mockScheduleReplenishmentForm: ScheduleReplenishmentForm = {
  numberOfDays: '1',
};
const termsChecked = true;

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(of());
  dispatch = createSpy();
}

class MockUnnamedReplenishmentOrderConnector
  implements Partial<UnnamedReplenishmentOrderConnector>
{
  scheduleReplenishmentOrder = createSpy().and.returnValue(
    of(mockReplenishmentOrder)
  );
}

class MockUnnamedFacade implements Partial<UnnamedFacade> {
  setCurrentOrder = createSpy();
}

describe(`UnnamedScheduledReplenishmentService`, () => {
  let service: UnnamedScheduledReplenishmentService;
  let connector: UnnamedReplenishmentOrderConnector;
  let checkoutFacade: UnnamedFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnnamedScheduledReplenishmentService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: UnnamedReplenishmentOrderConnector,
          useClass: MockUnnamedReplenishmentOrderConnector,
        },
        {
          provide: UnnamedFacade,
          useClass: MockUnnamedFacade,
        },
      ],
    });

    service = TestBed.inject(UnnamedScheduledReplenishmentService);
    connector = TestBed.inject(UnnamedReplenishmentOrderConnector);
    checkoutFacade = TestBed.inject(UnnamedFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject UnnamedScheduledReplenishmentService`, inject(
    [UnnamedScheduledReplenishmentService],
    (
      checkoutScheduledReplenishmentService: UnnamedScheduledReplenishmentService
    ) => {
      expect(checkoutScheduledReplenishmentService).toBeTruthy();
    }
  ));

  describe(`scheduleReplenishmentOrder`, () => {
    it(`should call checkoutDeliveryConnector.createAddress`, () => {
      service.scheduleReplenishmentOrder(
        mockScheduleReplenishmentForm,
        termsChecked
      );

      expect(connector.scheduleReplenishmentOrder).toHaveBeenCalledWith(
        mockCartId,
        mockScheduleReplenishmentForm,
        termsChecked,
        mockUserId
      );
    });

    it(`should call checkoutFacade`, () => {
      service.scheduleReplenishmentOrder(
        mockScheduleReplenishmentForm,
        termsChecked
      );

      expect(checkoutFacade.setCurrentOrder).toHaveBeenCalledWith(
        mockReplenishmentOrder
      );
    });

    it(`should dispatch RemoveCartEvent`, () => {
      service.scheduleReplenishmentOrder(
        mockScheduleReplenishmentForm,
        termsChecked
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        RemoveCartEvent
      );
    });

    // TODO:#deprecation-checkout Replace with event testing once we remove ngrx store.
    it(`should dispatch ReplenishmentOrderScheduledEvent`, () => {
      service.scheduleReplenishmentOrder(
        mockScheduleReplenishmentForm,
        termsChecked
      );

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          replenishmentOrder: mockReplenishmentOrder,
        },
        ReplenishmentOrderScheduledEvent
      );
    });
  });
});
