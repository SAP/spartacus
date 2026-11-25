import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutFiscalIdFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { RouteConfig, RoutingConfigService } from '@spartacus/core';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutStepsSetGuard } from './checkout-steps-set.guard';
import { vi } from 'vitest';

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

const testStep: CheckoutStep = {
  id: 'test',
  name: 'test',
  routeName: 'test',
  type: [CheckoutStepType.PAYMENT_DETAILS],
};
class MockCheckoutStepService implements Partial<CheckoutStepService> {
  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    mockCheckoutSteps
  );
  disableEnableStep = vi.fn();
  getCheckoutStep = vi.fn().mockReturnValue(testStep);
}

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState = vi
    .fn()
    .mockReturnValue(of({ loading: false, error: false, data: undefined }));
}

class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  getSelectedDeliveryModeState = vi
    .fn()
    .mockReturnValue(of({ loading: false, error: false, data: undefined }));
  setDeliveryMode = vi.fn();
}

class MockCheckoutPaymentFacade implements Partial<CheckoutPaymentFacade> {
  getPaymentDetailsState = vi
    .fn()
    .mockReturnValue(of({ loading: false, error: false, data: undefined }));
}

class MockCheckoutFiscalIdFacade implements Partial<CheckoutFiscalIdFacade> {
  getConfiguration = vi
    .fn()
    .mockReturnValue(of({ enabled: false, required: false }));
}

const hasDeliveryItems$ = new BehaviorSubject<boolean>(false);
class MockCartService implements Partial<ActiveCartFacade> {
  hasDeliveryItems = () => hasDeliveryItems$.asObservable();
  takeActive = vi.fn().mockReturnValue(of({}));
}

describe(`CheckoutStepsSetGuard`, () => {
  let guard: CheckoutStepsSetGuard;
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
  let checkoutPaymentFacade: CheckoutPaymentFacade;
  let checkoutStepService: CheckoutStepService;
  let checkoutFiscalIdFacade: CheckoutFiscalIdFacade;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    vi.clearAllMocks();
    hasDeliveryItems$.next(false);
    TestBed.configureTestingModule({
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
        { provide: ActiveCartFacade, useClass: MockCartService },
        {
          provide: CheckoutFiscalIdFacade,
          useClass: MockCheckoutFiscalIdFacade,
        },
      ],
    });

    guard = TestBed.inject(CheckoutStepsSetGuard);
    checkoutDeliveryAddressFacade = TestBed.inject(
      CheckoutDeliveryAddressFacade
    );
    checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
    checkoutPaymentFacade = TestBed.inject(CheckoutPaymentFacade);
    checkoutStepService = TestBed.inject(CheckoutStepService);
    checkoutFiscalIdFacade = TestBed.inject(CheckoutFiscalIdFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  describe('Fiscal ID', () => {
    let reviewRoute: ActivatedRouteSnapshot;

    beforeEach(() => {
      reviewRoute = new ActivatedRouteSnapshot();
      reviewRoute.url = [
        new UrlSegment('checkout', {}),
        new UrlSegment('route4', {}),
      ];
      vi.spyOn(checkoutFiscalIdFacade, 'getConfiguration').mockReturnValue(
        of({ enabled: true, required: true })
      );
      vi.spyOn(checkoutPaymentFacade, 'getPaymentDetailsState').mockReturnValue(
        of({ loading: false, error: false, data: { id: 'saved-payment' } })
      );
    });

    it('redirects an Express Checkout jump to Review to Payment when the required value is missing', async () => {
      const result = await firstValueFrom(guard.canActivate(reviewRoute));

      expect(result.toString()).toEqual('/checkout/route3');
    });

    it('allows Review when the required value is already bound', async () => {
      vi.spyOn(activeCartFacade, 'takeActive').mockReturnValue(
        of({
          sapCustomerFiscalId: {
            sapFiscalIdEntries: [{ sapValue: '123456789' }],
          },
        })
      );

      expect(await firstValueFrom(guard.canActivate(reviewRoute))).toBe(true);
    });

    it.each([
      { enabled: true, required: false },
      { enabled: false, required: true },
    ])('allows Review for configuration %o', async (configuration) => {
      vi.spyOn(checkoutFiscalIdFacade, 'getConfiguration').mockReturnValue(
        of(configuration)
      );

      expect(await firstValueFrom(guard.canActivate(reviewRoute))).toBe(true);
      expect(activeCartFacade.takeActive).not.toHaveBeenCalled();
    });

    it('allows entering the Fiscal ID input step', async () => {
      vi.spyOn(
        checkoutDeliveryModesFacade,
        'getSelectedDeliveryModeState'
      ).mockReturnValue(
        of({ loading: false, error: false, data: { code: 'standard' } })
      );
      reviewRoute.url[1] = new UrlSegment('route3', {});

      expect(await firstValueFrom(guard.canActivate(reviewRoute))).toBe(true);
      expect(checkoutFiscalIdFacade.getConfiguration).not.toHaveBeenCalled();
    });

    it('preserves the existing incomplete payment redirect', async () => {
      vi.spyOn(checkoutPaymentFacade, 'getPaymentDetailsState').mockReturnValue(
        of({ loading: false, error: false, data: undefined })
      );

      const result = await firstValueFrom(guard.canActivate(reviewRoute));

      expect(result.toString()).toEqual('/checkout/route3');
      expect(checkoutFiscalIdFacade.getConfiguration).not.toHaveBeenCalled();
    });
  });

  describe('should be able to disable/enable delivery address and delivery mode step', () => {
    it('should disable delivery address step', () => {
      expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.DELIVERY_ADDRESS,
        true
      );
      expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.DELIVERY_MODE,
        true
      );
      expect(testStep.nameMultiLine).toBeFalsy();
    });

    it('should enable delivery address step', () => {
      hasDeliveryItems$.next(true);
      expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.DELIVERY_ADDRESS,
        false
      );
      expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.DELIVERY_MODE,
        false
      );
      expect(testStep.nameMultiLine).toBeTruthy();
    });
  });

  describe('there is no checkout data set yet', () => {
    it('go to step1 (delivery address), should return true (no need cost center for CARD)', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route1'] })
      );
      expect(result).toBeTruthy();
    });

    it('go to step2 (delivery mode), should return step1', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route2'] })
      );
      expect(result.toString()).toEqual('/checkout/route1');
    });

    it('go to step3 (payment details), should return step2', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route3'] })
      );
      expect(result.toString()).toEqual('/checkout/route2');
    });

    it('go to step4 (review details), should return step3', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route4'] })
      );
      expect(result.toString()).toEqual('/checkout/route3');
    });
  });

  describe('step1 (delivery address) data set', () => {
    beforeEach(() => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState = vi
        .fn()
        .mockReturnValue(
          of({ loading: false, error: false, data: { id: 'test-address' } })
        );
    });

    it('go to step2 (delivery mode), should return true', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route2'] })
      );
      expect(result).toBeTruthy();
    });

    it('go to step3 (payment details), should return step2', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route3'] })
      );
      expect(result.toString()).toEqual('/checkout/route2');
    });

    it('go to step4 (review details), should return step3', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route4'] })
      );
      expect(result.toString()).toEqual('/checkout/route3');
    });
  });

  describe('step2 (delivery mode) data set', () => {
    beforeEach(() => {
      checkoutDeliveryModesFacade.getSelectedDeliveryModeState = vi
        .fn()
        .mockReturnValue(
          of({
            loading: false,
            error: false,
            data: { code: 'test-delivery-mode' },
          })
        );
    });

    it('go to step3 (payment details), should return true', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route3'] })
      );
      expect(result).toBeTruthy();
    });

    it('go to step4 (review details), should return step3', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route4'] })
      );
      expect(result.toString()).toEqual('/checkout/route3');
    });
  });

  describe('step3 (payment details) data set', () => {
    beforeEach(() => {
      checkoutPaymentFacade.getPaymentDetailsState = vi
        .fn()
        .mockReturnValue(
          of({ loading: false, error: false, data: { id: 'test-details' } })
        );
    });

    it('go to step4 (review details), should return true', async () => {
      const result = await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route4'] })
      );
      expect(result).toBeTruthy();
    });

    it('before go to review step, if delivery mode step is disabled, should set it to pickup', async () => {
      testStep.disabled = true;
      await firstValueFrom(
        guard.canActivate(<any>{ url: ['checkout', 'route4'] })
      );
      expect(checkoutDeliveryModesFacade.setDeliveryMode).toHaveBeenCalledWith(
        'pickup'
      );
      testStep.disabled = false;
    });
  });
});
