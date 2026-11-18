import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { OpfCheckoutConnector } from '../connectors/opf-checkout.connector';
import { OpfCartUserEmailCheckerService } from './opf-cart-user-email-checker.service';

describe('OpfCartUserEmailCheckerService', () => {
  let service: OpfCartUserEmailCheckerService;
  let opfCheckoutConnector: any;

  beforeEach(() => {
    const opfCheckoutConnectorSpy = { getCartUserEmail: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        OpfCartUserEmailCheckerService,
        { provide: OpfCheckoutConnector, useValue: opfCheckoutConnectorSpy },
      ],
    });

    service = TestBed.inject(OpfCartUserEmailCheckerService);
    opfCheckoutConnector = TestBed.inject(OpfCheckoutConnector) as any;
  });

  it('should return false if the user email is not assigned', async () => {
    opfCheckoutConnector.getCartUserEmail.mockReturnValue(
      of({ sapCustomerEmail: null })
    );
    service
      .isCartUserHasEmail('test-user-id', 'test-cart-id')
      .subscribe((result) => {
        expect(result).toBeFalsy();
      });
  });

  it('should return true if the user email is assigned', async () => {
    opfCheckoutConnector.getCartUserEmail.mockReturnValue(
      of({ sapCustomerEmail: 'user@example.com' })
    );
    service
      .isCartUserHasEmail('test-user-id', 'test-cart-id')
      .subscribe((result) => {
        expect(result).toBeTruthy();
      });
  });
});
