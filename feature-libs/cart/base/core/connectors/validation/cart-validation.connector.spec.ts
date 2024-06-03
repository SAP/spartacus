import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartValidationAdapter } from './cart-validation.adapter';
import { CartValidationConnector } from './cart-validation.connector';
import createSpy = jasmine.createSpy;

class MockCartValidationAdapter implements CartValidationAdapter {
  validate = createSpy('validate').and.callFake((cartId, userId) =>
    of(`load-${cartId}-${userId}`)
  );
}

describe('CartValidationConnector', () => {
  let service: CartValidationConnector;
  let adapter: CartValidationAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationConnector,
        { provide: CartValidationAdapter, useClass: MockCartValidationAdapter },
      ],
    });

    service = TestBed.inject(CartValidationConnector);
    adapter = TestBed.inject(CartValidationAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validate should call adapter', () => {
    let result;
    service.validate('cart1', 'user1').subscribe((res) => (result = res));
    expect(result).toEqual('load-cart1-user1');
    expect(adapter.validate).toHaveBeenCalledWith('cart1', 'user1');
  });
});
