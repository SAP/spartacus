import { TestBed } from '@angular/core/testing';
import { CheckoutServiceOrderStepsSetGuard } from './checkout-service-order-steps-set.guard';
import { BehaviorSubject, Observable, firstValueFrom, of } from 'rxjs';
import {
  CheckoutServiceDetailsFacade,
  S4ServiceDeliveryModeConfig,
} from '@spartacus/s4-service/root';
import {
  Address,
  CostCenter,
  PaymentDetails,
  QueryState,
  RouteConfig,
  RoutingConfigService,
} from '@spartacus/core';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { StoreModule } from '@ngrx/store';
import { CheckoutB2BStepsSetGuard } from '@spartacus/checkout/b2b/components';
import {
  PaymentType,
  DeliveryMode,
  ActiveCartFacade,
} from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
const mockServiceDeliveryModeConfig: S4ServiceDeliveryModeConfig = {
  s4ServiceDeliveryMode: {
    code: 'my-service-delivery-mode',
  },
};
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
  disableEnableStep() {}
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
  setDeliveryMode(_mode: string): Observable<unknown> {
    return of(undefined);
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
const mockScheduledAt = '2024-06-27T09:30:00-04:00';
class MockCheckoutServiceDetailsFacade
  implements Partial<CheckoutServiceDetailsFacade>
{
  getSelectedServiceDetailsState(): Observable<QueryState<string | undefined>> {
    return of({ loading: false, error: false, data: mockScheduledAt });
  }
  hasServiceItems(): Observable<boolean> {
    return of(true);
  }
  hasNonServiceItems(): Observable<boolean> {
    return of(false);
  }
}

describe('CheckoutServiceOrderStepsSetGuard', () => {
  let guard: CheckoutServiceOrderStepsSetGuard;
  let facade: CheckoutServiceDetailsFacade;
  let deliveryModeFacade: CheckoutDeliveryModesFacade;
  let stepService: CheckoutStepService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: CheckoutServiceDetailsFacade,
          useClass: MockCheckoutServiceDetailsFacade,
        },
        {
          provide: S4ServiceDeliveryModeConfig,
          useValue: mockServiceDeliveryModeConfig,
        },
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
    guard = TestBed.inject(CheckoutServiceOrderStepsSetGuard);
    stepService = TestBed.inject(CheckoutStepService);
    facade = TestBed.inject(CheckoutServiceDetailsFacade);
    deliveryModeFacade = TestBed.inject(CheckoutDeliveryModesFacade);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should disable service details tab if cart has no service products and no physical products', async () => {
    vi.spyOn(facade, 'hasServiceItems').mockReturnValue(of(false));
    vi.spyOn(facade, 'hasNonServiceItems').mockReturnValue(of(false));
    vi.spyOn(stepService, 'disableEnableStep').mockReturnValue();
    await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route3'] }));
    expect(stepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.SERVICE_DETAILS,
      true
    );
    expect(stepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.DELIVERY_MODE,
      true
    );
  });
  it('should disable service details tab if cart has no service products but physical products', async () => {
    vi.spyOn(facade, 'hasServiceItems').mockReturnValue(of(false));
    vi.spyOn(facade, 'hasNonServiceItems').mockReturnValue(of(true));
    vi.spyOn(stepService, 'disableEnableStep').mockReturnValue();
    await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route3'] }));
    expect(stepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.SERVICE_DETAILS,
      true
    );
    expect(stepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.DELIVERY_MODE,
      false
    );
  });
  it('should enable service details tab if service products exists but no physical product in cart', async () => {
    vi.spyOn(facade, 'hasServiceItems').mockReturnValue(of(true));
    vi.spyOn(facade, 'hasNonServiceItems').mockReturnValue(of(false));
    vi.spyOn(stepService, 'disableEnableStep').mockReturnValue();
    await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route3'] }));
    expect(stepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.SERVICE_DETAILS,
      false
    );
    expect(stepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.DELIVERY_MODE,
      true
    );
  });
  it('should enable service details tab if both service products and physical products exists in cart', async () => {
    vi.spyOn(facade, 'hasServiceItems').mockReturnValue(of(true));
    vi.spyOn(facade, 'hasNonServiceItems').mockReturnValue(of(true));
    vi.spyOn(stepService, 'disableEnableStep').mockReturnValue();
    await firstValueFrom(guard.canActivate(<any>{ url: ['checkout', 'route3'] }));
    expect(stepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.SERVICE_DETAILS,
      false
    );
    expect(stepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.DELIVERY_MODE,
      false
    );
  });
  it('should move to next step once service details are set', () => {
    vi.spyOn(facade, 'getSelectedServiceDetailsState');
    vi.spyOn(facade, 'hasServiceItems');
    vi.spyOn(facade, 'hasNonServiceItems');
    vi.spyOn(guard, 'setServiceDeliveryMode').mockReturnValue(of(undefined));
    (guard as any)
      .isServiceDetailsSet({
        type: CheckoutStepType.SERVICE_DETAILS,
        routeName: 'test',
      })
      .subscribe((response: any) => {
        expect(response).toEqual(true);
      });
  });
  it('should move to next step once service details are set', () => {
    vi.spyOn(facade, 'getSelectedServiceDetailsState').mockReturnValue(
      of({ loading: false, error: false, data: undefined })
    );
    vi.spyOn(facade, 'hasServiceItems');
    vi.spyOn(facade, 'hasNonServiceItems');
    vi.spyOn(guard, 'setServiceDeliveryMode').mockReturnValue(of(undefined));
    vi.spyOn(guard as any, 'getUrl').mockReturnValue('/');
    (guard as any)
      .isServiceDetailsSet({
        type: CheckoutStepType.SERVICE_DETAILS,
        routeName: 'test',
      })
      .subscribe((response: any) => {
        expect(response).toEqual('/');
        expect((guard as any).getUrl).toHaveBeenCalled();
      });
  });
  describe('isB2BStepSet', () => {
    it('should check if payment type is set', async () => {
      vi.spyOn(guard as any, 'isPaymentTypeSet').mockReturnValue(of(true));
      await firstValueFrom(
        (guard as any).isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.PAYMENT_TYPE] },
          true
        )
      );
      expect((guard as any).isPaymentTypeSet).toHaveBeenCalledWith({
        disabled: false,
        type: [CheckoutStepType.PAYMENT_TYPE],
      });
    });
    it('should check if delivery address is set', async () => {
      vi.spyOn(guard as any, 'isDeliveryAddressAndCostCenterSet').mockReturnValue(
        of(true)
      );
      await firstValueFrom(
        (guard as any).isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.DELIVERY_ADDRESS] },
          true
        )
      );
      expect(
        (guard as any).isDeliveryAddressAndCostCenterSet
      ).toHaveBeenCalledWith(
        { disabled: false, type: [CheckoutStepType.DELIVERY_ADDRESS] },
        true
      );
    });
    it('should check if delivery mode is set', async () => {
      vi.spyOn(guard as any, 'isDeliveryModeSet').mockReturnValue(of(true));
      await firstValueFrom(
        (guard as any).isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.DELIVERY_MODE] },
          true
        )
      );
      expect((guard as any).isDeliveryModeSet).toHaveBeenCalledWith({
        disabled: false,
        type: [CheckoutStepType.DELIVERY_MODE],
      });
    });
    it('should check if service details is set', async () => {
      vi.spyOn(guard as any, 'isServiceDetailsSet').mockReturnValue(of(true));
      await firstValueFrom(
        (guard as any).isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.SERVICE_DETAILS] },
          true
        )
      );
      expect((guard as any).isServiceDetailsSet).toHaveBeenCalledWith({
        disabled: false,
        type: [CheckoutStepType.SERVICE_DETAILS],
      });
    });
    it('should check if payment details is set', async () => {
      vi.spyOn(guard as any, 'isPaymentDetailsSet').mockReturnValue(of(true));
      await firstValueFrom(
        (guard as any).isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.PAYMENT_DETAILS] },
          true
        )
      );
      expect((guard as any).isPaymentDetailsSet).toHaveBeenCalledWith({
        disabled: false,
        type: [CheckoutStepType.PAYMENT_DETAILS],
      });
    });
    it('should check if review order is reached', async () => {
      const response = await firstValueFrom(
        (guard as any).isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.REVIEW_ORDER] },
          true
        )
      );
      expect(response).toEqual(true);
    });
    it('should return true if step is disabled', async () => {
      const response = await firstValueFrom(
        (guard as any).isB2BStepSet(
          { disabled: true, type: [CheckoutStepType.PAYMENT_DETAILS] },
          true
        )
      );
      expect(response).toEqual(true);
    });
    it('should set delivery mode to service-delivery if the cart contains only service products', async () => {
      vi.spyOn(facade, 'hasServiceItems').mockReturnValue(of(true));
      vi.spyOn(facade, 'hasNonServiceItems').mockReturnValue(of(false));
      vi.spyOn(deliveryModeFacade, 'setDeliveryMode').mockReturnValue(
        of(undefined)
      );
      await firstValueFrom(guard.setServiceDeliveryMode());
      expect(deliveryModeFacade.setDeliveryMode).toHaveBeenCalledWith(
        'my-service-delivery-mode'
      );
    });
    it('should not set delivery mode to service-delivery if the cart contains service products + physical products', async () => {
      vi.spyOn(facade, 'hasServiceItems').mockReturnValue(of(true));
      vi.spyOn(facade, 'hasNonServiceItems').mockReturnValue(of(true));
      vi.spyOn(deliveryModeFacade, 'setDeliveryMode').mockReturnValue(
        of(undefined)
      );
      await firstValueFrom(guard.setServiceDeliveryMode());
      expect(deliveryModeFacade.setDeliveryMode).not.toHaveBeenCalledWith(
        'my-service-delivery-mode'
      );
    });
    it('should not set delivery mode to service-delivery if the cart contains only physical products', async () => {
      vi.spyOn(facade, 'hasServiceItems').mockReturnValue(of(false));
      vi.spyOn(facade, 'hasNonServiceItems').mockReturnValue(of(true));
      vi.spyOn(deliveryModeFacade, 'setDeliveryMode').mockReturnValue(
        of(undefined)
      );
      await firstValueFrom(guard.setServiceDeliveryMode());
      expect(deliveryModeFacade.setDeliveryMode).not.toHaveBeenCalledWith(
        'my-service-delivery-mode'
      );
    });
  });
});
