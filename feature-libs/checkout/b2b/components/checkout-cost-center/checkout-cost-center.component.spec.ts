import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CostCenter,
  I18nTestingModule,
  UserCostCenterService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutCostCenterComponent } from './checkout-cost-center.component';
import createSpy = jasmine.createSpy;

const mockCostCenters: CostCenter[] = [
  {
    code: 'test-cost-center1',
    name: 'test-cost-center1',
  },
  {
    code: 'test-cost-center2',
    name: 'test-cost-center-name2',
  },
];

class MockCheckoutCostCenterService
  implements Partial<CheckoutCostCenterFacade>
{
  getCostCenterState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: mockCostCenters[0] })
  );

  setCostCenter = createSpy().and.returnValue(of({}));
}

const accountPayment$ = new BehaviorSubject<boolean>(false);
class MockCheckoutPaymentTypeFacade
  implements Partial<CheckoutPaymentTypeFacade>
{
  isAccountPayment(): Observable<boolean> {
    return accountPayment$.asObservable();
  }
}

class MockUserCostCenterService implements Partial<UserCostCenterService> {
  getActiveCostCenters(): Observable<CostCenter[]> {
    return of(mockCostCenters);
  }
}

describe('CheckoutCostCenterComponent', () => {
  let component: CheckoutCostCenterComponent;
  let fixture: ComponentFixture<CheckoutCostCenterComponent>;
  let checkoutCostCenterService: CheckoutCostCenterFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CheckoutCostCenterComponent],
      providers: [
        {
          provide: UserCostCenterService,
          useClass: MockUserCostCenterService,
        },
        {
          provide: CheckoutCostCenterFacade,
          useClass: MockCheckoutCostCenterService,
        },
        {
          provide: CheckoutPaymentTypeFacade,
          useClass: MockCheckoutPaymentTypeFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    checkoutCostCenterService = TestBed.inject(CheckoutCostCenterFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false for payment type when it is NOT ACCOUNT type', () => {
    accountPayment$.next(false);
    fixture.detectChanges();

    component.ngOnInit();

    expect(component.isAccountPayment).toBe(false);
  });

  it('should return true for payment type when it is ACCOUNT type', () => {
    accountPayment$.next(true);
    fixture.detectChanges();

    component.ngOnInit();

    expect(component.isAccountPayment).toBe(true);
  });

  it('should get cost centers', () => {
    let costCenter: CostCenter[] | undefined;

    component.costCenters$
      .subscribe((data) => (costCenter = data))
      .unsubscribe();

    expect(costCenter).toBeTruthy();
    expect(costCenter).toEqual(mockCostCenters);
  });

  it('should NOT set default if the cart already CONTAINS a cost center', () => {
    component.ngOnInit();
    fixture.detectChanges();

    let costCenter: CostCenter[] | undefined;

    component.costCenters$
      .subscribe((data) => (costCenter = data))
      .unsubscribe();

    expect(costCenter).toBeTruthy();
    expect(costCenter).toEqual(mockCostCenters);
    expect(component['costCenterId']).toEqual(mockCostCenters[0].code);
    expect(checkoutCostCenterService.setCostCenter).not.toHaveBeenCalled();
  });

  it('should set default if the cart does NOT contain a cost center', () => {
    checkoutCostCenterService.getCostCenterState = createSpy().and.returnValue(
      of({ loading: false, error: false, data: undefined })
    );

    component.ngOnInit();
    fixture.detectChanges();

    let costCenter: CostCenter[] | undefined;

    component.costCenters$
      .subscribe((data) => (costCenter = data))
      .unsubscribe();

    expect(costCenter).toBeTruthy();
    expect(costCenter).toEqual(mockCostCenters);
    expect(component['costCenterId']).toEqual(mockCostCenters[0].code);
    expect(checkoutCostCenterService.setCostCenter).toHaveBeenCalledWith(
      mockCostCenters[0].code
    );
  });

  it('should set cost center', () => {
    component.setCostCenter(mockCostCenters[1].code ?? '');

    expect(component['costCenterId']).toEqual(mockCostCenters[1].code);
    expect(checkoutCostCenterService.setCostCenter).toHaveBeenCalledWith(
      mockCostCenters[1].code
    );
  });
});
