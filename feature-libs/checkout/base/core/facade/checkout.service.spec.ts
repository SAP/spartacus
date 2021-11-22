import { AbstractType, Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OrderPlacedEvent } from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Cart,
  CartActions,
  EventService,
  OCC_USER_ID_CURRENT,
  Order,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutService } from './checkout.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const termsChecked = true;
const mockOrder: Order = { code: 'mockOrderCode' };

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

class MockCheckoutConnector implements Partial<CheckoutConnector> {
  placeOrder(
    _userId: string,
    _cartId: string,
    _termsChecked: boolean
  ): Observable<Order> {
    return of(mockOrder);
  }
}

class MockEventService implements Partial<EventService> {
  get<T>(_eventType: AbstractType<T>): Observable<T> {
    return of();
  }
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
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
        { provide: ActiveCartService, useClass: MockActiveCartService },
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
      spyOn(connector, 'placeOrder').and.callThrough();

      service.placeOrder(termsChecked);

      expect(connector.placeOrder).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        termsChecked
      );
    });

    // TODO: Replace with event testing once we remove ngrx store.
    it(`should dispatch CartActions.RemoveCart`, () => {
      spyOn(store, 'dispatch').and.stub();

      service.placeOrder(termsChecked);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.RemoveCart({ cartId: mockCartId })
      );
    });

    it(`should dispatch OrderPlacedEvent`, () => {
      spyOn(eventService, 'dispatch').and.stub();

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
    it(`should return an order`, () => {
      service.placeOrder(termsChecked);

      service
        .getOrder()
        .subscribe((result) => {
          expect(result).toEqual(mockOrder);
        })
        .unsubscribe();
    });
  });

  describe(`setOrder`, () => {
    it(`should set a new order`, () => {
      const newMockOrder: Order = { code: 'newMockCode' };

      service.setOrder(newMockOrder);

      service
        .getOrder()
        .subscribe((result) => {
          expect(result).toEqual(newMockOrder);
        })
        .unsubscribe();
    });
  });

  describe(`clearOrder`, () => {
    it(`should clear the order`, () => {
      service.clearOrder();

      service
        .getOrder()
        .subscribe((result) => {
          expect(result).toEqual(undefined);
        })
        .unsubscribe();
    });
  });
});
