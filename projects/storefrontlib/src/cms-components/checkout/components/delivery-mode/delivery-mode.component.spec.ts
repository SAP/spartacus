import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutDeliveryService,
  DeliveryMode,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { DeliveryModeComponent } from './delivery-mode.component';
import createSpy = jasmine.createSpy;
import { LoaderState } from '../../../../../../core/src/state/utils/loader';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockCheckoutDeliveryService {
  loadSupportedDeliveryModes = createSpy();
  setDeliveryMode = createSpy();
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return of();
  }
  getSelectedDeliveryMode(): Observable<DeliveryMode> {
    return of();
  }
  getLoadSupportedDeliveryModeProcess(): Observable<LoaderState<void>> {
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
  getPreferredDeliveryMode(): string {
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
  let mockCheckoutDeliveryService: CheckoutDeliveryService;
  let mockRoutingService: RoutingService;
  let mockCheckoutConfigService: CheckoutConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [DeliveryModeComponent, MockSpinnerComponent],
      providers: [
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    mockCheckoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
    mockRoutingService = TestBed.inject(RoutingService);
    mockCheckoutConfigService = TestBed.inject(CheckoutConfigService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get supported delivery modes', () => {
    spyOn(
      mockCheckoutDeliveryService,
      'getSupportedDeliveryModes'
    ).and.returnValue(of(mockSupportedDeliveryModes));
    component.ngOnInit();

    component.supportedDeliveryModes$.subscribe((modes) => {
      expect(modes).toBe(mockSupportedDeliveryModes);
    });
  });

  it('should pre-select preferred delivery mode if not chosen before', () => {
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

  it('should set delivery mode after invoking next()', () => {
    component.currentDeliveryModeId = mockDeliveryMode1.code;
    spyOn(mockCheckoutConfigService, 'getNextCheckoutStepUrl').and.returnValue(
      mockStepUrl
    );
    spyOn(
      mockCheckoutDeliveryService,
      'getSelectedDeliveryMode'
    ).and.returnValue(of(mockDeliveryMode1));

    component.ngOnInit();
    component.mode.controls['deliveryModeId'].setValue('code');
    component.next();
    expect(mockCheckoutDeliveryService.setDeliveryMode).toHaveBeenCalled();
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

  it('should reload delivery modes on error', () => {
    spyOn(
      mockCheckoutDeliveryService,
      'getLoadSupportedDeliveryModeProcess'
    ).and.returnValue(of({ loading: false, success: false, error: true }));

    component.ngOnInit();

    expect(
      mockCheckoutDeliveryService.loadSupportedDeliveryModes
    ).toHaveBeenCalledTimes(1);
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
