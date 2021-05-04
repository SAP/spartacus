import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CheckoutCostCenterFacade,
  CheckoutStep,
  CheckoutStepType,
  PaymentTypeFacade,
} from '@spartacus/checkout/root';
import { Address, Order, RoutingConfigService } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutStepsSetGuard } from './checkout-steps-set.guard';

import createSpy = jasmine.createSpy;

class MockRoutingConfigService {
  getRouteConfig(stepRoute) {
    if (stepRoute === 'route0') {
      return { paths: ['checkout/route0'] };
    } else if (stepRoute === 'route1') {
      return { paths: ['checkout/route1'] };
    } else if (stepRoute === 'route2') {
      return { paths: ['checkout/route2'] };
    } else if (stepRoute === 'route3') {
      return { paths: ['checkout/route3'] };
    } else if (stepRoute === 'route4') {
      return { paths: ['checkout/route4'] };
    } else if (stepRoute === 'checkout') {
      return { paths: ['checkout'] };
    }
    return null;
  }
}

const mockCheckoutSteps: Array<CheckoutStep> = [
  {
    id: 'step0',
    name: 'step 0',
    routeName: 'route0',
    type: [CheckoutStepType.PAYMENT_TYPE],
  },
  {
    id: 'step1',
    name: 'step 1',
    routeName: 'route1',
    type: [CheckoutStepType.SHIPPING_ADDRESS],
  },
  {
    id: 'step2',
    name: 'step 2',
    routeName: 'route2',
    type: [CheckoutStepType.DELIVERY_MODE],
  },
  {
    id: 'step3',
    name: 'step 3',
    routeName: 'route3',
    type: [CheckoutStepType.PAYMENT_DETAILS],
  },
  {
    id: 'step4',
    name: 'step 4',
    routeName: 'route4',
    type: [CheckoutStepType.DELIVERY_MODE],
  },
];

class MockCheckoutStepService {
  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    mockCheckoutSteps
  );
  disableEnableStep = createSpy();
}

class MockCheckoutCostCenterService {
  getCostCenter(): Observable<string> {
    return of(null);
  }
}

class MockCheckoutDetailsService {
  getDeliveryAddress(): Observable<Address> {
    return of(null);
  }
  getSelectedDeliveryModeCode(): Observable<string> {
    return of(null);
  }
  getPaymentDetails(): Observable<Order> {
    return of(null);
  }
}

// initial it as ACCOUNT payment
const isAccount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
class MockPaymentTypeService {
  isAccountPayment(): Observable<boolean> {
    return isAccount;
  }
  getSelectedPaymentType(): Observable<string> {
    return of(null);
  }
}

describe(`CheckoutStepsSetGuard`, () => {
  let guard: CheckoutStepsSetGuard;
  let paymentTypeService: PaymentTypeFacade;
  let checkoutDetailsService: CheckoutDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CheckoutStepsSetGuard,
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        {
          provide: PaymentTypeFacade,
          useClass: MockPaymentTypeService,
        },
        {
          provide: CheckoutCostCenterFacade,
          useClass: MockCheckoutCostCenterService,
        },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    });

    guard = TestBed.inject(CheckoutStepsSetGuard);
    paymentTypeService = TestBed.inject(PaymentTypeFacade);
    checkoutDetailsService = TestBed.inject(CheckoutDetailsService);
  });

  describe('When CARD payment', () => {
    beforeEach(() => {
      isAccount.next(false);
    });

    describe('there is no checkout data set yet', () => {
      it('go to step1 (shipping address), should return true (no need cost center for CARD)', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route1'] }, undefined)
          .subscribe((result) => {
            expect(result).toBeTruthy();
            done();
          });
      });

      it('go to step2 (delivery mode), should return step1', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route2'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route1');
            done();
          });
      });

      it('go to step3 (payment details), should return step2', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route3'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route2');
            done();
          });
      });

      it('go to step4 (review details), should return step3', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route4'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route3');
            done();
          });
      });
    });

    describe('step1 (shipping address) data set', () => {
      beforeEach(() => {
        spyOn(checkoutDetailsService, 'getDeliveryAddress').and.returnValue(
          of({ id: 'test-address' })
        );
      });

      it('go to step2 (delivery mode), should return true', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route2'] }, undefined)
          .subscribe((result) => {
            expect(result).toBeTruthy();
            done();
          });
      });

      it('go to step3 (payment details), should return step2', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route3'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route2');
            done();
          });
      });

      it('go to step4 (review details), should return step3', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route4'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route3');
            done();
          });
      });
    });

    describe('step2 (delivery mode) data set', () => {
      beforeEach(() => {
        spyOn(
          checkoutDetailsService,
          'getSelectedDeliveryModeCode'
        ).and.returnValue(of('test-delivery-mode'));
      });

      it('go to step3 (payment details), should return true', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route3'] }, undefined)
          .subscribe((result) => {
            expect(result).toBeTruthy();
            done();
          });
      });

      it('go to step4 (review details), should return step3', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route4'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route3');
            done();
          });
      });
    });

    describe('step3 (payment details) data set', () => {
      beforeEach(() => {
        spyOn(checkoutDetailsService, 'getPaymentDetails').and.returnValue(
          of({ id: 'test-details' })
        );
      });

      it('go to step4 (review details), should return true', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route4'] }, undefined)
          .subscribe((result) => {
            expect(result).toBeTruthy();
            done();
          });
      });
    });
  });

  describe('When ACCOUNT payment', () => {
    beforeEach(() => {
      isAccount.next(true);
      if (mockCheckoutSteps[3].type[0] === CheckoutStepType.PAYMENT_DETAILS) {
        mockCheckoutSteps.splice(3, 1);
      }
    });

    describe('PAYMENT_DETAILS is not valid any more', () => {
      it('go to step3 (payment details), should return to checkout', (done) => {
        spyOn(console, 'warn');
        guard
          .canActivate(<any>{ url: ['checkout', 'route3'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout');
            done();
          });
      });
    });

    describe('there is no checkout data set yet', () => {
      it('go to step1 (shipping address), should return step0', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route1'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route0');
            done();
          });
      });

      it('go to step2 (delivery mode), should return step1', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route2'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route1');
            done();
          });
      });

      it('go to step4 (review details), should return step2', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route4'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route2');
            done();
          });
      });
    });

    describe('step0 (payment type) data set', () => {
      beforeEach(() => {
        spyOn(paymentTypeService, 'getSelectedPaymentType').and.returnValue(
          of('test-cost-center')
        );
      });

      it('go to step1 (shipping address), should return true', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route1'] }, undefined)
          .subscribe((result) => {
            expect(result).toBeTruthy();
            done();
          });
      });

      it('go to step2 (delivery mode), should return step1', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route2'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route1');
            done();
          });
      });

      it('go to step4 (review details), should return step2', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route4'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route2');
            done();
          });
      });
    });

    describe('step1 (shipping address) data set', () => {
      beforeEach(() => {
        spyOn(checkoutDetailsService, 'getDeliveryAddress').and.returnValue(
          of({ id: 'test-address' })
        );
      });

      it('go to step2 (delivery mode), should return true', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route2'] }, undefined)
          .subscribe((result) => {
            expect(result).toBeTruthy();
            done();
          });
      });

      it('go to step4 (review details), should return step3', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route4'] }, undefined)
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout/route2');
            done();
          });
      });
    });

    describe('step2 (delivery mode) data set', () => {
      beforeEach(() => {
        spyOn(
          checkoutDetailsService,
          'getSelectedDeliveryModeCode'
        ).and.returnValue(of('test-delivery-mode'));
      });

      it('go to step4 (review details), should return true', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route4'] }, undefined)
          .subscribe((result) => {
            expect(result).toBeTruthy();
            done();
          });
      });
    });
  });
});
