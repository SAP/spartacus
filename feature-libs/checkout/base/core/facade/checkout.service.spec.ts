import { inject, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CartActions } from '@spartacus/cart/main/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { OrderPlacedEvent } from '@spartacus/checkout/base/root';
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
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutService,
        provideMockStore(),
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
    store = TestBed.inject(MockStore);
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

    // TODO:#deprecation-checkout Replace with event testing once we remove ngrx store.
    it(`should dispatch CartActions.RemoveCart`, () => {
      spyOn(store, 'dispatch').and.stub();

      service.placeOrder(termsChecked);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.RemoveCart({ cartId: mockCartId })
      );
    });

    it(`should dispatch OrderPlacedEvent`, () => {
      service.placeOrder(termsChecked);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          order: mockOrder,
        },
        OrderPlacedEvent
      );
    });
  });

  describe(`getOrder`, () => {
    it(`should return falsy when there's no order`, (done) => {
      service
        .getOrder()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toBeFalsy();
          done();
        });
    });

    it(`should return an order when it is placed`, (done) => {
      service.placeOrder(termsChecked);

      service
        .getOrder()
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
        .getOrder()
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
        .getOrder()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(newMockOrder);
          done();
        });
    });
  });
});
