import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  Address,
  DeliveryMode,
  PaymentDetails,
  QueryState,
  RouteConfig,
  RoutingConfigService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutStepsSetGuard } from './checkout-steps-set.guard';
import createSpy = jasmine.createSpy;

class MockRoutingConfigService implements Partial<RoutingConfigService> {
  getRouteConfig(stepRoute: string): RouteConfig | undefined {
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
    return undefined;
  }
}

const mockCheckoutSteps: Array<CheckoutStep> = [
  {
    id: 'step0',
    name: 'step 0',
    routeName: 'route0',
    type: [CheckoutStepType.PAYMENT_DETAILS],
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

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    mockCheckoutSteps
  );
  disableEnableStep = createSpy();
}

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  getSelectedDeliveryModeState(): Observable<
    QueryState<DeliveryMode | undefined>
  > {
    return of({ loading: false, error: false, data: undefined });
  }
}

class MockCheckoutPaymentFacade implements Partial<CheckoutPaymentFacade> {
  getPaymentDetailsState(): Observable<QueryState<PaymentDetails>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

describe(`CheckoutStepsSetGuard`, () => {
  let guard: CheckoutStepsSetGuard;
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CheckoutStepsSetGuard,
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryAddressFacade,
        },
        {
          provide: CheckoutDeliveryModesFacade,
          useClass: MockCheckoutDeliveryModesFacade,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentFacade,
        },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    });

    guard = TestBed.inject(CheckoutStepsSetGuard);
    checkoutDeliveryAddressFacade = TestBed.inject(
      CheckoutDeliveryAddressFacade
    );
    checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
  });

  beforeEach(() => {
    if (mockCheckoutSteps[3].type[0] === CheckoutStepType.PAYMENT_DETAILS) {
      mockCheckoutSteps.splice(3, 1);
    }
  });

  describe('PAYMENT_DETAILS is not valid any more', () => {
    it('go to step3 (payment details), should return to checkout', (done) => {
      spyOn(console, 'warn');
      guard
        .canActivate(<any>{ url: ['checkout', 'route3'] })
        .subscribe((result) => {
          expect(result.toString()).toEqual('/checkout');
          done();
        });
    });
  });

  describe('there is no checkout data set yet', () => {
    it('go to step1 (shipping address), should return step0', (done) => {
      guard
        .canActivate(<any>{ url: ['checkout', 'route1'] })
        .subscribe((result) => {
          expect(result.toString()).toEqual('/checkout/route0');
          done();
        });
    });

    it('go to step2 (delivery mode), should return step1', (done) => {
      guard
        .canActivate(<any>{ url: ['checkout', 'route2'] })
        .subscribe((result) => {
          expect(result.toString()).toEqual('/checkout/route1');
          done();
        });
    });

    it('go to step4 (review details), should return step2', (done) => {
      guard
        .canActivate(<any>{ url: ['checkout', 'route4'] })
        .subscribe((result) => {
          expect(result.toString()).toEqual('/checkout/route2');
          done();
        });
    });
  });

  describe('step1 (shipping address) data set', () => {
    beforeEach(() => {
      spyOn(
        checkoutDeliveryAddressFacade,
        'getDeliveryAddressState'
      ).and.returnValue(
        of({ loading: false, error: false, data: { id: 'test-address' } })
      );
    });

    it('go to step2 (delivery mode), should return true', (done) => {
      guard
        .canActivate(<any>{ url: ['checkout', 'route2'] })
        .subscribe((result) => {
          expect(result).toBeTruthy();
          done();
        });
    });

    it('go to step4 (review details), should return step3', (done) => {
      guard
        .canActivate(<any>{ url: ['checkout', 'route4'] })
        .subscribe((result) => {
          expect(result.toString()).toEqual('/checkout/route2');
          done();
        });
    });
  });

  describe('step2 (delivery mode) data set', () => {
    beforeEach(() => {
      spyOn(
        checkoutDeliveryModesFacade,
        'getSelectedDeliveryModeState'
      ).and.returnValue(
        of({
          loading: false,
          error: false,
          data: { code: 'test-delivery-mode' },
        })
      );
    });

    it('go to step4 (review details), should return true', (done) => {
      guard
        .canActivate(<any>{ url: ['checkout', 'route4'] })
        .subscribe((result) => {
          expect(result).toBeTruthy();
          done();
        });
    });
  });
});
