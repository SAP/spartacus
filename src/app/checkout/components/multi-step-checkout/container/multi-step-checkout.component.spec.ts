import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import * as fromRouting from '../../../../routing/store';

import { MultiStepCheckoutComponent } from './multi-step-checkout.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { OrderSummaryComponent } from '../../../../cart/components/cart-details/order-summary/order-summary.component';
import { DeliveryModeFormComponent } from '../delivery-mode-form/delivery-mode-form.component';
import { ReviewSubmitComponent } from '../review-submit/review-submit.component';

import { CheckoutService } from './../../../services/checkout.service';
import { CartService } from './../../../../cart/services/cart.service';
import { Address } from '../../../models/address-model';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { RouterTestingModule } from '@angular/router/testing';

const address: Address = {
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

const paymentDetails = {
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: 'Visa',
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123'
};

describe('MultiStepCheckoutComponent', () => {
  let store: Store<fromRouting.State>;
  let component: MultiStepCheckoutComponent;
  let fixture: ComponentFixture<MultiStepCheckoutComponent>;
  let service: CheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers),
          checkout: combineReducers(fromCheckout.reducers)
        })
      ],
      declarations: [
        MultiStepCheckoutComponent,
        AddressFormComponent,
        DeliveryModeFormComponent,
        OrderSummaryComponent,
        PaymentFormComponent,
        ReviewSubmitComponent
      ],
      providers: [CheckoutService, CartService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStepCheckoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(component, 'addAddress').and.callThrough();
    spyOn(service, 'createAndSetAddress').and.callThrough();
    spyOn(service, 'setDeliveryAddress').and.callThrough();
    spyOn(service, 'setDeliveryMode').and.callThrough();
    spyOn(service, 'loadUserAddresses').and.callThrough();
    spyOn(service, 'getPaymentDetails').and.callThrough();
    spyOn(service, 'setPaymentDetails').and.callThrough();
    spyOn(service, 'placeOrder').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() with user addresses already loaded', () => {
    const mockUserAddresses = { addresses: ['address1', 'address2'] };
    const mockPaymentMethods = { payments: ['payment1', 'payment2'] };
    const mockCartData = {};

    spyOn(store, 'select').and.returnValues(
      of(mockCartData),
      of(mockUserAddresses),
      of(mockPaymentMethods)
    );

    component.ngOnInit();

    expect(service.loadUserAddresses).not.toHaveBeenCalled();
    component.existingAddresses$.subscribe(data =>
      expect(data).toEqual(mockUserAddresses)
    );
    component.existingPaymentMethods$.subscribe(data =>
      expect(data).toEqual(mockPaymentMethods)
    );
    component.cart$.subscribe(cart => expect(cart).toEqual(mockCartData));
  });

  it('should call verifyAddress(address) with valid address', () => {
    const mockAddressVerificationResult = { decision: 'ACCEPT' };
    spyOn(store, 'select').and.returnValues(
      of(mockAddressVerificationResult),
      of([]),
      of([])
    );
    component.verifyAddress('mockAddress');
    expect(component.addAddress).toHaveBeenCalledWith({
      address: 'mockAddress',
      newAddress: true
    });
  });

  it('should call verifyAddress(address) with invalid address', () => {
    const mockAddressVerificationResult = { decision: 'REJECT' };
    spyOn(store, 'select').and.returnValue(of(mockAddressVerificationResult));
    component.verifyAddress('mockAddress');
    expect(component.addAddress).not.toHaveBeenCalled();
  });

  // Commented it out untill we remove dependency on MatDialog
  // it('should call verifyAddress(address) and return suggested addresses', () => {
  //   const mockAddressVerificationResult = {
  //     decision: 'REVIEW',
  //     suggestedAddresses: ['address1', 'address2']
  //   };
  //   spyOn(store, 'select').and.returnValue(of(mockAddressVerificationResult));
  //   component.verifyAddress('mockAddress');
  // });

  it('should call ngOnInit() with user addresses not already loaded', () => {
    const mockUserAddresses = [];
    spyOn(store, 'select').and.returnValue(of(mockUserAddresses));

    component.ngOnInit();
    component.existingAddresses$.subscribe();

    expect(service.loadUserAddresses).toHaveBeenCalled();
  });

  it('should call setStep()', () => {
    component.step = 2;
    component.setStep(1);
    expect(component.step).toBe(1);

    component.step = 2;
    component.setStep(3);
    expect(component.step).toBe(2);
  });

  it('should call addAddress() with new created address', () => {
    spyOn(store, 'select').and.returnValues(of(address), of([]));

    component.addAddress({ address: address, newAddress: true });

    expect(service.createAndSetAddress).toHaveBeenCalledWith(address);
    expect(component.step).toBe(2);
  });

  it('should call addAddress() with address selected from existing addresses', () => {
    spyOn(store, 'select').and.returnValues(of(address), of([]));

    component.addAddress({ address: address, newAddress: false });
    expect(service.createAndSetAddress).not.toHaveBeenCalledWith(address);
    expect(service.setDeliveryAddress).toHaveBeenCalledWith(address);
    expect(component.step).toBe(2);
  });

  it('should call setDeliveryMode()', () => {
    const deliveryMode: any = {
      deliveryModeId: 'testId'
    };
    spyOn(store, 'select').and.returnValues(of(deliveryMode), of([]));

    component.setDeliveryMode(deliveryMode);
    expect(service.setDeliveryMode).toHaveBeenCalledWith(
      deliveryMode.deliveryModeId
    );
    expect(component.step).toBe(3);
  });

  it('should call addPaymentInfo() with new created payment info', () => {
    spyOn(store, 'select').and.returnValues(
      of(paymentDetails),
      of([]),
      of([]),
      of([])
    );

    component.deliveryAddress = address;
    component.addPaymentInfo({ payment: paymentDetails, newPayment: true });

    expect(service.getPaymentDetails).toHaveBeenCalledWith(paymentDetails);
    expect(component.step).toBe(4);
  });

  it('should call addAddress() with address selected from existing addresses', () => {
    spyOn(store, 'select').and.returnValues(
      of(paymentDetails),
      of([]),
      of([]),
      of([])
    );

    component.deliveryAddress = address;
    component.addPaymentInfo({ payment: paymentDetails, newPayment: false });

    expect(service.getPaymentDetails).not.toHaveBeenCalledWith(paymentDetails);
    expect(service.setPaymentDetails).toHaveBeenCalledWith(paymentDetails);
    expect(component.step).toBe(4);
  });

  it('should call placeOrder()', () => {
    const orderDetails = 'mockOrderDetails';
    spyOn(store, 'select').and.returnValues(of(orderDetails));

    component.placeOrder();
    expect(service.placeOrder).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRouting.Go({
        path: ['orderConfirmation']
      })
    );
  });
});
