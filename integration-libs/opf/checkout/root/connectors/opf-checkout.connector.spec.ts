import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { CartUserEmailResponse } from '../model';
import { OpfCheckoutAdapter } from './opf-checkout.adapter';
import { OpfCheckoutConnector } from './opf-checkout.connector';

describe('OpfCheckoutConnector', () => {
  let connector: OpfCheckoutConnector;
  let adapter: any;

  beforeEach(() => {
    const adapterSpy = { getCartUserEmail: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutConnector,
        { provide: OpfCheckoutAdapter, useValue: adapterSpy },
      ],
    });

    connector = TestBed.inject(OpfCheckoutConnector);
    adapter = TestBed.inject(OpfCheckoutAdapter) as any;
  });

  it('should call adapter.getCartUserEmail with correct parameters', () => {
    const userId = 'testUser';
    const cartId = 'testCart';
    const response: CartUserEmailResponse = {
      sapCustomerEmail: 'test@example.com',
    };

    adapter.getCartUserEmail.mockReturnValue(of(response));

    connector.getCartUserEmail(userId, cartId).subscribe((result) => {
      expect(result).toEqual(response);
    });

    expect(adapter.getCartUserEmail).toHaveBeenCalledWith(userId, cartId);
  });
});
