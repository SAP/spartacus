import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CheckoutStepType, PaymentTypeFacade } from '@spartacus/checkout/root';
import { I18nTestingModule, PaymentType } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { PaymentTypeComponent } from './payment-type.component';
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
    return selectedPaymentType$.asObservable();
  }
  getPoNumber(): Observable<string> {
    return of('test-po');
  }
}

class MockCheckoutStepService {
  disableEnableStep = createSpy();
  resetSteps = createSpy();
  goToStepWithIndex = createSpy();
  next = createSpy();
  back = createSpy();
}

const selectedPaymentType$ = new BehaviorSubject<string>('ACCOUNT');
const mockPaymentTypes: PaymentType[] = [
  { code: 'card', displayName: 'card' },
  { code: 'account', displayName: 'account' },
];

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-type'],
  },
};

describe('PaymentTypeComponent', () => {
  let component: PaymentTypeComponent;
  let fixture: ComponentFixture<PaymentTypeComponent>;

  let paymentTypeService: PaymentTypeFacade;
  let checkoutStepService: CheckoutStepService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [PaymentTypeComponent, MockSpinnerComponent],
        providers: [
          {
            provide: PaymentTypeFacade,
            useClass: MockPaymentTypeService,
          },
          {
            provide: CheckoutStepService,
            useClass: MockCheckoutStepService,
          },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      }).compileComponents();

      paymentTypeService = TestBed.inject(
        PaymentTypeFacade as Type<PaymentTypeFacade>
      );
      checkoutStepService = TestBed.inject(
        CheckoutStepService as Type<CheckoutStepService>
      );

      spyOn(paymentTypeService, 'getPaymentTypes').and.returnValue(
        of(mockPaymentTypes)
      );
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get all supported payment types', () => {
    component.paymentTypes$
      .subscribe((types) => {
        expect(types).toBe(mockPaymentTypes);
      })
      .unsubscribe();
  });

  it('should get selected payment type', () => {
    let selected: string;
    component.typeSelected$
      .subscribe((data) => {
        selected = data;
      })
      .unsubscribe();
    expect(selected).toBe('ACCOUNT');
    expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS,
      true
    );
  });

  it('should get po number from cart', () => {
    let cartPoNumber: string;

    component.cartPoNumber$
      .subscribe((data) => {
        return (cartPoNumber = data);
      })
      .unsubscribe();

    expect(cartPoNumber).toBeTruthy();
    expect(cartPoNumber).toEqual('test-po');
  });

  it('should set payment type when changeType is called', () => {
    spyOn(paymentTypeService, 'setPaymentType').and.callThrough();
    component.changeType('ACCOUNT');
    expect(paymentTypeService.setPaymentType).toHaveBeenCalledWith('ACCOUNT');
  });

  it('should set po number to cart if the cart po number does not match when calling next()', () => {
    spyOn(paymentTypeService, 'setPaymentType').and.callThrough();

    component.typeSelected = 'test-code';
    component['_poNumberInput'].nativeElement.value = 'test-po';
    component.cartPoNumber = 'test-cart-po';

    component.next();

    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
    expect(paymentTypeService.setPaymentType).toHaveBeenCalled();
  });

  it('should NOT set po number to cart if the cart po number does match when calling next()', () => {
    spyOn(paymentTypeService, 'setPaymentType').and.callThrough();

    component.typeSelected = 'test-code';
    component['_poNumberInput'].nativeElement.value = 'test-po';
    component.cartPoNumber = component['_poNumberInput'].nativeElement.value;

    component.next();

    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
    expect(paymentTypeService.setPaymentType).not.toHaveBeenCalled();
  });

  it('should go back to the previous checkout step', () => {
    component.back();

    expect(checkoutStepService.back).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });
});
