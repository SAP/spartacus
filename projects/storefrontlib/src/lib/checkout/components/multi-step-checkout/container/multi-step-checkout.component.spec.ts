import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import * as NgrxStore from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import * as fromCart from '../../../../cart/store';
import * as fromRoot from '../../../../routing/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';
import { Address } from '../../../models/address-model';
import * as fromCheckout from '../../../store';
import { CartSharedModule } from '../../../../cart/components/cart-shared/cart-shared.module';
import { CartDataService } from './../../../../cart/services/cart-data.service';
import { CartService } from './../../../../cart/services/cart.service';
import { CheckoutService } from './../../../services/checkout.service';
import { MultiStepCheckoutComponent } from './multi-step-checkout.component';
import { Component, Input } from '@angular/core';

const mockAddress: Address = {
  id: 'mock address id',
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' }
};
const mockPaymentDetails = {
  id: 'mock payment id',
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: 'Visa',
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123'
};
const mockDeliveryAddresses = ['address1', 'address2'];
const mockSelectedCode = 'test mode';
const mockOrderDetails = { id: '1234' };

@Component({ selector: 'y-delivery-mode', template: '' })
class MockDeliveryModeComponent {
  @Input()
  selectedShippingMethod;
}

@Component({ selector: 'y-payment-method', template: '' })
class MockPaymentMethodComponent {
  @Input()
  selectedPayment;
}

@Component({ selector: 'y-review-submit', template: '' })
class MockReviewSubmitComponent {
  @Input()
  deliveryAddress;
  @Input()
  shippingMethod;
  @Input()
  paymentDetails;
}

@Component({ selector: 'y-shipping-address', template: '' })
class MockShippingAddressComponent {
  @Input()
  selectedAddress;
}

describe('MultiStepCheckoutComponent', () => {
  let store: Store<fromRoot.State>;
  let component: MultiStepCheckoutComponent;
  let fixture: ComponentFixture<MultiStepCheckoutComponent>;
  let service: CheckoutService;
  let cartService: CartService;
  let mockSelectors: {
    checkout: {
      getDeliveryAddress: BehaviorSubject<any[]>;
      getSelectedCode: BehaviorSubject<string>;
      getPaymentDetails: BehaviorSubject<any>;
      getOrderDetails: BehaviorSubject<any>;
    };
    cart: {
      getActiveCart: BehaviorSubject<any>;
    };
  };
  const getPlaceOrderForm = () =>
    fixture.debugElement.query(
      By.css('.y-multi-step-checkout__place-order-form')
    );
  const getPlaceOrderBtn = () =>
    fixture.debugElement.query(
      By.css('.y-multi-step-checkout__place-order .btn-primary')
    ).nativeElement;
  const getBackBtn = () =>
    fixture.debugElement.query(
      By.css('.y-multi-step-checkout__place-order .btn-action')
    ).nativeElement;
  const mockAllSteps = () => {
    mockSelectors.checkout.getDeliveryAddress.next(mockDeliveryAddresses);
    mockSelectors.checkout.getSelectedCode.next(mockSelectedCode);
    mockSelectors.checkout.getPaymentDetails.next(mockPaymentDetails);
    mockSelectors.checkout.getOrderDetails.next(mockOrderDetails);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        CartSharedModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          checkout: combineReducers(fromCheckout.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      declarations: [
        MultiStepCheckoutComponent,
        MockDeliveryModeComponent,
        MockPaymentMethodComponent,
        MockReviewSubmitComponent,
        MockShippingAddressComponent
      ],
      providers: [CheckoutService, CartService, CartDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStepCheckoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);
    cartService = TestBed.get(CartService);

    mockSelectors = {
      checkout: {
        getDeliveryAddress: new BehaviorSubject([]),
        getSelectedCode: new BehaviorSubject(''),
        getPaymentDetails: new BehaviorSubject({}),
        getOrderDetails: new BehaviorSubject({})
      },
      cart: {
        getActiveCart: new BehaviorSubject({})
      }
    };
    spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
      switch (selector) {
        case fromCheckout.getDeliveryAddress:
          return () => mockSelectors.checkout.getDeliveryAddress;
        case fromCheckout.getSelectedCode:
          return () => mockSelectors.checkout.getSelectedCode;
        case fromCheckout.getPaymentDetails:
          return () => mockSelectors.checkout.getPaymentDetails;
        case fromCheckout.getOrderDetails:
          return () => mockSelectors.checkout.getOrderDetails;
        case fromCart.getActiveCart:
          return () => mockSelectors.cart.getActiveCart;
      }
    });

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'addAddress').and.callThrough();
    spyOn(component, 'nextStep').and.callThrough();
    spyOn(service, 'createAndSetAddress').and.callThrough();
    spyOn(service, 'setDeliveryAddress').and.callThrough();
    spyOn(service, 'setDeliveryMode').and.callThrough();
    spyOn(service, 'createPaymentDetails').and.callThrough();
    spyOn(service, 'setPaymentDetails').and.callThrough();
    spyOn(service, 'placeOrder').and.callThrough();
    spyOn(cartService, 'loadCartDetails').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() before process steps', () => {
    const mockCartData = {};
    mockSelectors.cart.getActiveCart.next(mockCartData);
    component.ngOnInit();
    expect(component.step).toEqual(1);
    expect(cartService.loadCartDetails).toHaveBeenCalled();
  });

  it('should call processSteps() to process step 1: set delivery address', () => {
    mockSelectors.checkout.getDeliveryAddress.next(mockDeliveryAddresses);
    mockSelectors.checkout.getSelectedCode.next('');
    mockSelectors.checkout.getPaymentDetails.next({});
    mockSelectors.checkout.getOrderDetails.next({});

    component.processSteps();
    expect(component.nextStep).toHaveBeenCalledWith(2);
  });

  it('should call processSteps() to process step 2: select delivery mode', () => {
    mockSelectors.checkout.getDeliveryAddress.next(mockDeliveryAddresses);
    mockSelectors.checkout.getSelectedCode.next(mockSelectedCode);
    mockSelectors.checkout.getPaymentDetails.next({});
    mockSelectors.checkout.getOrderDetails.next({});

    component.processSteps();
    expect(component.nextStep).toHaveBeenCalledWith(3);
  });

  it('should call processSteps() to process step 3: set payment info', () => {
    mockSelectors.checkout.getDeliveryAddress.next(mockDeliveryAddresses);
    mockSelectors.checkout.getSelectedCode.next(mockSelectedCode);
    mockSelectors.checkout.getPaymentDetails.next(mockPaymentDetails);
    mockSelectors.checkout.getOrderDetails.next({});

    component.processSteps();
    expect(component.nextStep).toHaveBeenCalledWith(4);
  });

  it('should call processSteps() to process step 4: place order', () => {
    mockSelectors.checkout.getDeliveryAddress.next(mockDeliveryAddresses);
    mockSelectors.checkout.getSelectedCode.next(mockSelectedCode);
    mockSelectors.checkout.getPaymentDetails.next(mockPaymentDetails);
    mockSelectors.checkout.getOrderDetails.next(mockOrderDetails);

    component.processSteps();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRoot.Go({
        path: ['orderConfirmation']
      })
    );
  });

  it('should call setStep()', () => {
    component.setStep(2);
    expect(component.nextStep).toHaveBeenCalledWith(2);
  });

  it('should call nextStep()', () => {
    // next step is 3
    component.nextStep(3);
    // previous 2 steps are complete
    expect(component.navs[0].status.completed).toBeTruthy();
    expect(component.navs[1].status.completed).toBeTruthy();
    // step3 is active, and enabled, progress bar is on
    expect(component.navs[2].status.active).toBeTruthy();
    expect(component.navs[2].status.disabled).toBeFalsy();
    expect(component.navs[2].progressBar).toBeTruthy();
    // except step3, other steps are not active
    // step1, progress bar is on
    expect(component.navs[0].status.active).toBeFalsy();
    expect(component.navs[0].progressBar).toBeTruthy();
    // step2, progress bar is on
    expect(component.navs[1].status.active).toBeFalsy();
    expect(component.navs[1].progressBar).toBeTruthy();
    // step4, progress bar is off
    expect(component.navs[3].status.active).toBeFalsy();
    expect(component.navs[3].progressBar).toBeFalsy();
  });

  it('should call addAddress() with new created address', () => {
    component.addAddress({ address: mockAddress, newAddress: true });
    expect(service.createAndSetAddress).toHaveBeenCalledWith(mockAddress);
  });

  it('should call addAddress() with address selected from existing addresses', () => {
    component.addAddress({ address: mockAddress, newAddress: false });
    expect(service.createAndSetAddress).not.toHaveBeenCalledWith(mockAddress);
    expect(service.setDeliveryAddress).toHaveBeenCalledWith(mockAddress);
  });

  it('should call addAddress() with address already set to the cart, then go to next step direclty', () => {
    component.deliveryAddress = mockAddress;
    component.addAddress({ address: mockAddress, newAddress: false });

    expect(component.nextStep).toHaveBeenCalledWith(2);
    expect(service.setDeliveryAddress).not.toHaveBeenCalledWith(mockAddress);
  });

  it('should call setDeliveryMode()', () => {
    const deliveryMode: any = {
      deliveryModeId: 'testId'
    };
    component.setDeliveryMode(deliveryMode);
    expect(service.setDeliveryMode).toHaveBeenCalledWith(
      deliveryMode.deliveryModeId
    );
  });

  it('should call setDeliveryMode() with the delivery mode already set to cart, go to next step directly', () => {
    const deliveryMode: any = {
      deliveryModeId: 'testId'
    };
    component.shippingMethod = 'testId';
    component.setDeliveryMode(deliveryMode);

    expect(component.nextStep).toHaveBeenCalledWith(3);
    expect(service.setDeliveryMode).not.toHaveBeenCalledWith(
      deliveryMode.deliveryModeId
    );
  });

  it('should call addPaymentInfo() with new created payment info', () => {
    component.deliveryAddress = mockAddress;
    component.addPaymentInfo({ payment: mockPaymentDetails, newPayment: true });
    expect(service.createPaymentDetails).toHaveBeenCalledWith(
      mockPaymentDetails
    );
  });

  it('should call addPaymentInfo() with paymenent selected from existing ones', () => {
    component.deliveryAddress = mockAddress;
    component.addPaymentInfo({
      payment: mockPaymentDetails,
      newPayment: false
    });
    expect(service.createPaymentDetails).not.toHaveBeenCalledWith(
      mockPaymentDetails
    );
    expect(service.setPaymentDetails).toHaveBeenCalledWith(mockPaymentDetails);
  });

  it('should call addPaymentInfo() with paymenent already set to cart, then go to next step direclty', () => {
    component.paymentDetails = mockPaymentDetails;
    component.deliveryAddress = mockAddress;
    component.addPaymentInfo({
      payment: mockPaymentDetails,
      newPayment: false
    });
    expect(component.nextStep).toHaveBeenCalledWith(4);
    expect(service.setPaymentDetails).not.toHaveBeenCalledWith(
      mockPaymentDetails
    );
  });

  it('should call placeOrder()', () => {
    component.placeOrder();
    expect(service.placeOrder).toHaveBeenCalled();
  });

  it('should call toggleTAndC(toggle)', () => {
    expect(component.tAndCToggler).toBeFalsy();
    component.toggleTAndC();
    expect(component.tAndCToggler).toBeTruthy();
    component.toggleTAndC();
    expect(component.tAndCToggler).toBeFalsy();
  });

  it('should contain proper total value and total items', () => {
    const mockCartData = {
      totalItems: 5141,
      subTotal: { formattedValue: 11119 }
    };

    mockSelectors.cart.getActiveCart.next(mockCartData);
    fixture.detectChanges();

    const pageTitle = fixture.debugElement.query(By.css('.y-page__title'))
      .nativeElement.textContent;
    const values = fixture.debugElement.query(
      By.css('.y-multi-step-checkout__nav-list--media')
    ).nativeElement.textContent;

    expect(pageTitle).toContain('5141');
    expect(values).toContain('5141');
    expect(values).toContain('11119');
  });

  it('should highlight proper step', () => {
    mockSelectors.cart.getActiveCart.next({});

    fixture.detectChanges();

    const steps = fixture.debugElement.queryAll(
      By.css('.y-multi-step-checkout__nav-item a')
    );

    steps[0].nativeElement.click();
    fixture.detectChanges();

    expect(steps[0].nativeElement.getAttribute('class')).toContain('is-active');
    expect(steps[1].nativeElement.getAttribute('class')).not.toContain(
      'is-active'
    );
  });

  it('should show terms and conditions only on step 4', () => {
    mockSelectors.cart.getActiveCart.next({});
    component.ngOnInit();

    expect(getPlaceOrderForm()).toBeFalsy();

    mockAllSteps();
    expect(getPlaceOrderForm()).toBeTruthy();
  });

  it('should call setStep(3) when back button clicked', () => {
    spyOn(component, 'setStep').and.callThrough();
    mockSelectors.cart.getActiveCart.next({});
    mockAllSteps();

    fixture.detectChanges();
    getBackBtn().click();
    expect(component.setStep).toHaveBeenCalledWith(3);
  });

  it('should contain disabled place order button if terms not accepted', () => {
    mockSelectors.cart.getActiveCart.next({});
    mockAllSteps();

    fixture.detectChanges();

    expect(getPlaceOrderBtn().disabled).toBe(true);
  });

  it('should contain enabled place order button if terms accepted', () => {
    mockSelectors.cart.getActiveCart.next({});
    mockAllSteps();
    component.ngOnInit();

    const inputCheckbox = fixture.debugElement.query(
      By.css('.y-multi-step-checkout__place-order-form .form-check-input')
    ).nativeElement;
    inputCheckbox.click();
    fixture.detectChanges();

    expect(getPlaceOrderBtn().disabled).toBe(false);
  });
});
