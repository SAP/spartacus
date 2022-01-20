import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutAdapter } from './checkout.adapter';
import { CheckoutConnector } from './checkout.connector';

import createSpy = jasmine.createSpy;

class MockOrderAdapter implements CheckoutAdapter {
  placeOrder = createSpy('CheckoutAdapter.placeOrder').and.callFake(
    (userId, cartId, termsChecked) =>
      of(`placedOrder-${userId}-${cartId}-${termsChecked}`)
  );
  loadCheckoutDetails = createSpy(
    'CheckoutAdapter.loadCheckoutDetails'
  ).and.callFake((userId, cartId) =>
    of(`loadCheckoutDetails-${userId}-${cartId}`)
  );
  clearCheckoutDeliveryAddress = createSpy(
    'CheckoutAdapter.clearCheckoutDeliveryAddress'
  ).and.callFake((userId, cartId) =>
    of(`clearCheckoutDeliveryAddress-${userId}-${cartId}`)
  );
  clearCheckoutDeliveryMode = createSpy(
    'CheckoutAdapter.clearCheckoutDeliveryMode'
  ).and.callFake((userId, cartId) =>
    of(`clearCheckoutDeliveryMode-${userId}-${cartId}`)
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

  it('placeOrder should call adapter', () => {
    let result;
    service
      .placeOrder('user1', 'cart1', true)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe('placedOrder-user1-cart1-true');
    expect(adapter.placeOrder).toHaveBeenCalledWith('user1', 'cart1', true);
  });

  it('loadCheckoutDetails should call adapter', () => {
    let result;
    service
      .loadCheckoutDetails('user1', 'cart1')
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe('loadCheckoutDetails-user1-cart1');
    expect(adapter.loadCheckoutDetails).toHaveBeenCalledWith('user1', 'cart1');
  });

  it('clearCheckoutDeliveryAddress should call adapter', () => {
    let result;
    service
      .clearCheckoutDeliveryAddress('user1', 'cart1')
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe('clearCheckoutDeliveryAddress-user1-cart1');
    expect(adapter.clearCheckoutDeliveryAddress).toHaveBeenCalledWith(
      'user1',
      'cart1'
    );
  });

  it('clearCheckoutDeliveryMode should call adapter', () => {
    let result;
    service
      .clearCheckoutDeliveryMode('user1', 'cart1')
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe('clearCheckoutDeliveryMode-user1-cart1');
    expect(adapter.clearCheckoutDeliveryMode).toHaveBeenCalledWith(
      'user1',
      'cart1'
    );
  });
});
