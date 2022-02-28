import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, RemoveCartEvent } from '@spartacus/cart/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import {
  OrderFacade,
  ReplenishmentOrder,
  ReplenishmentOrderScheduledEvent,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { of } from 'rxjs';
import { ScheduledReplenishmentOrderConnector } from '../connectors/scheduled-replenishment-order.connector';
import { ScheduledReplenishmentService } from './scheduled-replenishment.service';

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

class MockScheduledReplenishmentOrderConnector
  implements Partial<ScheduledReplenishmentOrderConnector>
{
  scheduleReplenishmentOrder = createSpy().and.returnValue(
    of(mockReplenishmentOrder)
  );
}

class MockOrderFacade implements Partial<OrderFacade> {
  setPlacedOrder = createSpy();
}

describe(`ScheduledReplenishmentService`, () => {
  let service: ScheduledReplenishmentService;
  let connector: ScheduledReplenishmentOrderConnector;
  let checkoutFacade: OrderFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduledReplenishmentService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: ScheduledReplenishmentOrderConnector,
          useClass: MockScheduledReplenishmentOrderConnector,
        },
        {
          provide: OrderFacade,
          useClass: MockOrderFacade,
        },
      ],
    });

    service = TestBed.inject(ScheduledReplenishmentService);
    connector = TestBed.inject(ScheduledReplenishmentOrderConnector);
    checkoutFacade = TestBed.inject(OrderFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject ScheduledReplenishmentService`, inject(
    [ScheduledReplenishmentService],
    (checkoutScheduledReplenishmentService: ScheduledReplenishmentService) => {
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

      expect(checkoutFacade.setPlacedOrder).toHaveBeenCalledWith(
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
