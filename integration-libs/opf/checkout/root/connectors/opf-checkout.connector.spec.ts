import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartUserEmailResponse } from '../model';
import { OpfCheckoutAdapter } from './opf-checkout.adapter';
import { OpfCheckoutConnector } from './opf-checkout.connector';

describe('OpfCheckoutConnector', () => {
  let connector: OpfCheckoutConnector;
  let adapter: jasmine.SpyObj<OpfCheckoutAdapter>;

  beforeEach(() => {
    const adapterSpy = jasmine.createSpyObj('OpfCheckoutAdapter', [
      'getCartUserEmail',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutConnector,
        { provide: OpfCheckoutAdapter, useValue: adapterSpy },
      ],
    });

    connector = TestBed.inject(OpfCheckoutConnector);
    adapter = TestBed.inject(
      OpfCheckoutAdapter
    ) as jasmine.SpyObj<OpfCheckoutAdapter>;
  });

  it('should call adapter.getCartUserEmail with correct parameters', () => {
    const userId = 'testUser';
    const cartId = 'testCart';
    const response: CartUserEmailResponse = {
      sapCustomerEmail: 'test@example.com',
    };

    adapter.getCartUserEmail.and.returnValue(of(response));

    connector.getCartUserEmail(userId, cartId).subscribe((result) => {
      expect(result).toEqual(response);
    });

    expect(adapter.getCartUserEmail).toHaveBeenCalledWith(userId, cartId);
  });
});
