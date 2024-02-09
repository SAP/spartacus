import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  ActiveCartFacade,
  Cart,
  DeliveryMode,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  QueryState,
} from '@spartacus/core';
import { OutletModule } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of, throwError } from 'rxjs';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutDeliveryModeComponent } from './checkout-delivery-mode.component';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

const supportedDeliveryModes$ = new BehaviorSubject<DeliveryMode[]>([]);
const selectedDeliveryModeState$ = new BehaviorSubject<
  QueryState<DeliveryMode | undefined>
>({
  loading: false,
  error: false,
  data: undefined,
});

class MockCheckoutDeliveryModeService
  implements Partial<CheckoutDeliveryModesFacade>
{
  loadSupportedDeliveryModes = createSpy();
  setDeliveryMode = createSpy().and.returnValue(EMPTY);
  getSupportedDeliveryModes = () => supportedDeliveryModes$.asObservable();
  getSelectedDeliveryModeState = () =>
    selectedDeliveryModeState$.asObservable();
  getLoadSupportedDeliveryModeProcess = createSpy().and.returnValue(EMPTY);
}

const preferredDeliveryMode$ = new BehaviorSubject<string | undefined>('');
class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  getPreferredDeliveryMode = () => preferredDeliveryMode$.value;
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next = createSpy();
  back = createSpy();
  getBackBntText = createSpy().and.returnValue('common.back');
}

const mockCart: Cart = {
  code: '123456789',
  description: 'testCartDescription',
  name: 'testCartName',
};

const cart$ = new BehaviorSubject<Cart>(mockCart);

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

const deliveryEntries$ = new BehaviorSubject<OrderEntry[]>([
  { orderCode: 'testEntry' },
]);
const hasPickupItems$ = new BehaviorSubject<boolean>(false);
class MockCartService implements Partial<ActiveCartFacade> {
  getDeliveryEntries = () => deliveryEntries$.asObservable();
  hasPickupItems = () => hasPickupItems$.asObservable();
  getPickupEntries = createSpy().and.returnValue(of([]));
  getActive = () => cart$.asObservable();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

describe('CheckoutDeliveryModeComponent', () => {
  let component: CheckoutDeliveryModeComponent;
  let fixture: ComponentFixture<CheckoutDeliveryModeComponent>;
  let checkoutConfigService: CheckoutConfigService;
  let checkoutStepService: CheckoutStepService;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule, OutletModule],
        declarations: [CheckoutDeliveryModeComponent, MockSpinnerComponent],
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
          { provide: ActiveCartFacade, useClass: MockCartService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      }).compileComponents();

      checkoutConfigService = TestBed.inject(CheckoutConfigService);
      checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
      globalMessageService = TestBed.inject(GlobalMessageService);
      checkoutStepService = TestBed.inject(
        CheckoutStepService as Type<CheckoutStepService>
      );
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDeliveryModeComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get supported delivery modes', () => {
    supportedDeliveryModes$.next(mockSupportedDeliveryModes);

    let modes;
    component.supportedDeliveryModes$.subscribe((value) => {
      modes = value;
    });
    expect(modes).toEqual(mockSupportedDeliveryModes);
  });

  it('should pre-select preferred delivery mode if not chosen before', () => {
    spyOn(checkoutConfigService, 'getPreferredDeliveryMode').and.callThrough();
    supportedDeliveryModes$.next(mockSupportedDeliveryModes);
    preferredDeliveryMode$.next(mockDeliveryMode1.code);

    fixture.detectChanges();
    expect(checkoutConfigService.getPreferredDeliveryMode).toHaveBeenCalledWith(
      mockSupportedDeliveryModes
    );
    expect(component.mode.controls['deliveryModeId'].value).toBe(
      mockDeliveryMode1.code
    );
  });

  it('should show error message if setDeliveryMode fail', () => {
    const showErrorMessageSpy = spyOn(
      globalMessageService,
      'add'
    ).and.callThrough();
    checkoutDeliveryModesFacade.setDeliveryMode = createSpy().and.returnValue(
      throwError('error')
    );

    component.changeMode('pickup');

    expect(showErrorMessageSpy).toHaveBeenCalledWith(
      {
        key: 'setDeliveryMode.unknownError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should remove pickup from supported delivery modes', () => {
    spyOn(checkoutConfigService, 'getPreferredDeliveryMode').and.callThrough();
    supportedDeliveryModes$.next([{ code: 'pickup' }]);
    preferredDeliveryMode$.next('pickup');

    let modes;
    component.supportedDeliveryModes$.subscribe((value) => {
      modes = value;
    });

    expect(modes).toEqual([]);
    expect(checkoutConfigService.getPreferredDeliveryMode).toHaveBeenCalledWith(
      [{ code: 'pickup' }]
    );
  });

  it('should select the delivery mode, which has been chosen before', () => {
    spyOn(checkoutConfigService, 'getPreferredDeliveryMode').and.callThrough();
    supportedDeliveryModes$.next(mockSupportedDeliveryModes);
    selectedDeliveryModeState$.next({
      loading: false,
      error: false,
      data: mockDeliveryMode2,
    });
    preferredDeliveryMode$.next(mockDeliveryMode1.code);

    fixture.detectChanges();
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
    fixture.detectChanges();

    const invalid = component.deliveryModeInvalid;
    expect(invalid).toBe(false);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-primary'));
    const setDeliveryModeId = (value: string | undefined) => {
      component.mode.controls['deliveryModeId'].setValue(value);
    };

    beforeEach(() => {
      supportedDeliveryModes$.next(mockSupportedDeliveryModes);
      selectedDeliveryModeState$.next({
        loading: false,
        error: false,
        data: mockDeliveryMode1,
      });
      component.isUpdating$ = of(false);
    });

    it('should be enabled when delivery mode is selected', () => {
      setDeliveryModeId(mockDeliveryMode1.code);

      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toBe(false);
    });

    it('should be disabled when setDeliveryMode failed', () => {
      checkoutDeliveryModesFacade.setDeliveryMode = createSpy().and.returnValue(
        throwError('error')
      );

      component.changeMode('pickup');

      fixture.detectChanges();

      expect(getContinueBtn().nativeElement.disabled).toBe(true);
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
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-secondary'));

    it('should call "back" function after being clicked', () => {
      supportedDeliveryModes$.next(mockSupportedDeliveryModes);
      selectedDeliveryModeState$.next({
        loading: false,
        error: false,
        data: mockDeliveryMode1,
      });
      component.isUpdating$ = of(false);

      spyOn(component, 'back');

      fixture.detectChanges();
      getBackBtn().nativeElement.click();

      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI shipping items section', () => {
    it('should not display shipping items section if there is no pickup items', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.textContent).not.toContain(
        'checkoutMode.deliveryEntries'
      );
    });

    it('should display shipping items section if there is pickup items', () => {
      hasPickupItems$.next(true);
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.textContent).toContain(
        'checkoutMode.deliveryEntries'
      );
    });
  });
});
