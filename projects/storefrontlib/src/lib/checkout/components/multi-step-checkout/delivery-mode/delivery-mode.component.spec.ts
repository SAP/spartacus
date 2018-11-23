import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

import { DeliveryModeComponent } from './delivery-mode.component';
import { CheckoutService } from '../../../facade/checkout.service';

const mockDeliveryMode1 = {
  code: 'standard-gross',
  name: 'Standard Delivery',
  deliveryCost: { formattedValue: '$10.00' }
};
const mockDeliveryMode2 = {
  code: 'premium-gross',
  name: 'Premium Delivery',
  deliveryCost: { formattedValue: '$20.00' }
};
const mockSupportedDeliveryModes = [mockDeliveryMode1, mockDeliveryMode2];

describe('DeliveryModeComponent', () => {
  let component: DeliveryModeComponent;
  let fixture: ComponentFixture<DeliveryModeComponent>;
  let mockCheckoutService: any;

  beforeEach(async(() => {
    mockCheckoutService = {
      supportedDeliveryModes$: new BehaviorSubject([]),
      loadSupportedDeliveryModes: createSpy()
    };
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DeliveryModeComponent],
      providers: [{ provide: CheckoutService, useValue: mockCheckoutService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeComponent);
    component = fixture.componentInstance;

    spyOn(component.selectMode, 'emit').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get supported shipping modes if they do not exist', done => {
    mockCheckoutService.supportedDeliveryModes$.next([]);
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(() => {
      expect(mockCheckoutService.loadSupportedDeliveryModes).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get supported shipping modes if they exist', () => {
    mockCheckoutService.supportedDeliveryModes$.next(
      mockSupportedDeliveryModes
    );
    component.ngOnInit();
    let deliveryModes;
    component.supportedDeliveryModes$.subscribe(data => {
      deliveryModes = data;
    });
    expect(deliveryModes).toBe(mockSupportedDeliveryModes);
  });

  it('should call ngOnInit to set shipping mode if user selected it before', done => {
    const mockSelectedShippingMethod = 'shipping method set in cart';
    component.selectedShippingMethod = mockSelectedShippingMethod;
    mockCheckoutService.supportedDeliveryModes$.next(
      mockSupportedDeliveryModes
    );
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(() => {
      expect(component.mode.controls['deliveryModeId'].value).toEqual(
        mockSelectedShippingMethod
      );
      done();
    });
  });

  it('should stop supportedDeliveryModes subscription when leave this component even they do not exist', () => {
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe();
    component.leave = true;
    // subscription is end
    mockCheckoutService.supportedDeliveryModes$.next([]);
    expect(mockCheckoutService.loadSupportedDeliveryModes.calls.count()).toBe(
      1
    );
  });

  it('should call next()', () => {
    component.next();
    expect(component.selectMode.emit).toHaveBeenCalledWith(
      component.mode.value
    );
  });

  it('should call back()', () => {
    component.back();
    expect(component.backStep.emit).toHaveBeenCalled();
    expect(component.leave).toBe(true);
  });

  it('should get deliveryModeInvalid()', () => {
    const invalid = component.deliveryModeInvalid;
    expect(invalid).toBe(true);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(
        By.css('.cx-delivery-mode-form__btns .btn-primary')
      );

    it('should be disabled when delivery mode is not selected', () => {
      component.mode.controls['deliveryModeId'].setValue(null);
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toBe(true);
    });

    it('should be enabled when delivery mode is selected', () => {
      component.mode.controls['deliveryModeId'].setValue('test delivery mode');
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
      fixture.debugElement.query(
        By.css('.cx-delivery-mode-form__btns .btn-action')
      );

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();
      expect(component.back).toHaveBeenCalled();
    });
  });
});
