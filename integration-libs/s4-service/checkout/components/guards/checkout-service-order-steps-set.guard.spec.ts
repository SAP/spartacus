import { TestBed } from '@angular/core/testing';
import { CheckoutServiceOrderStepsSetGuard } from './checkout-service-order-steps-set.guard';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutServiceDetailsFacade } from '@spartacus/s4-service/root';
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
  getServiceProducts(): Observable<any> {
    return of(['456']);
  }
}

describe('CheckoutServiceOrderStepsSetGuard', () => {
  let guard: CheckoutServiceOrderStepsSetGuard;
  let facade: CheckoutServiceDetailsFacade;
  let stepService: CheckoutStepService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: CheckoutServiceDetailsFacade,
          useClass: MockCheckoutServiceDetailsFacade,
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
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should disable service details tab if no service products exists', (done) => {
    spyOn(facade, 'getServiceProducts').and.returnValue(of([]));
    spyOn(stepService, 'disableEnableStep').and.returnValue();
    guard.canActivate(<any>{ url: ['checkout', 'route3'] }).subscribe(() => {
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.SERVICE_DETAILS,
        true
      );
      done();
    });
  });
  it('should enable service details tab if service products exists', (done) => {
    spyOn(facade, 'getServiceProducts').and.returnValue(
      of(['service-1', 'service-2'])
    );
    spyOn(stepService, 'disableEnableStep').and.returnValue();
    guard.canActivate(<any>{ url: ['checkout', 'route3'] }).subscribe(() => {
      expect(stepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.SERVICE_DETAILS,
        false
      );
      done();
    });
  });
  it('should move to next step once service details are set', () => {
    spyOn(facade, 'getSelectedServiceDetailsState').and.callThrough();
    spyOn(facade, 'getServiceProducts').and.callThrough();
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
    spyOn(facade, 'getServiceProducts').and.returnValue(of(['a', 'b']));
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
  });
});
