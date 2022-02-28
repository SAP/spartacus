import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, RemoveCartEvent } from '@spartacus/cart/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { CheckoutOrderPlacedEvent, Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderConnector } from '../connectors/order.connector';
import { UnnamedService } from './unnamed.service';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const termsChecked = true;
const mockOrder: Order = { code: 'mockOrderCode' };

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockUnnamedConnector implements Partial<OrderConnector> {
  placeOrder = createSpy().and.returnValue(of(mockOrder));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(of());
  dispatch = createSpy();
}

describe(`UnnamedService`, () => {
  let service: UnnamedService;
  let connector: OrderConnector;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnnamedService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: OrderConnector,
          useClass: MockUnnamedConnector,
        },
        { provide: EventService, useClass: MockEventService },
      ],
    });

    service = TestBed.inject(UnnamedService);
    connector = TestBed.inject(OrderConnector);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject UnnamedService`, inject(
    [UnnamedService],
    (checkoutService: UnnamedService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  describe(`placeOrder`, () => {
    it(`should call checkoutConnector.placeOrder`, () => {
      service.placeOrder(termsChecked);

      expect(connector.placeOrder).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        termsChecked
      );
    });

    it(`should dispatch RemoveCartEvent`, () => {
      service.placeOrder(termsChecked);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, cartCode: mockCartId },
        RemoveCartEvent
      );
    });

    it(`should dispatch CheckoutOrderPlacedEvent`, () => {
      service.placeOrder(termsChecked);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          order: mockOrder,
        },
        CheckoutOrderPlacedEvent
      );
    });
  });

  describe(`getOrderDetails`, () => {
    it(`should return falsy when there's no order`, (done) => {
      service
        .getOrderDetails()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeFalsy();
          done();
        });
    });

    it(`should return an order when it is placed`, (done) => {
      service.placeOrder(termsChecked);

      service
        .getOrderDetails()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockOrder);
          done();
        });
    });
  });

  describe(`clearPlacedOrder`, () => {
    it(`should clear the order`, (done) => {
      service.placeOrder(termsChecked);
      service.clearPlacedOrder();

      service
        .getOrderDetails()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(undefined);
          done();
        });
    });
  });

  describe(`setPlacedOrder`, () => {
    it(`should set a new order`, (done) => {
      const newMockOrder: Order = { code: 'newMockCode' };

      service.setPlacedOrder(newMockOrder);

      service
        .getOrderDetails()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(newMockOrder);
          done();
        });
    });
  });
});
