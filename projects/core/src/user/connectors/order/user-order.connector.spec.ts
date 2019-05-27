import { TestBed } from '@angular/core/testing';

import { UserOrderConnector } from './user-order.connector';
import { of } from 'rxjs/internal/observable/of';
import { UserOrderAdapter } from './user-order.adapter';
import createSpy = jasmine.createSpy;

class MockOrderAdapter implements UserOrderAdapter {
  load = createSpy('UserOrderAdapter.load').and.callFake((userId, orderCode) =>
    of(`order-${userId}-${orderCode}`)
  );

  loadHistory = createSpy('UserOrderAdapter.loadHistory').and.callFake(userId =>
    of(`orderHistory-${userId}`)
  );
}

describe('UserOrderConnector', () => {
  let service: UserOrderConnector;
  let adapter: UserOrderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserOrderAdapter, useClass: MockOrderAdapter }],
    });

    service = TestBed.get(UserOrderConnector);
    adapter = TestBed.get(UserOrderAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
