import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
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
  let router: Router;
  let guard: ShippingAddressSetGuard;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;

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

    router = TestBed.get(Router);
    guard = TestBed.get(ShippingAddressSetGuard);
    mockCheckoutDetailsService = TestBed.get(CheckoutDetailsService);
  });

  describe(`when there is NO shipping address present`, () => {
    it(`should return false and navigate to shipping address step`, done => {
      spyOn(mockCheckoutDetailsService, 'getDeliveryAddress').and.returnValue(
        of({})
      );

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(
          router.parseUrl(defaultCheckoutConfig.checkout.steps[0].url)
        );
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
