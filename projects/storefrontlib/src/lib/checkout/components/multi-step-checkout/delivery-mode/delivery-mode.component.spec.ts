import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  DeliveryMode,
  CheckoutService,
  I18nTestingModule,
} from '@spartacus/core';

import { of, Observable } from 'rxjs';

import createSpy = jasmine.createSpy;

import { DeliveryModeComponent } from './delivery-mode.component';
import { Component } from '@angular/core';

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

describe('DeliveryModeComponent', () => {
  let component: DeliveryModeComponent;
  let fixture: ComponentFixture<DeliveryModeComponent>;
  let mockCheckoutService: MockCheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [DeliveryModeComponent, MockSpinnerComponent],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();

    mockCheckoutService = TestBed.get(CheckoutService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeComponent);
    component = fixture.componentInstance;

    spyOn(component.goToStep, 'emit').and.callThrough();
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
    component.mode.controls['deliveryModeId'].setValue(mockDeliveryMode1.code);
    component.currentDeliveryModeId = mockDeliveryMode1.code;
    component.changedOption = true;

    component.next();

    mockCheckoutService.getSelectedDeliveryMode().subscribe(() => {
      expect(component.goToStep.emit).toHaveBeenCalled();
    });
  });

  it('should change step after invoking back()', () => {
    component.back();
    expect(component.goToStep.emit).toHaveBeenCalled();
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
