import { TestBed } from '@angular/core/testing';

import { OrderConnector } from './order.connector';
import { of } from 'rxjs/internal/observable/of';
import { OrderAdapter } from './order.adapter';
import createSpy = jasmine.createSpy;

class MockOrderAdapter implements OrderAdapter {
  place = createSpy('OrderAdapter.place').and.callFake((userId, cartId) =>
    of(`placedOrder-${userId}-${cartId}`)
  );

  load = createSpy('OrderAdapter.load').and.callFake((userId, orderCode) =>
    of(`order-${userId}-${orderCode}`)
  );

  loadHistory = createSpy('OrderAdapter.loadHistory').and.callFake(userId =>
    of(`orderHistory-${userId}`)
  );
}

describe('OrderConnector', () => {
  let service: OrderConnector;
  let adapter: OrderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: OrderAdapter, useClass: MockOrderAdapter }],
    });

    service = TestBed.get(OrderConnector);
    adapter = TestBed.get(OrderAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('place should call adapter', () => {
    let result;
    service.place('user1', 'cart1').subscribe(res => (result = res));
    expect(result).toBe('placedOrder-user1-cart1');
    expect(adapter.place).toHaveBeenCalledWith('user1', 'cart1');
  });

  it('get should call adapter', () => {
    let result;
    service.get('user2', 'order2').subscribe(res => (result = res));
    expect(result).toBe('order-user2-order2');
    expect(adapter.load).toHaveBeenCalledWith('user2', 'order2');
  });

  it('getHistory should call adapter', () => {
    let result;
    service.getHistory('user3').subscribe(res => (result = res));
    expect(result).toBe('orderHistory-user3');
    expect(adapter.loadHistory).toHaveBeenCalledWith(
      'user3',
      undefined,
      undefined,
      undefined
    );
  });
});
