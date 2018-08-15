import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../routing/store';
import * as fromCart from '../../cart/store';
import * as fromCheckout from '../store';
import * as fromUser from '../../user/store';
import * as fromAuth from '../../auth/store';

import { CheckoutService } from './checkout.service';
import { CartService } from '../../cart/services/cart.service';
import { CartDataService } from '../../cart/services/cart-data.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let cartData: CartDataService;
  let store: Store<fromCheckout.CheckoutState>;
  const userId = 'testUserId';
  const cart = { code: 'testCartId', guid: 'testGuid' };

  const address: any = {
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          checkout: combineReducers(fromCheckout.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      providers: [CheckoutService, CartService, CartDataService]
    });

    service = TestBed.get(CheckoutService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CheckoutService is injected', inject(
    [CheckoutService],
    (checkoutService: CheckoutService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  describe('Create and Set Address', () => {
    it('should be able to create and set address to cart', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.createAndSetAddress(address);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.AddDeliveryAddress({
          userId: userId,
          cartId: cart.code,
          address: address
        })
      );
    });
  });

  describe('load Supported Delivery Modes', () => {
    it('should be able to load the supported delivery modes', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.loadSupportedDeliveryModes();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.LoadSupportedDeliveryModes({
          userId: userId,
          cartId: cart.code
        })
      );
    });
  });

  describe('set Delivery Mode', () => {
    it('should be able to set the delivery mode', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      const modeId = 'testId';
      service.setDeliveryMode(modeId);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.SetDeliveryMode({
          userId: userId,
          cartId: cart.code,
          selectedModeId: modeId
        })
      );
    });
  });

  describe('create payment details', () => {
    it('should be able to create payment details', () => {
      cartData.userId = userId;
      cartData.cart = cart;
      const paymentInfo = 'mockInfo';

      service.createPaymentDetails(paymentInfo);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.CreatePaymentDetails({
          userId: userId,
          cartId: cart.code,
          paymentDetails: paymentInfo
        })
      );
    });
  });

  describe('place order', () => {
    it('should be able to place order', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.placeOrder();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.PlaceOrder({
          userId: userId,
          cartId: cart.code
        })
      );
    });
  });

  describe('load address verification results', () => {
    it('should load address verification results', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.verifyAddress('mockAddress');

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.VerifyAddress({
          userId: userId,
          address: 'mockAddress'
        })
      );
    });
  });

  describe('load user addresses', () => {
    it('should load saved user addresses', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.loadUserAddresses();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromUser.LoadUserAddresses(userId)
      );
    });
  });

  describe('set delivery address', () => {
    it('should set delivery address', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.setDeliveryAddress('mockAddress');

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.SetDeliveryAddress({
          userId: userId,
          cartId: cartData.cart.code,
          address: 'mockAddress'
        })
      );
    });
  });

  describe('load user payment methods', () => {
    it('should load user payment methods', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.loadUserPaymentMethods();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromUser.LoadUserPaymentMethods(userId)
      );
    });
  });

  describe('set payment details', () => {
    it('should set payment details', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.setPaymentDetails('mockPaymentDetails');

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.SetPaymentDetails({
          userId: userId,
          cartId: cartData.cart.code,
          paymentDetails: 'mockPaymentDetails'
        })
      );
    });
  });
});
