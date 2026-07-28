import { Component, DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  GlobalMessageService,
  MockTranslatePipe,
  QueryState,
  TranslatePipe,
} from '@spartacus/core';
import { SpinnerComponent } from '@spartacus/storefront';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CheckoutPaymentTypeComponent } from './checkout-payment-type.component';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockGlobalMessageService {
  add = vi.fn();
}
class MockCheckoutPaymentTypeService
  implements Partial<CheckoutPaymentTypeFacade>
{
  getPaymentTypes = vi.fn().mockReturnValue(of(mockPaymentTypes));
  setPaymentType = vi.fn().mockReturnValue(of('setPaymentType'));
  getSelectedPaymentTypeState = vi.fn().mockReturnValue(
    selectedPaymentType$.asObservable()
  );
  getPurchaseOrderNumberState = vi.fn().mockReturnValue(
    of({ loading: false, error: false, data: 'test-po' })
  );
}

class MockCheckoutOnePaymentTypeService
  implements Partial<CheckoutPaymentTypeFacade>
{
  getPaymentTypes = vi.fn().mockReturnValue(of(mockDisableOnePaymentTypes));
  setPaymentType = vi.fn().mockReturnValue(of(undefined));
  getSelectedPaymentTypeState = vi.fn().mockReturnValue(
    selectedPaymentType$.asObservable()
  );
  getPurchaseOrderNumberState = vi.fn().mockReturnValue(
    of({ loading: false, error: false, data: 'test-po' })
  );
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  disableEnableStep = vi.fn();
  resetSteps = vi.fn();
  goToStepWithIndex = vi.fn();
  next = vi.fn();
  back = vi.fn();
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive = vi.fn().mockReturnValue(
    of({ quotePurchaseOrderNumber: 'quote-po-number' })
  );
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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CheckoutPaymentTypeComponent],
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
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
      ],
    })
      .overrideComponent(CheckoutPaymentTypeComponent, {
        remove: { imports: [TranslatePipe, SpinnerComponent] },
        add: {
          imports: [MockTranslatePipe, MockSpinnerComponent],
        },
      })
      .compileComponents();

    checkoutStepService = TestBed.inject(
      CheckoutStepService as Type<CheckoutStepService>
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get payment type selected by default if one payment type is returned', async () => {
    const selectedPaymentType = await firstValueFrom(component.typeSelected$);
    expect(selectedPaymentType).toEqual({
      code: 'CARD',
      displayName: 'Card',
    });
    expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS,
      false
    );
  });
});

describe('CheckoutPaymentTypeComponent', () => {
  let component: CheckoutPaymentTypeComponent;
  let fixture: ComponentFixture<CheckoutPaymentTypeComponent>;

  let checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
  let checkoutStepService: CheckoutStepService;
  let activeCartFacade: ActiveCartFacade;
  let el: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CheckoutPaymentTypeComponent],
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
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
      ],
    })
      .overrideComponent(CheckoutPaymentTypeComponent, {
        remove: { imports: [TranslatePipe, SpinnerComponent] },
        add: { imports: [MockTranslatePipe, MockSpinnerComponent] },
      })
      .compileComponents();

    checkoutPaymentTypeFacade = TestBed.inject(
      CheckoutPaymentTypeFacade as Type<CheckoutPaymentTypeFacade>
    );
    checkoutStepService = TestBed.inject(
      CheckoutStepService as Type<CheckoutStepService>
    );
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentTypeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get all supported payment types', async () => {
    const types = await firstValueFrom(component.paymentTypes$);
    expect(types).toBe(mockPaymentTypes);
  });

  it('should get selected payment type', async () => {
    const selectedPaymentType = await firstValueFrom(component.typeSelected$);
    expect(selectedPaymentType).toEqual({ code: 'ACCOUNT' });
    expect(checkoutStepService.disableEnableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS,
      true
    );
  });

  it('should get po number from cart', async () => {
    const cartPoNumber = await firstValueFrom(component.cartPoNumber$);
    expect(cartPoNumber).toBeTruthy();
    expect(cartPoNumber).toEqual('test-po');
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

  it('should make the po number input read-only when the cart has a quote PO number', () => {
    component.isPONumberEditable$
      .pipe(
        tap((isEditable) => {
          expect(isEditable).toBeFalsy();
        })
      )
      .subscribe();
    expect(
      el.query(By.css('#poNumberInput')).nativeElement.disabled
    ).toBeTruthy();
  });

  describe('should make the po number input editable', () => {
    it('when the cart does not have quote PO number', () => {
      activeCartFacade.getActive = vi.fn().mockReturnValue(of({}));

      fixture = TestBed.createComponent(CheckoutPaymentTypeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();

      component.isPONumberEditable$.pipe(take(1)).subscribe((isEditable) => {
        expect(isEditable).toBeTruthy();
      });

      expect(
        el.query(By.css('#poNumberInput')).nativeElement.disabled
      ).toBeFalsy();
    });
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
