import { Component, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutPaymentService,
  I18nTestingModule,
  RoutingService,
  PaymentType,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { PaymentTypeComponent } from './payment-type.component';
import { CheckoutStepType } from '../../model/checkout-step.model';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockCheckoutPaymentService {
  setPaymentType = createSpy();
  getPaymentTypes(): Observable<PaymentType[]> {
    return of();
  }
}

class MockRoutingService {
  go = createSpy();
}

class MockCheckoutConfigService {
  resetSteps = createSpy();
  disableStep = createSpy();
  enableStep = createSpy();
  getNextCheckoutStepUrl(): string {
    return '';
  }
  getPreviousCheckoutStepUrl(): string {
    return '';
  }
}

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'delivery-mode'],
  },
};

const mockPaymentTypes: PaymentType[] = [
  { code: 'card', displayName: 'card' },
  { code: 'account', displayName: 'account' },
];

describe('PaymentTypeComponent', () => {
  let component: PaymentTypeComponent;
  let fixture: ComponentFixture<PaymentTypeComponent>;

  let mockRoutingService: MockRoutingService;
  let mockCheckoutPaymentService: MockCheckoutPaymentService;
  let mockCheckoutConfigService: MockCheckoutConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [PaymentTypeComponent, MockSpinnerComponent],
      providers: [
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    mockCheckoutPaymentService = TestBed.get(CheckoutPaymentService as Type<
      CheckoutPaymentService
    >);
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
    mockCheckoutConfigService = TestBed.get(CheckoutConfigService as Type<
      CheckoutConfigService
    >);

    spyOn(mockCheckoutPaymentService, 'getPaymentTypes').and.returnValue(
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

  it('should reset checkut steps', () => {
    expect(mockCheckoutConfigService.resetSteps).toHaveBeenCalled();
  });

  it('should change step after invoking next()', () => {
    component.checkoutStepUrlNext = 'next step';
    component.poNumberInput = {
      nativeElement: {
        value: 'p.o. number',
      },
    };
    component.next();
    expect(mockRoutingService.go).toHaveBeenCalledWith('next step');
  });

  it('should set the selected payment type to cart after invoking next()', () => {
    component.typeSelected = mockPaymentTypes[0].code;
    component.checkoutStepUrlNext = 'next step';
    component.poNumberInput = {
      nativeElement: {
        value: 'p.o. number',
      },
    };
    spyOn(mockCheckoutConfigService, 'getNextCheckoutStepUrl').and.returnValue(
      'next step'
    );
    component.next();
    expect(mockCheckoutPaymentService.setPaymentType).toHaveBeenCalledWith(
      component.typeSelected,
      'p.o. number'
    );
  });

  it('should change step after invoking back()', () => {
    component.checkoutStepUrlPrevious = 'previous url';
    component.back();

    expect(mockRoutingService.go).toHaveBeenCalledWith('previous url');
  });

  it('should disable PAYMENT_DETAILS step when choosing type Account', () => {
    component.changeType('ACCOUNT');
    expect(mockCheckoutConfigService.disableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS
    );

    component.changeType('CARD');
    expect(mockCheckoutConfigService.enableStep).toHaveBeenCalledWith(
      CheckoutStepType.PAYMENT_DETAILS
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

  /*it('should pre-select preferred delivery mode if not chosen before', () => {
    spyOn(
      mockCheckoutDeliveryService,
      'getSupportedDeliveryModes'
    ).and.returnValue(of(mockSupportedDeliveryModes));
    spyOn(
      mockCheckoutDeliveryService,
      'getSelectedDeliveryMode'
    ).and.returnValue(of(null));
    spyOn(
      mockCheckoutConfigService,
      'getPreferredDeliveryMode'
    ).and.returnValue(mockDeliveryMode1.code);

    component.ngOnInit();

    expect(
      mockCheckoutConfigService.getPreferredDeliveryMode
    ).toHaveBeenCalledWith(mockSupportedDeliveryModes);
    expect(component.currentDeliveryModeId).toBe(mockDeliveryMode1.code);
  });

  it('should select the delivery mode, which has been chosen before', () => {
    spyOn(
      mockCheckoutDeliveryService,
      'getSupportedDeliveryModes'
    ).and.returnValue(of(mockSupportedDeliveryModes));
    spyOn(
      mockCheckoutDeliveryService,
      'getSelectedDeliveryMode'
    ).and.returnValue(of(mockDeliveryMode2));
    spyOn(
      mockCheckoutConfigService,
      'getPreferredDeliveryMode'
    ).and.returnValue(mockDeliveryMode1.code);

    component.ngOnInit();

    expect(
      mockCheckoutConfigService.getPreferredDeliveryMode
    ).not.toHaveBeenCalled();
    expect(component.currentDeliveryModeId).toBe(mockDeliveryMode2.code);
  });

  ;*/
});
