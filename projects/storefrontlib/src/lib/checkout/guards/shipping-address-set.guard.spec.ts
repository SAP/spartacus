import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { Order } from '@spartacus/core';
import { ShippingAddressSetGuard } from './shipping-address-set.guard';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutDetailsService } from '../checkout-details.service';
import { CheckoutConfig } from '../config/checkout-config';

class MockCheckoutDetailsService {
  getDeliveryAddress(): Observable<Order> {
    return of(null);
  }
}

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;

describe(`ShippingAddressSetGuard`, () => {
  let guard: ShippingAddressSetGuard;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;
  let mockCheckoutConfig: CheckoutConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShippingAddressSetGuard,
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(ShippingAddressSetGuard);
    mockCheckoutDetailsService = TestBed.get(CheckoutDetailsService);
    mockCheckoutConfig = TestBed.get(CheckoutConfig);
  });

  describe(`when there is NO shipping address present`, () => {
    it(`should navigate to shipping address step`, done => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({})
      );

      guard.canActivate().subscribe(result => {
        expect(result.toString()).toEqual(
          mockCheckoutConfig.checkout.steps[0].url
        );
        done();
      });
    });

    it(`should navigate to default if not configured`, done => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({})
      );
      mockCheckoutConfig.checkout.steps = [];

      guard.canActivate().subscribe(result => {
        expect(result.toString()).toEqual('/');
        done();
      });
    });
  });

  describe(`when there is shipping address present`, () => {
    it(`should return true`, done => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({ id: 'testAddress' })
      );

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(true);
        done();
      });
    });
  });
});
