import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { Order, OrderPlacedEvent } from '@spartacus/order/root';
import { EMPTY, firstValueFrom, of } from 'rxjs';
import { OrderConnector } from '../connectors/order.connector';
import { OrderService } from './order.service';
import { vi } from 'vitest';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const termsChecked = true;
const mockOrder: Order = { code: 'mockOrderCode' };

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = vi.fn().mockReturnValue(of(mockCartId));
  isGuestCart = vi.fn().mockReturnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockOrderConnector implements Partial<OrderConnector> {
  placeOrder = vi.fn().mockReturnValue(of(mockOrder));
  placePaymentAuthorizedOrder = vi.fn().mockReturnValue(of(mockOrder));
}

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockReturnValue(EMPTY);
  dispatch = vi.fn();
}

describe(`OrderService`, () => {
  let service: OrderService;
  let connector: OrderConnector;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: OrderConnector,
          useClass: MockOrderConnector,
        },
        { provide: EventService, useClass: MockEventService },
      ],
    });

    service = TestBed.inject(OrderService);
    connector = TestBed.inject(OrderConnector);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject OrderService`, inject(
    [OrderService],
    (orderService: OrderService) => {
      expect(orderService).toBeTruthy();
    }
  ));

  describe(`placeOrder`, () => {
    it(`should call orderConnector.placeOrder`, () => {
      service.placeOrder(termsChecked);

      expect(connector.placeOrder).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        termsChecked
      );
    });

    it(`should dispatch OrderPlacedEvent`, () => {
      service.placeOrder(termsChecked);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
          order: mockOrder,
        },
        OrderPlacedEvent
      );
    });
  });

  describe(`placePaymentAuthorizedOrder`, () => {
    it(`should call orderConnector.placePaymentAuthorizedOrder`, () => {
      service.placePaymentAuthorizedOrder(termsChecked);

      expect(connector.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        termsChecked
      );
    });

    it(`should dispatch OrderPlacedEvent`, () => {
      service.placePaymentAuthorizedOrder(termsChecked);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          order: mockOrder,
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        },
        OrderPlacedEvent
      );
    });

    it(`should place order for explicit cartId`, () => {
      const explicitCartId = 'quick-buy-cart-id';

      service
        .placePaymentAuthorizedOrder(termsChecked, explicitCartId)
        .subscribe();

      expect(connector.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
        mockUserId,
        explicitCartId,
        termsChecked
      );
    });
  });

  describe(`getOrderDetails`, () => {
    it(`should return falsy when there's no order`, async () => {
      const result = await firstValueFrom(service.getOrderDetails());
      expect(result).toBeFalsy();
    });

    it(`should return an order when it is placed`, async () => {
      service.placeOrder(termsChecked);

      const result = await firstValueFrom(service.getOrderDetails());
      expect(result).toEqual(mockOrder);
    });
  });

  describe(`clearPlacedOrder`, () => {
    it(`should clear the order`, async () => {
      service.placeOrder(termsChecked);
      service.clearPlacedOrder();

      const result = await firstValueFrom(service.getOrderDetails());
      expect(result).toEqual(undefined);
    });
  });

  describe(`setPlacedOrder`, () => {
    it(`should set a new order`, async () => {
      const newMockOrder: Order = { code: 'newMockCode' };

      service.setPlacedOrder(newMockOrder);

      const result = await firstValueFrom(service.getOrderDetails());
      expect(result).toEqual(newMockOrder);
    });
  });

  describe('getPickupEntries and getDeliveryEntries', () => {
    const entries: OrderEntry[] = [
      { orderCode: 'pickupEntry', deliveryPointOfService: { name: 'test' } },
      { orderCode: 'deliveryEntry' },
    ];

    it('should be able to get pickup entries', async () => {
      vi.spyOn(service, 'getOrderDetails').mockReturnValue(
        of({ code: 'testOrder', entries })
      );

      const pickupEntries = await firstValueFrom(service.getPickupEntries());
      expect(pickupEntries.length).toEqual(1);
      expect(pickupEntries[0].orderCode).toEqual('pickupEntry');
    });

    it('should be able to get delivery entries', async () => {
      vi.spyOn(service, 'getOrderDetails').mockReturnValue(
        of({ code: 'testOrder', entries })
      );

      const deliveryEntries = await firstValueFrom(
        service.getDeliveryEntries()
      );
      expect(deliveryEntries.length).toEqual(1);
      expect(deliveryEntries[0].orderCode).toEqual('deliveryEntry');
    });
  });
});
