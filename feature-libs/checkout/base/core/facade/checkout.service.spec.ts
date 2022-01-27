import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, RemoveCartEvent } from '@spartacus/cart/base/root';
import { CheckoutOrderPlacedEvent } from '@spartacus/checkout/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutService } from './checkout.service';
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

class MockCheckoutConnector implements Partial<CheckoutConnector> {
  placeOrder = createSpy().and.returnValue(of(mockOrder));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(of());
  dispatch = createSpy();
}

describe(`CheckoutService`, () => {
  let service: CheckoutService;
  let connector: CheckoutConnector;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: CheckoutConnector,
          useClass: MockCheckoutConnector,
        },
        { provide: EventService, useClass: MockEventService },
      ],
    });

    service = TestBed.inject(CheckoutService);
    connector = TestBed.inject(CheckoutConnector);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject CheckoutService`, inject(
    [CheckoutService],
    (checkoutService: CheckoutService) => {
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

  describe(`clearOrder`, () => {
    it(`should clear the order`, (done) => {
      service.placeOrder(termsChecked);
      service.clearOrder();

      service
        .getOrderDetails()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(undefined);
          done();
        });
    });
  });

  describe(`setOrder`, () => {
    it(`should set a new order`, (done) => {
      const newMockOrder: Order = { code: 'newMockCode' };

      service.setOrder(newMockOrder);

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
