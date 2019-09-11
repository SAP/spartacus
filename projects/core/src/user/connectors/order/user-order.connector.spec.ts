import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { UserOrderAdapter } from './user-order.adapter';
import { UserOrderConnector } from './user-order.connector';

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

    service = TestBed.get(UserOrderConnector as Type<UserOrderConnector>);
    adapter = TestBed.get(UserOrderAdapter as Type<UserOrderAdapter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should call adapter for login user', () => {
    let result;
    service.get('user2', 'order2').subscribe(res => (result = res));
    expect(result).toBe('order-user2-order2');
    expect(adapter.load).toHaveBeenCalledWith('user2', 'order2');
  });

  it('get should call adapter for anonymous user', () => {
    const guid = '1b11111a-a111-1e11-a111-1b111111e11a';
    let result;
    service.get('current', guid).subscribe(res => (result = res));
    expect(result).toBe('order-anonymous-' + guid);
    expect(adapter.load).toHaveBeenCalledWith('anonymous', guid);
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
