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
  CostCenter,
  LoggerService,
  PaymentDetails,
  QueryState,
  RouteConfig,
  RoutingConfigService,
} from '@spartacus/core';
import { BehaviorSubject, firstValueFrom, Observable, of } from 'rxjs';
import { CheckoutB2BStepsSetGuard } from './checkout-b2b-steps-set.guard';


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
  disableEnableStep = vi.fn();
  getCheckoutStep = vi.fn().mockReturnValue({});
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
  hasDeliveryItems = vi.fn().mockReturnValue(of(false));
}

describe(`CheckoutB2BStepsSetGuard`, () => {
  let guard: CheckoutB2BStepsSetGuard;
  let checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
  let checkoutPaymentFacade: CheckoutPaymentFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutB2BStepsSetGuard,
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
      ],
    });

    guard = TestBed.inject(CheckoutB2BStepsSetGuard);
    checkoutPaymentTypeFacade = TestBed.inject(CheckoutPaymentTypeFacade);
    checkoutDeliveryAddressFacade = TestBed.inject(
      CheckoutDeliveryAddressFacade
    );
    checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
    checkoutPaymentFacade = TestBed.inject(CheckoutPaymentFacade);
  });

  describe('When CARD payment', () => {
    beforeEach(() => {
      isAccount.next(false);
    });

    describe('there is no checkout data set yet', () => {
      it('go to step1 (delivery address), should return true (no need cost center for CARD)', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route1'] }));
        expect(result).toBeTruthy();
      });

      it('go to step2 (delivery mode), should return step1', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route2'] }));
        expect(result.toString()).toEqual('/checkout/route1');
      });

      it('go to step3 (payment details), should return step2', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route3'] }));
        expect(result.toString()).toEqual('/checkout/route2');
      });

      it('go to step4 (review details), should return step3', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route4'] }));
        expect(result.toString()).toEqual('/checkout/route3');
      });
    });

    describe('step1 (delivery address) data set', () => {
      beforeEach(() => {
        vi.spyOn(
          checkoutDeliveryAddressFacade,
          'getDeliveryAddressState'
        ).mockReturnValue(
          of({ loading: false, error: false, data: { id: 'test-address' } })
        );
      });

      it('go to step2 (delivery mode), should return true', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route2'] }));
        expect(result).toBeTruthy();
      });

      it('go to step3 (payment details), should return step2', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route3'] }));
        expect(result.toString()).toEqual('/checkout/route2');
      });

      it('go to step4 (review details), should return step3', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route4'] }));
        expect(result.toString()).toEqual('/checkout/route3');
      });
    });

    describe('step2 (delivery mode) data set', () => {
      beforeEach(() => {
        vi.spyOn(
          checkoutDeliveryModesFacade,
          'getSelectedDeliveryModeState'
        ).mockReturnValue(
          of({
            loading: false,
            error: false,
            data: { code: 'test-delivery-mode' },
          })
        );
      });

      it('go to step3 (payment details), should return true', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route3'] }));
        expect(result).toBeTruthy();
      });

      it('go to step4 (review details), should return step3', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route4'] }));
        expect(result.toString()).toEqual('/checkout/route3');
      });
    });

    describe('step3 (payment details) data set', () => {
      beforeEach(() => {
        vi.spyOn(checkoutPaymentFacade, 'getPaymentDetailsState').mockReturnValue(
          of({ loading: false, error: false, data: { id: 'test-details' } })
        );
      });

      it('go to step4 (review details), should return true', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route4'] }));
        expect(result).toBeTruthy();
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
      it('go to step3 (payment details), should return to checkout', async () => {
        const logger = TestBed.inject(LoggerService);
        vi.spyOn(logger, 'warn');
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route3'] }));
        expect(result.toString()).toEqual('/checkout');
        expect(logger.warn).toHaveBeenCalledWith(
          `Missing step with route '/checkout/route3' in checkout configuration or this step is disabled.`
        );
      });
    });

    describe('there is no checkout data set yet', () => {
      it('go to step1 (delivery address), should return step0', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route1'] }));
        expect(result.toString()).toEqual('/checkout/route0');
      });

      it('go to step2 (delivery mode), should return step1', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route2'] }));
        expect(result.toString()).toEqual('/checkout/route1');
      });

      it('go to step4 (review details), should return step2', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route4'] }));
        expect(result.toString()).toEqual('/checkout/route2');
      });
    });

    describe('step0 (payment type) data set', () => {
      beforeEach(() => {
        vi.spyOn(
          checkoutPaymentTypeFacade,
          'getSelectedPaymentTypeState'
        ).mockReturnValue(of({ loading: false, error: false, data: {} }));
      });

      it('go to step1 (delivery address), should return true', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route1'] }));
        expect(result).toBeTruthy();
      });

      it('go to step2 (delivery mode), should return step1', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route2'] }));
        expect(result.toString()).toEqual('/checkout/route1');
      });

      it('go to step4 (review details), should return step2', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route4'] }));
        expect(result.toString()).toEqual('/checkout/route2');
      });
    });

    describe('step1 (delivery address) data set', () => {
      beforeEach(() => {
        vi.spyOn(
          checkoutDeliveryAddressFacade,
          'getDeliveryAddressState'
        ).mockReturnValue(
          of({ loading: false, error: false, data: { id: 'test-address' } })
        );
      });

      it('go to step2 (delivery mode), should return true', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route2'] }));
        expect(result).toBeTruthy();
      });

      it('go to step4 (review details), should return step3', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route4'] }));
        expect(result.toString()).toEqual('/checkout/route2');
      });
    });

    describe('step2 (delivery mode) data set', () => {
      beforeEach(() => {
        vi.spyOn(
          checkoutDeliveryModesFacade,
          'getSelectedDeliveryModeState'
        ).mockReturnValue(
          of({
            loading: false,
            error: false,
            data: { code: 'test-delivery-mode' },
          })
        );
      });

      it('go to step4 (review details), should return true', async () => {
        const result = await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route4'] }));
        expect(result).toBeTruthy();
      });
    });
  });
});
