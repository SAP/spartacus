import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';
import { DeliveryModeComponent } from './delivery-mode.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';

import { CheckoutService } from '../../../services/checkout.service';
import { CartService } from '../../../../cart/services/cart.service';
import { CartDataService } from '../../../../cart/services/cart-data.service';
import { By } from '@angular/platform-browser';

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

const mockCart = {
  guid: 'test',
  code: 'test'
};

describe('DeliveryModeComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: DeliveryModeComponent;
  let fixture: ComponentFixture<DeliveryModeComponent>;
  let service: CheckoutService;
  let cartData: CartDataService;
  let mockCheckoutSelectors: {
    getSupportedDeliveryModes: BehaviorSubject<any[]>;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          checkout: combineReducers(fromCheckout.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      declarations: [DeliveryModeComponent],
      providers: [CheckoutService, CartService, CartDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);
    cartData.cart = mockCart;

    mockCheckoutSelectors = {
      getSupportedDeliveryModes: new BehaviorSubject([])
    };
    spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
      switch (selector) {
        case fromCheckout.getSupportedDeliveryModes:
          return () => mockCheckoutSelectors.getSupportedDeliveryModes;
      }
    });

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(service, 'loadSupportedDeliveryModes');

    spyOn(component.selectMode, 'emit').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get supported shipping modes if they do not exist', () => {
    mockCheckoutSelectors.getSupportedDeliveryModes.next([]);
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(() => {
      expect(service.loadSupportedDeliveryModes).toHaveBeenCalled();
    });
  });

  it('should call ngOnInit to get supported shipping modes if they exist', () => {
    mockCheckoutSelectors.getSupportedDeliveryModes.next(
      mockSupportedDeliveryModes
    );
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(data => {
      expect(data).toBe(mockSupportedDeliveryModes);
    });
  });

  it('should call ngOnInit to set shipping mode if user selected it before', () => {
    const mockSelectedShippingMethod = 'shipping method set in cart';
    component.selectedShippingMethod = mockSelectedShippingMethod;
    mockCheckoutSelectors.getSupportedDeliveryModes.next(
      mockSupportedDeliveryModes
    );
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(() => {
      expect(component.mode.controls['deliveryModeId'].value).toEqual(
        mockSelectedShippingMethod
      );
    });
  });

  it('should stop supportedDeliveryModes subscription when leave this component even they do not exist', () => {
    component.leave = true;
    mockCheckoutSelectors.getSupportedDeliveryModes.next([]);
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(() => {
      expect(service.loadSupportedDeliveryModes).not.toHaveBeenCalled();
    });
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
        By.css('.y-delivery-mode-form__btns .btn-primary')
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
        By.css('.y-delivery-mode-form__btns .btn-action')
      );

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();
      expect(component.back).toHaveBeenCalled();
    });
  });
});
