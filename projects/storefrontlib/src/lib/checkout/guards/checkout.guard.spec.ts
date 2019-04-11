import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckoutGuard } from './checkout.guard';
import { CheckoutConfig } from '../config/checkout-config';
import { defaultCheckoutConfig } from '../config/default-checkout-config';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;

describe(`CheckoutGuard`, () => {
  let guard: CheckoutGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutGuard,
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
      ],
      imports: [RouterTestingModule],
    });
    guard = TestBed.get(CheckoutGuard);
  });

  it(`should redirect to first checkout step`, done => {
    guard.canActivate().subscribe(result => {
      expect(result.toString()).toEqual(
        MockCheckoutConfig.checkout.steps[0].url
      );
      done();
    });
  });
});
