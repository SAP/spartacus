import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CartDataService } from '../../cart/facade/cart-data.service';
import { CardType, Cart, PaymentDetails } from '../../model/cart.model';
import { CheckoutActions } from '../store/actions/index';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { CheckoutPaymentService } from './checkout-payment.service';

describe('CheckoutPaymentService', () => {
  let service: CheckoutPaymentService;
  let cartData: CartDataServiceStub;
  let store: Store<CheckoutState>;
  const userId = 'testUserId';
  const cart: Cart = { code: 'testCartId', guid: 'testGuid' };

  const paymentDetails: PaymentDetails = {
    id: 'mockPaymentDetails',
  };

  class CartDataServiceStub {
    userId;
    cart;
    get cartId() {
      return this.cart.code;
    }
    get isGuestCart() {
      return true;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckoutReducers.getReducers()),
      ],
      providers: [
        CheckoutPaymentService,
        { provide: CartDataService, useClass: CartDataServiceStub },
      ],
    });

    service = TestBed.get(CheckoutPaymentService as Type<
      CheckoutPaymentService
    >);
    cartData = TestBed.get(CartDataService as Type<CartDataService>);
    store = TestBed.get(Store as Type<Store<CheckoutState>>);

    cartData.userId = userId;
    cartData.cart = cart;

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CheckoutPaymentService is injected', inject(
    [CheckoutPaymentService],
    (checkoutService: CheckoutPaymentService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get the card types', () => {
    store.dispatch(
      new CheckoutActions.LoadCardTypesSuccess([
        { code: 'visa', name: 'visa' },
        { code: 'masterCard', name: 'masterCard' },
      ])
    );

    let cardTypes: CardType[];
    service.getCardTypes().subscribe(data => {
      cardTypes = data;
    });
    expect(cardTypes).toEqual([
      { code: 'visa', name: 'visa' },
      { code: 'masterCard', name: 'masterCard' },
    ]);
  });

  it('should be able to get the payment details', () => {
    store.dispatch(
      new CheckoutActions.SetPaymentDetailsSuccess(paymentDetails)
    );

    let tempPaymentDetails: PaymentDetails;
    service
      .getPaymentDetails()
      .subscribe(data => {
        tempPaymentDetails = data;
      })
      .unsubscribe();
    expect(tempPaymentDetails).toEqual(paymentDetails);
  });

  it('should be able to load supported cart types', () => {
    service.loadSupportedCardTypes();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.LoadCardTypes()
    );
  });

  it('should be able to create payment details', () => {
    service.createPaymentDetails(paymentDetails);

    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.CreatePaymentDetails({
        userId: userId,
        cartId: cart.code,
        paymentDetails,
      })
    );
  });

  it('should set payment details', () => {
    service.setPaymentDetails(paymentDetails);

    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetPaymentDetails({
        userId: userId,
        cartId: cartData.cart.code,
        paymentDetails,
      })
    );
  });

  it('should allow actions for login user or guest user', () => {
    cartData.userId = 'anonymous';
    expect(service['actionAllowed']()).toBeTruthy();
  });
});
