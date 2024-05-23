import { Component, DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  GlobalMessageService,
  I18nTestingModule,
  QueryState,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutPaymentTypeComponent } from './checkout-payment-type.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockGlobalMessageService {
  add = createSpy();
}
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

class MockCheckoutOnePaymentTypeService
  implements Partial<CheckoutPaymentTypeFacade>
{
  getPaymentTypes = createSpy().and.returnValue(of(mockDisableOnePaymentTypes));
  setPaymentType = createSpy().and.returnValue(of(undefined));
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
  { code: 'CARD', displayName: 'Card' },
  { code: 'ACCOUNT', displayName: 'Account' },
];
const mockDisableOnePaymentTypes: PaymentType[] = [
  { code: 'CARD', displayName: 'Card' },
];

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-type'],
  },
};

describe('CheckoutOnePaymentTypeComponent', () => {
  let component: CheckoutPaymentTypeComponent;
  let fixture: ComponentFixture<CheckoutPaymentTypeComponent>;

  let checkoutStepService: CheckoutStepService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [CheckoutPaymentTypeComponent, MockSpinnerComponent],
        providers: [
          {
            provide: CheckoutPaymentTypeFacade,
            useClass: MockCheckoutOnePaymentTypeService,
          },
          {
            provide: CheckoutStepService,
            useClass: MockCheckoutStepService,
          },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
        ],
      }).compileComponents();

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

  it('should get payment type selected by default if one payment type is returned', (done) => {
    component.typeSelected$.pipe(take(1)).subscribe((selectedPaymentType) => {
      expect(selectedPaymentType).toEqual({
        code: 'CARD',
        displayName: 'Card',
      });
      expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
        CheckoutStepType.PAYMENT_DETAILS,
        false
      );
      done();
    });
  });
});

describe('CheckoutPaymentTypeComponent', () => {
  let component: CheckoutPaymentTypeComponent;
  let fixture: ComponentFixture<CheckoutPaymentTypeComponent>;

  let checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
  let checkoutStepService: CheckoutStepService;
  let el: DebugElement;

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
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
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
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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
      'ACCOUNT',
      'test-po'
    );
  });

  it('should set po number to cart if the cart po number does not match when calling next()', () => {
    component.typeSelected = 'test-code';
    component['poNumberInputElement'].nativeElement.value = 'test-po';
    component.cartPoNumber$ = of('test-cart-po');

    component.next();

    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
    expect(checkoutPaymentTypeFacade.setPaymentType).toHaveBeenCalled();
  });

  it('should NOT set po number to cart if the cart po number does match when calling next()', () => {
    component.typeSelected = 'test-code';
    const mockPoNumber = 'test-po';
    component['poNumberInputElement'].nativeElement.value = mockPoNumber;
    component.cartPoNumber$ = of(mockPoNumber);

    fixture.detectChanges();

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

  describe('UI spinner when changing payment type', () => {
    it('should display spinner when user selects a new payment and response did not complete', () => {
      component.isUpdating$ = of(true);

      component.changeType('ACCOUNT');
      fixture.detectChanges();

      expect(el.query(By.css('div.cx-spinner'))).toBeTruthy();
    });

    it('should NOT display spinner when the payment type is NOT loading', () => {
      component.isUpdating$ = of(false);

      fixture.detectChanges();

      expect(el.query(By.css('div.cx-spinner'))).toBeFalsy();
    });

    it('should enable continue button when the payment is selected', () => {
      component.isUpdating$ = of(false);

      fixture.detectChanges();

      expect(
        el.query(By.css('.cx-checkout-btns .btn-primary')).nativeElement
          .disabled
      ).toBe(false);
    });
  });
});
