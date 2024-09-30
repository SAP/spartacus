import { TestBed } from '@angular/core/testing';
import { CheckoutServiceOrderStepsSetGuard } from './checkout-service-order-steps-set.guard';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
import createSpy = jasmine.createSpy;
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
  hasDeliveryItems = createSpy().and.returnValue(of(false));
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
  it('should disable service details tab if cart has no service products and no physical products', (done) => {
    spyOn(facade, 'hasServiceItems').and.returnValue(of(false));
    spyOn(facade, 'hasNonServiceItems').and.returnValue(of(false));
    spyOn(stepService, 'disableEnableStep').and.returnValue();
    guard.canActivate(<any>{ url: ['checkout', 'route3'] }).subscribe(() => {
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.SERVICE_DETAILS,
        true
      );
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.DELIVERY_MODE,
        true
      );
      done();
    });
  });
  it('should disable service details tab if cart has no service products but physical products', (done) => {
    spyOn(facade, 'hasServiceItems').and.returnValue(of(false));
    spyOn(facade, 'hasNonServiceItems').and.returnValue(of(true));
    spyOn(stepService, 'disableEnableStep').and.returnValue();
    guard.canActivate(<any>{ url: ['checkout', 'route3'] }).subscribe(() => {
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.SERVICE_DETAILS,
        true
      );
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.DELIVERY_MODE,
        false
      );
      done();
    });
  });
  it('should enable service details tab if service products exists but no physical product in cart', (done) => {
    spyOn(facade, 'hasServiceItems').and.returnValue(of(true));
    spyOn(facade, 'hasNonServiceItems').and.returnValue(of(false));
    spyOn(stepService, 'disableEnableStep').and.returnValue();
    guard.canActivate(<any>{ url: ['checkout', 'route3'] }).subscribe(() => {
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.SERVICE_DETAILS,
        false
      );
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.DELIVERY_MODE,
        true
      );
      done();
    });
  });
  it('should enable service details tab if both service products and physical products exists in cart', (done) => {
    spyOn(facade, 'hasServiceItems').and.returnValue(of(true));
    spyOn(facade, 'hasNonServiceItems').and.returnValue(of(true));
    spyOn(stepService, 'disableEnableStep').and.returnValue();
    guard.canActivate(<any>{ url: ['checkout', 'route3'] }).subscribe(() => {
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.SERVICE_DETAILS,
        false
      );
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.DELIVERY_MODE,
        false
      );
      done();
    });
  });
  it('should move to next step once service details are set', () => {
    spyOn(facade, 'getSelectedServiceDetailsState').and.callThrough();
    spyOn(facade, 'hasServiceItems').and.callThrough();
    spyOn(facade, 'hasNonServiceItems').and.callThrough();
    spyOn(guard, 'setServiceDeliveryMode').and.returnValue(of(undefined));
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
    spyOn(facade, 'getSelectedServiceDetailsState').and.returnValue(
      of({ loading: false, error: false, data: undefined })
    );
    spyOn(facade, 'hasServiceItems').and.callThrough();
    spyOn(facade, 'hasNonServiceItems').and.callThrough();
    spyOn(guard, 'setServiceDeliveryMode').and.returnValue(of(undefined));
    spyOn(guard as any, 'getUrl').and.returnValue('/');
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
    it('should check if payment type is set', (done) => {
      spyOn(guard as any, 'isPaymentTypeSet').and.returnValue(of(true));
      (guard as any)
        .isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.PAYMENT_TYPE] },
          true
        )
        .subscribe(() => {
          expect((guard as any).isPaymentTypeSet).toHaveBeenCalledWith({
            disabled: false,
            type: [CheckoutStepType.PAYMENT_TYPE],
          });
          done();
        });
    });
    it('should check if delivery address is set', (done) => {
      spyOn(guard as any, 'isDeliveryAddressAndCostCenterSet').and.returnValue(
        of(true)
      );
      (guard as any)
        .isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.DELIVERY_ADDRESS] },
          true
        )
        .subscribe(() => {
          expect(
            (guard as any).isDeliveryAddressAndCostCenterSet
          ).toHaveBeenCalledWith(
            { disabled: false, type: [CheckoutStepType.DELIVERY_ADDRESS] },
            true
          );
          done();
        });
    });
    it('should check if delivery mode is set', (done) => {
      spyOn(guard as any, 'isDeliveryModeSet').and.returnValue(of(true));
      (guard as any)
        .isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.DELIVERY_MODE] },
          true
        )
        .subscribe(() => {
          expect((guard as any).isDeliveryModeSet).toHaveBeenCalledWith({
            disabled: false,
            type: [CheckoutStepType.DELIVERY_MODE],
          });
          done();
        });
    });
    it('should check if service details is set', (done) => {
      spyOn(guard as any, 'isServiceDetailsSet').and.returnValue(of(true));
      (guard as any)
        .isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.SERVICE_DETAILS] },
          true
        )
        .subscribe(() => {
          expect((guard as any).isServiceDetailsSet).toHaveBeenCalledWith({
            disabled: false,
            type: [CheckoutStepType.SERVICE_DETAILS],
          });
          done();
        });
    });
    it('should check if payment details is set', (done) => {
      spyOn(guard as any, 'isPaymentDetailsSet').and.returnValue(of(true));
      (guard as any)
        .isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.PAYMENT_DETAILS] },
          true
        )
        .subscribe(() => {
          expect((guard as any).isPaymentDetailsSet).toHaveBeenCalledWith({
            disabled: false,
            type: [CheckoutStepType.PAYMENT_DETAILS],
          });
          done();
        });
    });
    it('should check if review order is reached', (done) => {
      (guard as any)
        .isB2BStepSet(
          { disabled: false, type: [CheckoutStepType.REVIEW_ORDER] },
          true
        )
        .subscribe((response: any) => {
          expect(response).toEqual(true);
          done();
        });
    });
    it('should return true if step is disabled', (done) => {
      (guard as any)
        .isB2BStepSet(
          { disabled: true, type: [CheckoutStepType.PAYMENT_DETAILS] },
          true
        )
        .subscribe((response: any) => {
          expect(response).toEqual(true);
          done();
        });
    });
    it('should set delivery mode to service-delivery if the cart contains only service products', (done) => {
      spyOn(facade, 'hasServiceItems').and.returnValue(of(true));
      spyOn(facade, 'hasNonServiceItems').and.returnValue(of(false));
      spyOn(deliveryModeFacade, 'setDeliveryMode').and.returnValue(
        of(undefined)
      );
      guard.setServiceDeliveryMode().subscribe(() => {
        expect(deliveryModeFacade.setDeliveryMode).toHaveBeenCalledWith(
          'my-service-delivery-mode'
        );
        done();
      });
    });
    it('should not set delivery mode to service-delivery if the cart contains service products + physical products', (done) => {
      spyOn(facade, 'hasServiceItems').and.returnValue(of(true));
      spyOn(facade, 'hasNonServiceItems').and.returnValue(of(true));
      spyOn(deliveryModeFacade, 'setDeliveryMode').and.returnValue(
        of(undefined)
      );
      guard.setServiceDeliveryMode().subscribe(() => {
        expect(deliveryModeFacade.setDeliveryMode).not.toHaveBeenCalledWith(
          'my-service-delivery-mode'
        );
        done();
      });
    });
    it('should not set delivery mode to service-delivery if the cart contains only physical products', (done) => {
      spyOn(facade, 'hasServiceItems').and.returnValue(of(false));
      spyOn(facade, 'hasNonServiceItems').and.returnValue(of(true));
      spyOn(deliveryModeFacade, 'setDeliveryMode').and.returnValue(
        of(undefined)
      );
      guard.setServiceDeliveryMode().subscribe(() => {
        expect(deliveryModeFacade.setDeliveryMode).not.toHaveBeenCalledWith(
          'my-service-delivery-mode'
        );
        done();
      });
    });
  });
});
