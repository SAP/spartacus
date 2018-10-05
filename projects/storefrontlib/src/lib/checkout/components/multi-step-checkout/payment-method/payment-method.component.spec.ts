import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PaymentFormModule } from './payment-form/payment-form.module';
import { PaymentMethodComponent } from './payment-method.component';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';

import { CheckoutService } from '../../../services/checkout.service';
import { CartService } from '../../../../cart/services/cart.service';
import { CartDataService } from '../../../../cart/services/cart-data.service';
import { CardModule } from '../../../../ui/components/card/card.module';
import { SpinnerModule } from './../../../../ui/components/spinner/spinner.module';

const paymentDetails = {
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: 'Visa',
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123'
};

describe('PaymentMethodComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;
  let service: CheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CardModule,
        SpinnerModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          checkout: combineReducers(fromCheckout.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        }),
        PaymentFormModule
      ],
      declarations: [PaymentMethodComponent],
      providers: [CheckoutService, CartService, CartDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);

    spyOn(service, 'loadUserPaymentMethods').and.callThrough();
    spyOn(component.addPaymentInfo, 'emit').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get existing payment methods if they do not exist', () => {
    spyOn(store, 'select').and.returnValue(of([]));
    component.ngOnInit();
    component.existingPaymentMethods$.subscribe(() => {
      expect(service.loadUserPaymentMethods).toHaveBeenCalled();
    });
  });

  it('should call ngOnInit to get existing payment methods if they exist', () => {
    const mockPayments = [paymentDetails];
    spyOn(store, 'select').and.returnValue(of(mockPayments));
    component.ngOnInit();
    component.existingPaymentMethods$.subscribe(data => {
      expect(data).toBe(mockPayments);
      expect(component.cards.length).toEqual(1);
    });
  });

  it('should call getCardContent() to get address card data', () => {
    const card = component.getCardContent(paymentDetails);
    expect(card.title).toEqual('');
    expect(card.textBold).toEqual('Name');
    expect(card.text).toEqual(['123456789', 'Expires: 01/2022']);
  });

  it('should call paymentMethodSelected(paymentDetails, index)', () => {
    const card = { title: 'test card' };
    component.cards.push(card);
    component.paymentMethodSelected(paymentDetails, 0);

    expect(component.selectedPayment).toEqual(paymentDetails);
    expect(component.cards[0].header).toEqual('SELECTED');
  });

  it('should call next() to submit request', () => {
    component.selectedPayment = paymentDetails;
    component.next();
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith({
      payment: paymentDetails,
      newPayment: false
    });
  });

  it('should call addNewPaymentMethod()', () => {
    component.addNewPaymentMethod(paymentDetails);
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith({
      payment: paymentDetails,
      newPayment: true
    });
  });

  it('should call goToPaymentForm()', () => {
    component.goToPaymentForm();
    expect(component.isPaymentForm).toEqual(true);
  });

  it('should call back()', () => {
    component.back();
    expect(component.backStep.emit).toHaveBeenCalled();
  });
});
