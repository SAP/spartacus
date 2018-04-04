import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../routing/store';
import * as fromCart from '../../cart/store';
import * as fromCheckout from '../store';
import * as fromUser from '../../auth/store';

import { CheckoutService } from './checkout.service';
import { CartService } from '../../cart/services/cart.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
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
          ...fromRoot.reducers,
          cart: combineReducers(fromCart.reducers),
          checkout: combineReducers(fromCheckout.reducers),
          user: combineReducers(fromUser.reducers)
        })
      ],
      providers: [CheckoutService, CartService]
    });

    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it(
    'should CheckoutService is injected',
    inject([CheckoutService], (checkoutService: CheckoutService) => {
      expect(checkoutService).toBeTruthy();
    })
  );

  describe('Create and Set Address', () => {
    it(
      'should be able to create and set address to cart',
      inject([CartService], (cartService: CartService) => {
        cartService.userId = userId;
        cartService.cart = cart;

        service.createAndSetAddress(address);

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromCheckout.AddDeliveryAddress({
            userId: userId,
            cartId: cart.code,
            address: address
          })
        );
      })
    );
  });

  describe('Load cart details', () => {
    it(
      'should be able to load cart with more details',
      inject([CartService], (cartService: CartService) => {
        cartService.userId = userId;
        cartService.cart = cart;

        service.loadCartDetails();

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromCart.LoadCart({
            userId: userId,
            cartId: cart.code,
            details: true
          })
        );
      })
    );
  });

  describe('load Supported Delivery Modes', () => {
    it(
      'should be able to load the supported delivery modes',
      inject([CartService], (cartService: CartService) => {
        cartService.userId = userId;
        cartService.cart = cart;

        service.loadSupportedDeliveryModes();

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromCheckout.LoadSupportedDeliveryModes({
            userId: userId,
            cartId: cart.code
          })
        );
      })
    );
  });

  describe('set Delivery Mode', () => {
    it(
      'should be able to set the delivery mode',
      inject([CartService], (cartService: CartService) => {
        cartService.userId = userId;
        cartService.cart = cart;

        const modeId = 'testId';
        service.setDeliveryMode(modeId);

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromCheckout.SetDeliveryMode({
            userId: userId,
            cartId: cart.code,
            selectedModeId: modeId
          })
        );
      })
    );
  });

  describe('get payment details', () => {
    it(
      'should be able to place order',

      inject([CartService], (cartService: CartService) => {
        cartService.userId = userId;
        cartService.cart = cart;
        const paymentInfo = 'mockInfo';

        service.getPaymentDetails(paymentInfo);

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromCheckout.CreatePaymentDetails({
            userId: userId,
            cartId: cart.code,
            paymentDetails: paymentInfo
          })
        );
      })
    );
  });

  describe('place order', () => {
    it(
      'should be able to place order',
      inject([CartService], (cartService: CartService) => {
        cartService.userId = userId;
        cartService.cart = cart;

        service.placeOrder();

        expect(store.dispatch).toHaveBeenCalledWith(
          new fromCheckout.PlaceOrder({
            userId: userId,
            cartId: cart.code
          })
        );
      })
    );
  });
});
