import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderAdapter } from './order.adapter';
import { OrderConnector } from './order.connector';

import createSpy = jasmine.createSpy;

class MockOrderAdapter implements Partial<OrderAdapter> {
  placeOrder = createSpy('OrderAdapter.placeOrder').and.callFake(
    (userId: string, cartId: string, termsChecked: boolean) =>
      of(`placedOrder-${userId}-${cartId}-${termsChecked}`)
  );
}

describe('OrderConnector', () => {
  let service: OrderConnector;
  let adapter: OrderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderConnector,
        { provide: OrderAdapter, useClass: MockOrderAdapter },
      ],
    });

    service = TestBed.inject(OrderConnector);
    adapter = TestBed.inject(OrderAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('placeOrder should call adapter', () => {
    let result;
    service
      .placeOrder('user1', 'cart1', true)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe('placedOrder-user1-cart1-true');
    expect(adapter.placeOrder).toHaveBeenCalledWith('user1', 'cart1', true);
  });
});
