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

  getConsignmentTracking = createSpy(
    'UserOrderAdapter.getConsignmentTracking'
  ).and.callFake((orderCode, consignmentCode) =>
    of(`consignmentTracking-${orderCode}-${consignmentCode}`)
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

  it('getConsignmentTracking should call adapter', () => {
    let result;
    service
      .getConsignmentTracking('orderCode', 'consignmentCode')
      .subscribe(res => (result = res));
    expect(result).toBe('consignmentTracking-orderCode-consignmentCode');
    expect(adapter.getConsignmentTracking).toHaveBeenCalledWith(
      'orderCode',
      'consignmentCode'
    );
  });
});
