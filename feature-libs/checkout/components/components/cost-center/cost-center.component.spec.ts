import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CheckoutCostCenterFacade,
  PaymentTypeFacade,
} from '@spartacus/checkout/root';
import {
  CostCenter,
  I18nTestingModule,
  UserCostCenterService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CostCenterComponent } from './cost-center.component';

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

class MockCheckoutCostCenterService {
  getCostCenter(): Observable<string> {
    return of(mockCostCenters[0].code);
  }
  setCostCenter(_costCenterId: string): void {}
}

const accountPayment$ = new BehaviorSubject<boolean>(false);
class MockPaymentTypeService {
  isAccountPayment(): Observable<boolean> {
    return accountPayment$.asObservable();
  }
}

class MockUserCostCenterService {
  getActiveCostCenters(): Observable<CostCenter[]> {
    return of(mockCostCenters);
  }
}

describe('CostCenterComponent', () => {
  let component: CostCenterComponent;
  let fixture: ComponentFixture<CostCenterComponent>;
  let checkoutCostCenterService: CheckoutCostCenterFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CostCenterComponent],
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
          provide: PaymentTypeFacade,
          useClass: MockPaymentTypeService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterComponent);
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

    let result: boolean;
    component.isAccountPayment$
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toBe(false);
  });

  it('should return true for payment type when it is ACCOUNT type', () => {
    accountPayment$.next(true);
    fixture.detectChanges();

    let result: boolean;
    component.isAccountPayment$
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toBe(true);
  });

  it('should get cost centers', () => {
    let costCenter: CostCenter[];

    component.costCenters$
      .subscribe((data) => (costCenter = data))
      .unsubscribe();

    expect(costCenter).toBeTruthy();
    expect(costCenter).toEqual(mockCostCenters);
  });

  it('should NOT set default if the cart already CONTAINS a cost center', () => {
    spyOn(checkoutCostCenterService, 'setCostCenter').and.stub();
    let costCenter: CostCenter[];

    component.costCenters$
      .subscribe((data) => (costCenter = data))
      .unsubscribe();

    expect(costCenter).toBeTruthy();
    expect(costCenter).toEqual(mockCostCenters);
    expect(component['costCenterId']).toEqual(mockCostCenters[0].code);
    expect(checkoutCostCenterService.setCostCenter).not.toHaveBeenCalled();
  });

  it('should set default if the cart does NOT contain a cost center', () => {
    spyOn(checkoutCostCenterService, 'setCostCenter').and.stub();
    spyOn(checkoutCostCenterService, 'getCostCenter').and.returnValue(of(null));
    let costCenter: CostCenter[];

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
    spyOn(checkoutCostCenterService, 'setCostCenter').and.stub();

    component.setCostCenter(mockCostCenters[1].code);

    expect(component['costCenterId']).toEqual(mockCostCenters[1].code);
    expect(checkoutCostCenterService.setCostCenter).toHaveBeenCalledWith(
      mockCostCenters[1].code
    );
  });
});
