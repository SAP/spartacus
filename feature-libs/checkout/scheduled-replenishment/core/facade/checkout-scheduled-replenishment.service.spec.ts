import { inject, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CartActions } from '@spartacus/cart/main/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { CheckoutFacade, ORDER_TYPE } from '@spartacus/checkout/base/root';
import {
  ReplenishmentOrderScheduledEvent,
  ScheduleReplenishmentForm,
} from '@spartacus/checkout/scheduled-replenishment/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { ReplenishmentOrder } from '@spartacus/order/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutReplenishmentOrderConnector } from '../connectors/checkout-replenishment-order/checkout-replenishment-order.connector';
import { CheckoutScheduledReplenishmentService } from './checkout-scheduled-replenishment.service';
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

class MockCheckoutReplenishmentOrderConnector
  implements Partial<CheckoutReplenishmentOrderConnector>
{
  scheduleReplenishmentOrder = createSpy().and.returnValue(
    of(mockReplenishmentOrder)
  );
}

class MockCheckoutFacade implements Partial<CheckoutFacade> {
  setOrder = createSpy();
}

describe(`CheckoutScheduledReplenishmentService`, () => {
  let service: CheckoutScheduledReplenishmentService;
  let connector: CheckoutReplenishmentOrderConnector;
  let store: MockStore;
  let checkoutFacade: CheckoutFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutScheduledReplenishmentService,
        provideMockStore(),
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: CheckoutReplenishmentOrderConnector,
          useClass: MockCheckoutReplenishmentOrderConnector,
        },
        {
          provide: CheckoutFacade,
          useClass: MockCheckoutFacade,
        },
      ],
    });

    service = TestBed.inject(CheckoutScheduledReplenishmentService);
    connector = TestBed.inject(CheckoutReplenishmentOrderConnector);
    store = TestBed.inject(MockStore);
    checkoutFacade = TestBed.inject(CheckoutFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject CheckoutScheduledReplenishmentService`, inject(
    [CheckoutScheduledReplenishmentService],
    (
      checkoutScheduledReplenishmentService: CheckoutScheduledReplenishmentService
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

      expect(checkoutFacade.setOrder).toHaveBeenCalledWith(
        mockReplenishmentOrder
      );
    });

    // TODO:#deprecation-checkout Replace with event testing once we remove ngrx store.
    it(`should dispatch CartActions.RemoveCart`, () => {
      spyOn(store, 'dispatch').and.stub();

      service.scheduleReplenishmentOrder(
        mockScheduleReplenishmentForm,
        termsChecked
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.RemoveCart({ cartId: mockCartId })
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

    describe(`getOrderType and setOrderType`, () => {
      it(`should set an order type return an order type`, (done) => {
        service.setOrderType(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER);

        service
          .getOrderType()
          .pipe(take(1))
          .subscribe((result) => {
            expect(result).toEqual(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER);
            done();
          });
      });
    });
  });
});
