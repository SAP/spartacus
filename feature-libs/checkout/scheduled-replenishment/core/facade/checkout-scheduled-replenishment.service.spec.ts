import { AbstractType, Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { ReplenishmentOrderScheduledEvent } from '@spartacus/checkout/scheduled-replenishment/root';
import {
  ActiveCartService,
  Cart,
  CartActions,
  EventService,
  OCC_USER_ID_CURRENT,
  Order,
  ORDER_TYPE,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutReplenishmentOrderConnector } from '../connectors/checkout-replenishment-order/checkout-replenishment-order.connector';
import { CheckoutScheduledReplenishmentService } from './checkout-scheduled-replenishment.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockReplenishmentOrder: ReplenishmentOrder = {
  replenishmentOrderCode: 'replenishmentOrderCode',
};
const mockScheduleReplenishmentForm: ScheduleReplenishmentForm = {
  numberOfDays: '1',
};
const termsChecked = true;

class MockActiveCartService implements Partial<ActiveCartService> {
  takeActiveCartId(): Observable<string> {
    return of(mockCartId);
  }
  isGuestCart(_cart?: Cart): boolean {
    return false;
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(_loggedIn = false): Observable<string> {
    return of(mockUserId);
  }
}

class MockEventService implements Partial<EventService> {
  get<T>(_eventType: AbstractType<T>): Observable<T> {
    return of({} as T);
  }
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
}

class MockCheckoutReplenishmentOrderConnector
  implements Partial<CheckoutReplenishmentOrderConnector>
{
  scheduleReplenishmentOrder(
    _cartId: string,
    _scheduleReplenishmentForm: ScheduleReplenishmentForm,
    _termsChecked: boolean,
    _userId: string
  ): Observable<ReplenishmentOrder> {
    return of(mockReplenishmentOrder);
  }
}

class MockCheckoutFacade implements Partial<CheckoutFacade> {
  setOrder(_order: Order): void {}
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
        { provide: ActiveCartService, useClass: MockActiveCartService },
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
      spyOn(connector, 'scheduleReplenishmentOrder').and.stub();

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
      spyOn(checkoutFacade, 'setOrder').and.stub();

      service.scheduleReplenishmentOrder(
        mockScheduleReplenishmentForm,
        termsChecked
      );

      expect(checkoutFacade.setOrder).toHaveBeenCalledWith(
        mockReplenishmentOrder
      );
    });

    // TODO: Replace with event testing once we remove ngrx store.
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

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should dispatch ReplenishmentOrderScheduledEvent`, () => {
      spyOn(eventService, 'dispatch').and.stub();

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
