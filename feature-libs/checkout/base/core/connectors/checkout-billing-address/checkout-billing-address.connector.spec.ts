import { TestBed } from '@angular/core/testing';
import { Address } from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutBillingAddressAdapter } from './checkout-billing-address.adapter';
import { CheckoutBillingAddressConnector } from './checkout-billing-address.connector';
import createSpy = jasmine.createSpy;

class MockCheckoutBillingAddressAdapter
  implements CheckoutBillingAddressAdapter
{
  setBillingAddress = createSpy().and.returnValue(of({}));
}

describe('CheckoutBillingAddressConnector', () => {
  let service: CheckoutBillingAddressConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutBillingAddressConnector,
        {
          provide: CheckoutBillingAddressAdapter,
          useClass: MockCheckoutBillingAddressAdapter,
        },
      ],
    });

    service = TestBed.inject(CheckoutBillingAddressConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setAddress should call adapter', () => {
    const adapter = TestBed.inject(CheckoutBillingAddressAdapter);
    service
      .setBillingAddress('1', '2', { town: 'Berlin' } as Address)
      .pipe(take(1))
      .subscribe();
    expect(adapter.setBillingAddress).toHaveBeenCalledWith('1', '2', {
      town: 'Berlin',
    });
  });
});
