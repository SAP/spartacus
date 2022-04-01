import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutAdapter } from './checkout.adapter';
import { CheckoutConnector } from './checkout.connector';

import createSpy = jasmine.createSpy;

class MockOrderAdapter implements Partial<CheckoutAdapter> {
  placeOrder = createSpy('CheckoutAdapter.placeOrder').and.callFake(
    (userId: string, cartId: string, termsChecked: boolean) =>
      of(`placedOrder-${userId}-${cartId}-${termsChecked}`)
  );
  getCheckoutDetails = createSpy(
    'CheckoutAdapter.loadCheckoutDetails'
  ).and.callFake((userId: string, cartId: string) =>
    of(`loadCheckoutDetails-${userId}-${cartId}`)
  );
}

describe('CheckoutConnector', () => {
  let service: CheckoutConnector;
  let adapter: CheckoutAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutConnector,
        { provide: CheckoutAdapter, useClass: MockOrderAdapter },
      ],
    });

    service = TestBed.inject(CheckoutConnector);
    adapter = TestBed.inject(CheckoutAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCheckoutDetails should call adapter', () => {
    let result;
    service
      .getCheckoutDetails('user1', 'cart1')
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe('loadCheckoutDetails-user1-cart1');
    expect(adapter.getCheckoutDetails).toHaveBeenCalledWith('user1', 'cart1');
  });
});
