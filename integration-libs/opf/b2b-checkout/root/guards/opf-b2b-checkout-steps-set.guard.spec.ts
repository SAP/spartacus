import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  DeliveryMode,
  PaymentType,
} from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  Address,
  BaseSiteService,
  CostCenter,
  PaymentDetails,
  QueryState,
  RouteConfig,
  RoutingConfigService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OpfB2bCheckoutStepsSetGuard } from './opf-b2b-checkout-steps-set.guard';

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
    type: [CheckoutStepType.PAYMENT_TYPE],
  },
  {
    id: 'step1',
    name: 'step 1',
    routeName: 'route1',
    type: [CheckoutStepType.DELIVERY_ADDRESS],
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
  getCheckoutStep = createSpy().and.returnValue({});
}

class MockCheckoutCostCenterService
  implements Partial<CheckoutCostCenterFacade>
{
  getCostCenterState(): Observable<QueryState<CostCenter | undefined>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

// initial it as ACCOUNT payment
const isAccount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
class MockCheckoutPaymentTypeService
  implements Partial<CheckoutPaymentTypeFacade>
{
  isAccountPayment(): Observable<boolean> {
    return isAccount;
  }
  getSelectedPaymentTypeState(): Observable<
    QueryState<PaymentType | undefined>
  > {
    return of({ loading: false, error: false, data: undefined });
  }
}

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

class MockCheckoutDeliveryModeFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  getSelectedDeliveryModeState(): Observable<
    QueryState<DeliveryMode | undefined>
  > {
    return of({ loading: false, error: false, data: undefined });
  }
}

class MockCheckoutPaymentFacade implements Partial<CheckoutPaymentFacade> {
  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

class MockCartService implements Partial<ActiveCartFacade> {
  hasDeliveryItems = createSpy().and.returnValue(of(false));
}

class MockBaseSiteService implements Partial<BaseSiteService> {
  get(): Observable<any> {
    return of({ channel: 'B2B' });
  }
}

describe(`OpfB2bCheckoutStepsSetGuard`, () => {
  let guard: OpfB2bCheckoutStepsSetGuard;
  let checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfB2bCheckoutStepsSetGuard,
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        {
          provide: CheckoutPaymentTypeFacade,
          useClass: MockCheckoutPaymentTypeService,
        },
        {
          provide: CheckoutCostCenterFacade,
          useClass: MockCheckoutCostCenterService,
        },
        {
          provide: CheckoutDeliveryModesFacade,
          useClass: MockCheckoutDeliveryModeFacade,
        },
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryAddressFacade,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentFacade,
        },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        { provide: ActiveCartFacade, useClass: MockCartService },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
      ],
    });

    guard = TestBed.inject(OpfB2bCheckoutStepsSetGuard);
    checkoutPaymentTypeFacade = TestBed.inject(CheckoutPaymentTypeFacade);
    checkoutDeliveryAddressFacade = TestBed.inject(
      CheckoutDeliveryAddressFacade
    );
    checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
  });

  describe('When ACCOUNT payment', () => {
    let checkoutStepService: MockCheckoutStepService;

    beforeEach(() => {
      isAccount.next(true);
      checkoutStepService = TestBed.inject(
        CheckoutStepService
      ) as unknown as MockCheckoutStepService;
      // Remove the payment details step
      const paymentDetailsStepIndex = mockCheckoutSteps.findIndex(
        (step) => step.type[0] === CheckoutStepType.PAYMENT_DETAILS
      );
      if (paymentDetailsStepIndex !== -1) {
        mockCheckoutSteps.splice(paymentDetailsStepIndex, 1);
      }
      // Update the steps$ subject with the modified steps
      checkoutStepService.steps$.next([...mockCheckoutSteps]);
    });

    describe('PAYMENT_DETAILS is not valid any more', () => {
      it('go to step3 (payment details), should return to checkout', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route3'] })
          .subscribe((result) => {
            expect(result.toString()).toEqual('/checkout');

            done();
          });
      });
    });

    describe('there is no checkout data set yet', () => {
      it('go to step1 (delivery address), should return step0', (done) => {
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

    describe('step0 (payment type) data set', () => {
      beforeEach(() => {
        spyOn(
          checkoutPaymentTypeFacade,
          'getSelectedPaymentTypeState'
        ).and.returnValue(of({ loading: false, error: false, data: {} }));
      });

      it('go to step1 (delivery address), should return true', (done) => {
        guard
          .canActivate(<any>{ url: ['checkout', 'route1'] })
          .subscribe((result) => {
            expect(result).toBeTruthy();
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

    describe('step1 (delivery address) data set', () => {
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
});
