import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';
import { DeliveryModeComponent } from './delivery-mode.component';
import {
  ReactiveFormsModule,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';

import { CheckoutService } from '../../../services/checkout.service';
import { CartService } from '../../../../cart/services/cart.service';
import { CartDataService } from '../../../../cart/services/cart-data.service';

export class MockAbstractControl {
  hasError() {
    return true;
  }
  get invalid() {
    return true;
  }
}

export class MockFormGroup {
  get() {}
}

const mockSupportedModes = {
  deliveryModes: [
    {
      code: 'standard-gross',
      name: 'Standard Delivery'
    },
    {
      code: 'premium-gross',
      name: 'Premium Delivery'
    }
  ]
};
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

  let ac: AbstractControl;
  let mockCheckoutSelectors;

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
      providers: [
        CheckoutService,
        CartService,
        CartDataService,
        { provide: FormGroup, useClass: MockFormGroup },
        { provide: AbstractControl, useClass: MockAbstractControl }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryModeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);

    ac = TestBed.get(AbstractControl);

    cartData.cart = mockCart;

    mockCheckoutSelectors = {
      getSupportedDeliveryModes: new BehaviorSubject([])
    };
    const mockSelect = selector => {
      switch (selector) {
        case fromCheckout.getSupportedDeliveryModes:
          return () => mockCheckoutSelectors.getSupportedDeliveryModes;
      }
    };
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(ac, 'hasError').and.callThrough();
    spyOn(service, 'loadSupportedDeliveryModes').and.callThrough();

    spyOn(component.selectMode, 'emit').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
    spyOn(component.mode, 'get').and.returnValue(ac);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get suppored shipping methods if they do not exist', () => {
    mockCheckoutSelectors.getSupportedDeliveryModes.next({});
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(() => {
      expect(service.loadSupportedDeliveryModes).toHaveBeenCalled();
    });
  });

  it('should call ngOnInit to get supported shipping methods if they exist', () => {
    mockCheckoutSelectors.getSupportedDeliveryModes.next(mockSupportedModes);
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(data => {
      expect(data).toBe(mockSupportedModes);
    });
  });

  it('should call ngOnInit to set shipping method if user selected it before', () => {
    component.selectedShippingMethod = 'shipping method set in cart';
    mockCheckoutSelectors.getSupportedDeliveryModes.next(mockSupportedModes);
    component.ngOnInit();
    component.supportedDeliveryModes$.subscribe(() => {
      expect(component.mode.controls['deliveryModeId'].value).toEqual(
        'shipping method set in cart'
      );
    });
  });

  it('should stop supportedDeliveryModes subscription when leave this component even they do not exist', () => {
    component.leave = true;
    mockCheckoutSelectors.getSupportedDeliveryModes.next({});
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
});
