import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { Order, ServerConfig } from '@spartacus/core';
import { PaymentDetailsSetGuard } from './payment-details-set.guard';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutConfig } from '../config/checkout-config';

class MockCheckoutDetailsService {
  getPaymentDetails(): Observable<Order> {
    return of(null);
  }
}

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
const MockServerConfig: ServerConfig = { production: false };

describe(`PaymentDetailsSetGuard`, () => {
  let guard: PaymentDetailsSetGuard;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;
  let mockCheckoutConfig: CheckoutConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentDetailsSetGuard,
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: ServerConfig, useValue: MockServerConfig },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(PaymentDetailsSetGuard);
    mockCheckoutDetailsService = TestBed.get(CheckoutDetailsService);
    mockCheckoutConfig = TestBed.get(CheckoutConfig);
  });

  describe(`when there is NO payment details present`, () => {
    it(`should navigate to payment details step`, done => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({})
      );

      guard.canActivate().subscribe(result => {
        console.log(mockCheckoutConfig.checkout.steps);
        expect(result.toString()).toEqual(
          mockCheckoutConfig.checkout.steps[2].url
        );
        done();
      });
    });

    it(`should navigate to default if not configured`, done => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({})
      );
      spyOn(console, 'warn');
      mockCheckoutConfig.checkout.steps = [];

      guard.canActivate().subscribe(result => {
        expect(console.warn).toHaveBeenCalledWith(
          'Missing step with type paymentDetails in checkout configuration.'
        );
        expect(result.toString()).toEqual('/');
        done();
      });
    });
  });

  describe(`when there is payment details present`, () => {
    it(`should return true`, done => {
      spyOn(mockCheckoutDetailsService, 'getPaymentDetails').and.returnValue(
        of({ id: 'testDetails' })
      );

      guard.canActivate().subscribe(result => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});
