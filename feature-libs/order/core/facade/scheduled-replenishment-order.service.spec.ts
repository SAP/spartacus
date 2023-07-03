import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
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
import { EMPTY, of } from 'rxjs';
import { ScheduledReplenishmentOrderConnector } from '../connectors/scheduled-replenishment-order.connector';
import { ScheduledReplenishmentOrderService } from './scheduled-replenishment-order.service';

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
  get = createSpy().and.returnValue(EMPTY);
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

describe(`ScheduledReplenishmentOrderService`, () => {
  let service: ScheduledReplenishmentOrderService;
  let connector: ScheduledReplenishmentOrderConnector;
  let orderFacade: OrderFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduledReplenishmentOrderService,
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

    service = TestBed.inject(ScheduledReplenishmentOrderService);
    connector = TestBed.inject(ScheduledReplenishmentOrderConnector);
    orderFacade = TestBed.inject(OrderFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject ScheduledReplenishmentOrderService`, inject(
    [ScheduledReplenishmentOrderService],
    (
      scheduledReplenishmentOrderService: ScheduledReplenishmentOrderService
    ) => {
      expect(scheduledReplenishmentOrderService).toBeTruthy();
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

    it(`should call orderFacade`, () => {
      service.scheduleReplenishmentOrder(
        mockScheduleReplenishmentForm,
        termsChecked
      );

      expect(orderFacade.setPlacedOrder).toHaveBeenCalledWith(
        mockReplenishmentOrder
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
          cartCode: mockCartId,
          replenishmentOrder: mockReplenishmentOrder,
        },
        ReplenishmentOrderScheduledEvent
      );
    });
  });
});
