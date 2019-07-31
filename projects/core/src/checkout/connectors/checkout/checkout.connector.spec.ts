import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { CheckoutAdapter } from './checkout.adapter';
import { CheckoutConnector } from './checkout.connector';

import createSpy = jasmine.createSpy;

class MockOrderAdapter implements CheckoutAdapter {
  placeOrder = createSpy('CheckoutAdapter.placeOrder').and.callFake(
    (userId, cartId) => of(`placedOrder-${userId}-${cartId}`)
  );
  loadCheckoutDetails = createSpy().and.callFake((user, cart) =>
    of('loadCheckoutDetails' + user + cart)
  );
}

describe('OrderConnector', () => {
  let service: CheckoutConnector;
  let adapter: CheckoutAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CheckoutAdapter, useClass: MockOrderAdapter }],
    });

    service = TestBed.get(CheckoutConnector as Type<CheckoutConnector>);
    adapter = TestBed.get(CheckoutAdapter as Type<CheckoutAdapter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('placeOrder should call adapter', () => {
    let result;
    service.placeOrder('user1', 'cart1').subscribe(res => (result = res));
    expect(result).toBe('placedOrder-user1-cart1');
    expect(adapter.placeOrder).toHaveBeenCalledWith('user1', 'cart1');
  });
});
