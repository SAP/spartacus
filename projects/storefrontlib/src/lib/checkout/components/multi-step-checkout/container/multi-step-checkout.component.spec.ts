import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromCart from '../../../../cart/store';
import * as fromRoot from '../../../../routing/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';
import { Address } from '../../../models/address-model';
import * as fromCheckout from '../../../store';
import { CartSharedModule } from '../../../../cart/components/cart-shared/cart-shared.module';
import { ShippingAddressModule } from '../shipping-address/shipping-address.module';
import { DeliveryModeModule } from '../delivery-mode/delivery-mode.module';
import { PaymentMethodModule } from '../payment-method/payment-method.module';
import { ReviewSubmitModule } from '../review-submit/review-submit.module';
import { CartDataService } from './../../../../cart/services/cart-data.service';
import { CartService } from './../../../../cart/services/cart.service';
import { CheckoutService } from './../../../services/checkout.service';
import { MultiStepCheckoutComponent } from './multi-step-checkout.component';

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
  let store: Store<fromRoot.State>;
  let component: MultiStepCheckoutComponent;
  let fixture: ComponentFixture<MultiStepCheckoutComponent>;
  let service: CheckoutService;

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
        }),
        ShippingAddressModule,
        DeliveryModeModule,
        PaymentMethodModule,
        ReviewSubmitModule
      ],
      declarations: [MultiStepCheckoutComponent],
      providers: [CheckoutService, CartService, CartDataService]
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
    spyOn(service, 'createPaymentDetails').and.callThrough();
    spyOn(service, 'setPaymentDetails').and.callThrough();
    spyOn(service, 'placeOrder').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() before process steps', () => {
    const mockCartData = {};
    spyOn(store, 'select').and.returnValue(of(mockCartData));
    component.ngOnInit();
    component.cart$.subscribe(cart => expect(cart).toEqual(mockCartData));
    expect(component.step).toEqual(1);
  });

  it('should call processSteps() to process step 1: set delivery address', () => {
    const mockDeliveryAddress = ['address1', 'address2'];
    spyOn(store, 'select').and.returnValues(
      of(mockDeliveryAddress),
      of(''),
      of({}),
      of({})
    );
    component.processSteps();
    expect(component.step).toEqual(2);
  });

  it('should call processSteps() to process step 2: select delivery mode', () => {
    const mockDeliveryAddress = ['address1', 'address2'];
    spyOn(store, 'select').and.returnValues(
      of(mockDeliveryAddress),
      of('test mode'),
      of({}),
      of({})
    );
    component.processSteps();
    expect(component.step).toEqual(3);
  });

  it('should call processSteps() to process step 3: set payment info', () => {
    const mockDeliveryAddress = ['address1', 'address2'];
    const mockPaymentInfo = { card: '12345' };
    spyOn(store, 'select').and.returnValues(
      of(mockDeliveryAddress),
      of('test mode'),
      of(mockPaymentInfo),
      of({})
    );
    component.processSteps();
    expect(component.step).toEqual(4);
  });

  it('should call processSteps() to process step 4: place order', () => {
    const mockDeliveryAddress = ['address1', 'address2'];
    const mockPaymentInfo = { card: '12345' };
    const mockOrder = { id: '1234' };
    spyOn(store, 'select').and.returnValues(
      of(mockDeliveryAddress),
      of('test mode'),
      of(mockPaymentInfo),
      of(mockOrder)
    );
    component.processSteps();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRoot.Go({
        path: ['orderConfirmation']
      })
    );
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
  });

  it('should call addAddress() with address selected from existing addresses', () => {
    spyOn(store, 'select').and.returnValues(of(address), of([]));

    component.addAddress({ address: address, newAddress: false });
    expect(service.createAndSetAddress).not.toHaveBeenCalledWith(address);
    expect(service.setDeliveryAddress).toHaveBeenCalledWith(address);
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

    expect(service.createPaymentDetails).toHaveBeenCalledWith(paymentDetails);
  });

  it('should call addPaymentInfo() with paymenent selected from existing ones', () => {
    spyOn(store, 'select').and.returnValues(
      of(paymentDetails),
      of([]),
      of([]),
      of([])
    );

    component.deliveryAddress = address;
    component.addPaymentInfo({ payment: paymentDetails, newPayment: false });
    expect(service.createPaymentDetails).not.toHaveBeenCalledWith(
      paymentDetails
    );
    expect(service.setPaymentDetails).toHaveBeenCalledWith(paymentDetails);
  });

  it('should call placeOrder()', () => {
    const orderDetails = 'mockOrderDetails';
    spyOn(store, 'select').and.returnValues(of(orderDetails));

    component.placeOrder();
    expect(service.placeOrder).toHaveBeenCalled();
  });
});
