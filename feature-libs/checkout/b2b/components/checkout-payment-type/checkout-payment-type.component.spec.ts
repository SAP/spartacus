import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import { I18nTestingModule, PaymentType, QueryState } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentTypeComponent } from './checkout-payment-type.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockCheckoutPaymentTypeService
  implements Partial<CheckoutPaymentTypeFacade>
{
  getPaymentTypes = createSpy().and.returnValue(of(mockPaymentTypes));
  setPaymentType = createSpy().and.returnValue(of('setPaymentType'));
  getSelectedPaymentTypeState = createSpy().and.returnValue(
    selectedPaymentType$.asObservable()
  );
  getPurchaseOrderNumberState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: 'test-po' })
  );
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  disableEnableStep = createSpy();
  resetSteps = createSpy();
  goToStepWithIndex = createSpy();
  next = createSpy();
  back = createSpy();
}

const selectedPaymentType$ = new BehaviorSubject<QueryState<PaymentType>>({
  loading: false,
  error: false,
  data: { code: 'ACCOUNT' },
});
const mockPaymentTypes: PaymentType[] = [
  { code: 'card', displayName: 'card' },
  { code: 'account', displayName: 'account' },
];

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-type'],
  },
};

describe('CheckoutPaymentTypeComponent', () => {
  let component: CheckoutPaymentTypeComponent;
  let fixture: ComponentFixture<CheckoutPaymentTypeComponent>;

  let checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
  let checkoutStepService: CheckoutStepService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [CheckoutPaymentTypeComponent, MockSpinnerComponent],
        providers: [
          {
            provide: CheckoutPaymentTypeFacade,
            useClass: MockCheckoutPaymentTypeService,
          },
          {
            provide: CheckoutStepService,
            useClass: MockCheckoutStepService,
          },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      }).compileComponents();

      checkoutPaymentTypeFacade = TestBed.inject(
        CheckoutPaymentTypeFacade as Type<CheckoutPaymentTypeFacade>
      );
      checkoutStepService = TestBed.inject(
        CheckoutStepService as Type<CheckoutStepService>
      );
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get the loading state when selecting a payment type', (done) => {
    component.selectedPaymentTypeIsLoading$
      .pipe(take(1))
      .subscribe((loading) => {
        expect(loading).toBe(false);
        done();
      });
  });

  it('should get all supported payment types', (done) => {
    component.paymentTypes$.pipe(take(1)).subscribe((types) => {
      expect(types).toBe(mockPaymentTypes);
      done();
    });
  });

  it('should get selected payment type', (done) => {
    component.typeSelected$.pipe(take(1)).subscribe((selectedPaymentType) => {
      expect(selectedPaymentType).toEqual({ code: 'ACCOUNT' });
      expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.PAYMENT_DETAILS,
        true
      );
      done();
    });
  });

  it('should get po number from cart', (done) => {
    component.cartPoNumber$.pipe(take(1)).subscribe((cartPoNumber) => {
      expect(cartPoNumber).toBeTruthy();
      expect(cartPoNumber).toEqual('test-po');
      done();
    });
  });

  it('should set payment type when changeType is called', () => {
    component.changeType('ACCOUNT');
    expect(checkoutPaymentTypeFacade.setPaymentType).toHaveBeenCalledWith(
      'ACCOUNT'
    );
  });

  it('should set po number to cart if the cart po number does not match when calling next()', () => {
    component.typeSelected = 'test-code';
    component['_poNumberInput'].nativeElement.value = 'test-po';
    component.cartPoNumber = 'test-cart-po';

    component.next();

    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
    expect(checkoutPaymentTypeFacade.setPaymentType).toHaveBeenCalled();
  });

  it('should NOT set po number to cart if the cart po number does match when calling next()', () => {
    component.typeSelected = 'test-code';
    component['_poNumberInput'].nativeElement.value = 'test-po';
    component.cartPoNumber = component['_poNumberInput'].nativeElement.value;

    component.next();

    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
    expect(checkoutPaymentTypeFacade.setPaymentType).not.toHaveBeenCalled();
  });

  it('should go back to the previous checkout step', () => {
    component.back();

    expect(checkoutStepService.back).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });
});
