import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { DeliveryMode, I18nTestingModule, QueryState } from '@spartacus/core';
import { LoaderState } from 'projects/core/src/state/utils/loader';
import { Observable, of } from 'rxjs';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { DeliveryModeComponent } from './delivery-mode.component';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockCheckoutDeliveryModeService
  implements Partial<CheckoutDeliveryModesFacade>
{
  loadSupportedDeliveryModes = createSpy();
  setDeliveryMode = createSpy();
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return of();
  }
  getSelectedDeliveryModeState(): Observable<QueryState<DeliveryMode>> {
    return of();
  }
  getLoadSupportedDeliveryModeProcess(): Observable<LoaderState<void>> {
    return of();
  }
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  getPreferredDeliveryMode(): string {
    return '';
  }
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next = createSpy();
  back = createSpy();
  getBackBntText(): string {
    return 'common.back';
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

describe('DeliveryModeComponent', () => {
  let component: DeliveryModeComponent;
  let fixture: ComponentFixture<DeliveryModeComponent>;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
  let checkoutConfigService: CheckoutConfigService;
  let checkoutStepService: CheckoutStepService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule],
        declarations: [DeliveryModeComponent, MockSpinnerComponent],
        providers: [
          {
            provide: CheckoutDeliveryModesFacade,
            useClass: MockCheckoutDeliveryModeService,
          },
          { provide: CheckoutStepService, useClass: MockCheckoutStepService },
          {
            provide: CheckoutConfigService,
            useClass: MockCheckoutConfigService,
          },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      }).compileComponents();

      checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
      checkoutConfigService = TestBed.inject(CheckoutConfigService);
      checkoutStepService = TestBed.inject(
        CheckoutStepService as Type<CheckoutStepService>
      );
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get supported delivery modes', () => {
    spyOn(
      checkoutDeliveryModesFacade,
      'getSupportedDeliveryModes'
    ).and.returnValue(of(mockSupportedDeliveryModes));
    component.ngOnInit();

    component.supportedDeliveryModes$.subscribe((modes) => {
      expect(modes).toBe(mockSupportedDeliveryModes);
    });
  });

  it('should pre-select preferred delivery mode if not chosen before', () => {
    spyOn(
      checkoutDeliveryModesFacade,
      'getSupportedDeliveryModes'
    ).and.returnValue(of(mockSupportedDeliveryModes));
    spyOn(
      checkoutDeliveryModesFacade,
      'getSelectedDeliveryModeState'
    ).and.returnValue(of({ loading: false, error: false, data: undefined }));
    spyOn(checkoutConfigService, 'getPreferredDeliveryMode').and.returnValue(
      mockDeliveryMode1.code
    );

    component.ngOnInit();

    expect(checkoutConfigService.getPreferredDeliveryMode).toHaveBeenCalledWith(
      mockSupportedDeliveryModes
    );
    expect(component.mode.controls['deliveryModeId'].value).toBe(
      mockDeliveryMode1.code
    );
  });

  it('should select the delivery mode, which has been chosen before', () => {
    spyOn(
      checkoutDeliveryModesFacade,
      'getSupportedDeliveryModes'
    ).and.returnValue(of(mockSupportedDeliveryModes));
    spyOn(
      checkoutDeliveryModesFacade,
      'getSelectedDeliveryModeState'
    ).and.returnValue(
      of({ loading: false, error: false, data: mockDeliveryMode2 })
    );
    spyOn(checkoutConfigService, 'getPreferredDeliveryMode').and.returnValue(
      mockDeliveryMode1.code
    );

    component.ngOnInit();

    expect(
      checkoutConfigService.getPreferredDeliveryMode
    ).not.toHaveBeenCalled();
    expect(component.mode.controls['deliveryModeId'].value).toBe(
      mockDeliveryMode2.code
    );
  });

  it('should change step after invoking back()', () => {
    component.back();
    expect(checkoutStepService.back).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  it('should get deliveryModeInvalid()', () => {
    const invalid = component.deliveryModeInvalid;

    expect(invalid).toBe(true);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-primary'));
    const setDeliveryModeId = (value: string | undefined) => {
      component.mode.controls['deliveryModeId'].setValue(value);
    };

    it('should be disabled when delivery mode is not selected', () => {
      setDeliveryModeId(undefined);
      fixture.detectChanges();

      expect(getContinueBtn().nativeElement.disabled).toBe(true);
    });

    it('should be enabled when delivery mode is selected', () => {
      setDeliveryModeId(mockDeliveryMode1.code);
      fixture.detectChanges();

      expect(getContinueBtn().nativeElement.disabled).toBe(false);
    });

    it('should call "next" function after being clicked', () => {
      spyOn(component, 'next');

      setDeliveryModeId(mockDeliveryMode1.code);
      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();

      expect(component.next).toHaveBeenCalled();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-action'));

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');

      fixture.detectChanges();
      getBackBtn().nativeElement.click();

      expect(component.back).toHaveBeenCalled();
    });
  });
});
