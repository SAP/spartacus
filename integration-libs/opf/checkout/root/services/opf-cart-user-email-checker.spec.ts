import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OpfCheckoutConnector } from '../connectors/opf-checkout.connector';
import { OpfCartUserEmailCheckerService } from './opf-cart-user-email-checker.service';

describe('OpfCartUserEmailCheckerService', () => {
  let service: OpfCartUserEmailCheckerService;
  let opfCheckoutConnector: jasmine.SpyObj<OpfCheckoutConnector>;

  beforeEach(() => {
    const opfCheckoutConnectorSpy = jasmine.createSpyObj(
      'OpfCheckoutConnector',
      ['getCartUserEmail']
    );

    TestBed.configureTestingModule({
      providers: [
        OpfCartUserEmailCheckerService,
        { provide: OpfCheckoutConnector, useValue: opfCheckoutConnectorSpy },
      ],
    });

    service = TestBed.inject(OpfCartUserEmailCheckerService);
    opfCheckoutConnector = TestBed.inject(
      OpfCheckoutConnector
    ) as jasmine.SpyObj<OpfCheckoutConnector>;
  });

  it('should return false if the user email is not assigned', (done) => {
    opfCheckoutConnector.getCartUserEmail.and.returnValue(
      of({ sapCustomerEmail: null })
    );
    service
      .isCartUserHasEmail('test-user-id', 'test-cart-id')
      .subscribe((result) => {
        expect(result).toBeFalsy();
        done();
      });
  });

  it('should return true if the user email is assigned', (done) => {
    opfCheckoutConnector.getCartUserEmail.and.returnValue(
      of({ sapCustomerEmail: 'user@example.com' })
    );
    service
      .isCartUserHasEmail('test-user-id', 'test-cart-id')
      .subscribe((result) => {
        expect(result).toBeTruthy();
        done();
      });
  });
});
