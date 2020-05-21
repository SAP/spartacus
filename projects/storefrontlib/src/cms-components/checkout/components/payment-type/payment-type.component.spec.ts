import { Component, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  setPaymentType(): void {}
  getSelectedPaymentType(): Observable<string> {
    return of('ACCOUNT');
  }
}

class MockCheckoutStepService {
  disableEnableStep = createSpy();
  resetSteps = createSpy();
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
      imports: [I18nTestingModule],
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

    paymentTypeService = TestBed.inject(
      PaymentTypeService as Type<PaymentTypeService>
    );
    checkoutStepService = TestBed.inject(
      CheckoutStepService as Type<CheckoutStepService>
    );

    spyOn(paymentTypeService, 'getPaymentTypes').and.returnValue(
      of(mockPaymentTypes)
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get all supported payment types', () => {
    component.paymentTypes$.subscribe((types) => {
      expect(types).toBe(mockPaymentTypes);
    });
  });

  it('should get selected paymen type', () => {
    let selected: string;
    component.typeSelected$.subscribe((data) => {
      selected = data;
    });
    expect(selected).toBe('ACCOUNT');
    expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS,
      true
    );
  });

  it('should set payment type when changeType is called', () => {
    spyOn(paymentTypeService, 'setPaymentType').and.callThrough();
    component.changeType('ACCOUNT');
    expect(paymentTypeService.setPaymentType).toHaveBeenCalledWith('ACCOUNT');
  });
});
