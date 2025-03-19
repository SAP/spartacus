import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartGuestUserAdapter } from './cart-guest-user.adapter';
import { CartGuestUserConnector } from './cart-guest-user.connector';

import createSpy = jasmine.createSpy;

class MockCartGuestUserAdapter implements CartGuestUserAdapter {
  createCartGuestUser = createSpy().and.returnValue(of({}));
  updateCartGuestUser = createSpy().and.returnValue(of({}));
}

describe('CartGuestUserConnector', () => {
  let service: CartGuestUserConnector;
  let adapter: CartGuestUserAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartGuestUserConnector,
        {
          provide: CartGuestUserAdapter,
          useClass: MockCartGuestUserAdapter,
        },
      ],
    });

    service = TestBed.inject(CartGuestUserConnector);
    adapter = TestBed.inject(CartGuestUserAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createCartGuestUser should call adapter', () => {
    service.createCartGuestUser('userId', 'cartId').subscribe();
    expect(adapter.createCartGuestUser).toHaveBeenCalledWith(
      'userId',
      'cartId',
      undefined
    );
  });

  it('updateCartGuestUser should call adapter', () => {
    service
      .updateCartGuestUser('userId', 'cartId', { email: 'test@sap.com' })
      .subscribe();
    expect(adapter.updateCartGuestUser).toHaveBeenCalledWith(
      'userId',
      'cartId',
      { email: 'test@sap.com' }
    );
  });
});
