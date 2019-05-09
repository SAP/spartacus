import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  DeliveryMode,
  CheckoutService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';

import { of, Observable } from 'rxjs';

import createSpy = jasmine.createSpy;

import { DeliveryModeComponent } from './delivery-mode.component';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutConfigService } from '../../checkout-config.service';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockCheckoutService {
  loadSupportedDeliveryModes = createSpy();
  setDeliveryMode = createSpy();
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return of();
  }
  getSelectedDeliveryMode(): Observable<DeliveryMode> {
    return of();
  }
}

class MockRoutingService {
  go = createSpy();
}

class MockCheckoutConfigService {
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

const mockDeliveryMode1: DeliveryMode = {
  code: 'standard-gross',
  name: 'Standard Delivery',
  deliveryCost: { formattedValue: '$10.00' },
};

const mockDeliveryMode2: DeliveryMode = {
  code: 'premium-gross',
  name: 'Premium Delivery',
  deliveryCost: { formattedValue: '$20.00' },
};

const mockSupportedDeliveryModes: DeliveryMode[] = [
  mockDeliveryMode1,
  mockDeliveryMode2,
];

const mockStepUrl = 'test url';

describe('DeliveryModeComponent', () => {
  let component: DeliveryModeComponent;
  let fixture: ComponentFixture<DeliveryModeComponent>;
  let mockCheckoutService: MockCheckoutService;
  let mockRoutingService: MockRoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [DeliveryModeComponent, MockSpinnerComponent],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    mockCheckoutService = TestBed.get(CheckoutService);
    mockRoutingService = TestBed.get(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load supported delivery modes', () => {
    component.ngOnInit();

    expect(mockCheckoutService.loadSupportedDeliveryModes).toHaveBeenCalled();
  });

  it('should get supported delivery modes', () => {
    spyOn(mockCheckoutService, 'getSupportedDeliveryModes').and.returnValue(
      of(mockSupportedDeliveryModes)
    );
    component.ngOnInit();

    component.supportedDeliveryModes$.subscribe(modes => {
      expect(modes).toBe(mockSupportedDeliveryModes);
    });
  });

  it('should change step after invoking next()', () => {
    component.checkoutStepUrlNext = mockStepUrl;
    component.mode.controls['deliveryModeId'].setValue(mockDeliveryMode1.code);
    component.currentDeliveryModeId = mockDeliveryMode1.code;
    component.changedOption = true;

    component.next();

    expect(mockRoutingService.go).toHaveBeenCalledWith(mockStepUrl);
  });

  it('should change step after invoking back()', () => {
    component.checkoutStepUrlPrevious = mockStepUrl;
    component.back();

    expect(mockRoutingService.go).toHaveBeenCalledWith(mockStepUrl);
  });

  it('should get deliveryModeInvalid()', () => {
    const invalid = component.deliveryModeInvalid;

    expect(invalid).toBe(true);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-primary'));

    it('should be disabled when delivery mode is not selected', () => {
      component.mode.controls['deliveryModeId'].setValue(null);
      fixture.detectChanges();

      expect(getContinueBtn().nativeElement.disabled).toBe(true);
    });

    it('should be enabled when delivery mode is selected', () => {
      component.mode.controls['deliveryModeId'].setValue(
        mockDeliveryMode1.code
      );
      fixture.detectChanges();

      expect(getContinueBtn().nativeElement.disabled).toBe(false);
    });

    it('should call "next" function after being clicked', () => {
      spyOn(component, 'next');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();

      expect(component.next).toHaveBeenCalled();
    });
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
});
