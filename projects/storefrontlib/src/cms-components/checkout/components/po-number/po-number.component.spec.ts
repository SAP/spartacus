import { Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  PaymentTypeService,
  UserCostCenterService,
  CheckoutCostCenterService,
  I18nTestingModule,
  CostCenter,
  B2BPaymentTypeEnum
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { PoNumberComponent } from './po-number.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockPaymentTypeService {
  getSelectedPaymentType(): Observable<string> {
    return of(B2BPaymentTypeEnum.ACCOUNT_PAYMENT);
  }
  getPoNumber(): Observable<string> {
    return of('cart-po');
  }
  setPaymentType(): void {}
}

class MockCheckoutCostCenterService {
  getCostCenter(): Observable<string> {
    return of('cart-cost-center');
  }
  setCostCenter(): void {}
}

class MockCheckoutStepService {
  next = createSpy();
  back = createSpy();
  getBackBntText(): string {
    return '';
  }
}

class MockUserCostCenterService {
  getActiveCostCenters(): Observable<CostCenter[]> {
    return of([{ code: 'test', name: 'test cost center' }]);
  }
}

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-type'],
  },
};

describe('PoNumberComponent', () => {
  let component: PoNumberComponent;
  let fixture: ComponentFixture<PoNumberComponent>;
  let checkoutStepService: CheckoutStepService;
  let paymentTypeService: PaymentTypeService;
  let checkoutCostCenterService: CheckoutCostCenterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [PoNumberComponent, MockSpinnerComponent],
      providers: [
        {
          provide: PaymentTypeService,
          useClass: MockPaymentTypeService,
        },
        {
          provide: CheckoutStepService,
          useClass: MockCheckoutStepService,
        },
        {
          provide: UserCostCenterService,
          useClass: MockUserCostCenterService,
        },
        {
          provide: CheckoutCostCenterService,
          useClass: MockCheckoutCostCenterService,
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    checkoutStepService = TestBed.inject(
      CheckoutStepService as Type<CheckoutStepService>
    );
    paymentTypeService = TestBed.inject(
      PaymentTypeService as Type<PaymentTypeService>
    );
    checkoutCostCenterService = TestBed.inject(
      CheckoutCostCenterService as Type<CheckoutCostCenterService>
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get payment type selected', () => {
    let type;
    component.typeSelected$.subscribe((data) => (type = data));
    expect(type).toEqual('ACCOUNT');
  });

  it('should be able to get cart po number', () => {
    component.cartPoNumber$.subscribe();
    expect(component.cartPoNumber).toEqual('cart-po');
  });

  it('should be able to get the active cost centers of the user', () => {
    let costCenters;
    component.costCenters$.subscribe((data) => (costCenters = data));
    expect(costCenters).toEqual([{ code: 'test', name: 'test cost center' }]);
    expect(component.costCenterId).toEqual('test');
  });

  it('should be able to get cart assigned cost center', () => {
    component.cartCostCenter$.subscribe();
    expect(component.cartCostCenterId).toEqual('cart-cost-center');
  });

  it('should go to next step if cart assigned cost center is the same as cost selected', () => {
    component.allowRedirect = false;
    component.costCenterId = 'cart-cost-center';

    component.cartCostCenter$.subscribe();
    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  it('should set the po to cart after invoking next()', () => {
    spyOn(paymentTypeService, 'setPaymentType').and.stub();
    fixture.detectChanges();
    component['_poNumberInput'].nativeElement.value = '';
    component.costCenterId = 'cart-cost-center';
    component.next();
    expect(paymentTypeService.setPaymentType).toHaveBeenCalledWith(
      'ACCOUNT',
      ''
    );
    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  it('should set the cost center to cart after invoking next()', () => {
    spyOn(checkoutCostCenterService, 'setCostCenter').and.stub();
    fixture.detectChanges();
    component['_poNumberInput'].nativeElement.value = 'cart-po';
    component.costCenterId = 'cost-center';
    component.next();
    expect(checkoutCostCenterService.setCostCenter).toHaveBeenCalledWith(
      'cost-center'
    );
    expect(component.allowRedirect).toBeFalse();
  });

  it('should be able to go to previous step', () => {
    component.back();
    expect(checkoutStepService.back).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  describe('UI back button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-action'));

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');
      getContinueBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-primary'));

    it('should call "next" function after being clicked', () => {
      spyOn(component, 'next');
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalled();
    });
  });
});
