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
  setAddress = createSpy().and.returnValue(of({}));
  getAddress = createSpy().and.returnValue(of({}));
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
      .setAddress('1', '2', { town: 'Berlin' } as Address)
      .pipe(take(1))
      .subscribe();
    expect(adapter.setAddress).toHaveBeenCalledWith('1', '2', {
      town: 'Berlin',
    });
  });

  it('getAddress should call adapter', () => {
    const adapter = TestBed.inject(CheckoutBillingAddressAdapter);
    service.getAddress('1', '2').pipe(take(1)).subscribe();
    expect(adapter.getAddress).toHaveBeenCalledWith('1', '2');
  });
});
