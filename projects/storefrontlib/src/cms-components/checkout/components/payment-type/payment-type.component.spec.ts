import { Component, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  PaymentTypeService,
  I18nTestingModule,
  PaymentType,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { PaymentTypeComponent } from './payment-type.component';
import { CheckoutStepType } from '../../model/checkout-step.model';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockPaymentTypeService {
  getPaymentTypes(): Observable<PaymentType[]> {
    return of();
  }
}

class MockCheckoutStepService {
  disableEnableStep = createSpy();
  resetSteps = createSpy();
  next = createSpy();
  back = createSpy();
  getBackBntText(): string {
    return '';
  }
}

const mockPaymentTypes: PaymentType[] = [
  { code: 'card', displayName: 'card' },
  { code: 'account', displayName: 'account' },
];

describe('PaymentTypeComponent', () => {
  let component: PaymentTypeComponent;
  let fixture: ComponentFixture<PaymentTypeComponent>;

  let paymentTypeService: PaymentTypeService;
  let checkoutStepService: CheckoutStepService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [PaymentTypeComponent, MockSpinnerComponent],
      providers: [
        {
          provide: PaymentTypeService,
          useClass: MockPaymentTypeService,
        },
        {
          provide: CheckoutStepService,
          useClass: MockCheckoutStepService,
        },
      ],
    }).compileComponents();

    paymentTypeService = TestBed.inject(PaymentTypeService as Type<
      PaymentTypeService
    >);
    checkoutStepService = TestBed.inject(CheckoutStepService as Type<
      CheckoutStepService
    >);

    spyOn(paymentTypeService, 'getPaymentTypes').and.returnValue(
      of(mockPaymentTypes)
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get all supported payment types', () => {
    component.paymentTypes$.subscribe(types => {
      expect(types).toBe(mockPaymentTypes);
    });
  });

  it('should reset checkout steps', () => {
    expect(checkoutStepService.resetSteps).toHaveBeenCalled();
  });

  it('should be able to go to next step', () => {
    component.next();
    expect(checkoutStepService.next).toHaveBeenCalled();
  });

  it('should set the selected payment type to cart after invoking next()', () => {
    // will implmented in #6655
  });

  it('should cbe able to go to previous step', () => {
    component.back();
    expect(checkoutStepService.back).toHaveBeenCalled();
  });

  it('should disable PAYMENT_DETAILS step when choosing type Account', () => {
    component.changeType('ACCOUNT');
    expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS,
      true
    );

    component.changeType('CARD');
    expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS,
      false
    );
  });

  describe('UI back button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-action'));

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();

      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-primary'));

    it('should call "next" function after being clicked', () => {
      spyOn(component, 'next');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();

      expect(component.next).toHaveBeenCalled();
    });
  });
});
